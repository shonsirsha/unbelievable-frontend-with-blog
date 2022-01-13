import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  useEffect(() => {
    checkUserLoggedIn();
    getToken();
  }, []);
  //Register a user
  const register = async (user) => {
    setAuthLoading(true);

    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/dashboard");
    } else {
      setErr(data.message);
      setErr(null);
    }
    setAuthLoading(false);
  };

  //Login user

  const login = async ({ email: identifier, password, recaptchaToken }) => {
    setAuthLoading(true);

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
        recaptchaToken,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/dashboard?r=1");
    } else {
      setErr(data.message);
      setErr(null);
    }
    setAuthLoading(false);
  };

  //Logout user

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      setToken(null);
      router.push("/masuk");
    }
  };

  const changePassword = async (detail) => {
    setAuthLoading(true);
    const res = await fetch(`${NEXT_URL}/api/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detail),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setAuthLoading(false);
    } else {
      setErr(data.data.error);
      setErr(null);
      setAuthLoading(false);
    }
    setSuccess(false);
  };

  const checkIfProviderLocal = async ({ email }) => {
    setAuthLoading(true);
    const res = await fetch(`${API_URL}/users/is-local-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setAuthLoading(false);
      return data.localProvider;
    } else {
      setAuthLoading(false);
      return false;
    }
  };

  const forgotPassword = async ({ email, recaptchaToken }) => {
    setAuthLoading(true);
    const res = await fetch(`${NEXT_URL}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, recaptchaToken }),
    });
    // console.log("ASDAS");
    setAuthLoading(false);
    return res.ok;
  };

  const resetPassword = async ({ code, password }) => {
    setAuthLoading(true);
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setAuthLoading(false);
      setSuccess(true);
    } else {
      setErr(data.message[0].messages[0].id);
      setErr(null);
      setAuthLoading(false);
    }
    setSuccess(false);
  };

  //Check if user is logged in

  const checkUserLoggedIn = async () => {
    setUserLoading(true);
    const res = await fetch(`${NEXT_URL}/api/user`, { method: "POST" });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setToken(data.user.token);

      if (!data.user.sendgrid_set && data.user.dob) {
        //registering to sendgrid (account with a 'free' tag)
        const sendgridRegisterRes = await fetch(
          `${API_URL}/users/sendgrid-register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          }
        );
        console.log(sendgridRegisterRes);
        if (!sendgridRegisterRes.ok) {
          console.log("sg E");
        } else {
          console.log("sg R (free)");
        }
      }

      if (!data.user.mailchimp_set && data.user.dob) {
        //registering to mailchimp (account with a 'free' tag)
        const mailchimpRegisterRes = await fetch(
          `${API_URL}/users/mailchimp-register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          }
        );

        if (!mailchimpRegisterRes.ok) {
          console.log("mc E");
        } else {
          console.log("mc R (free)");
        }
      }
    } else {
      setUserLoading(false);

      setUser(null);
    }
    setUserLoading(false);
  };

  const getToken = async () => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/token`, { method: "POST" });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
    } else {
      setToken(null);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        err,
        register,
        login,
        logout,
        checkUserLoggedIn,
        getToken,
        changePassword,
        setErr,
        setUser,
        checkIfProviderLocal,
        forgotPassword,
        resetPassword,
        loading,
        authLoading,
        userLoading,
        token,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
