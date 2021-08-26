import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "config/index";

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
			router.reload();
		} else {
			setErr(data.message);
			setErr(null);
		}
		setAuthLoading(false);
	};

	//Login user

	const login = async ({ email: identifier, password }) => {
		setAuthLoading(true);

		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			router.push("/dashboard");
			router.reload();
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
			router.push("/");
		}
	};

	const changePassword = async (detail) => {
		setAuthLoading(true);
		const res = await fetch(`${NEXT_URL}/api/change-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(detail),
		});

		const data = await res.json();
		if (res.ok) {
			setToken(data.jwt);
			setSuccess(true);
		} else {
			setErr(data.data.error);
			setErr(null);
		}
		setSuccess(false);
		setAuthLoading(false);
	};

	//Check if user is logged in

	const checkUserLoggedIn = async () => {
		setUserLoading(true);
		const res = await fetch(`${NEXT_URL}/api/user`, { method: "POST" });

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
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
			console.log(data);
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
