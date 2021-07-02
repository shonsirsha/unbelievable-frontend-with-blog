import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	useEffect(() => {
		checkUserLoggedIn();
	}, []);
	//Register a user
	const register = async (user) => {
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
	};

	//Login user

	const login = async ({ email: identifier, password }) => {
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
		} else {
			setErr(data.message);
			setErr(null);
		}
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

	//Check if user is logged in

	const checkUserLoggedIn = async () => {
		setLoading(true);
		const res = await fetch(`${NEXT_URL}/api/user`);

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
		setLoading(false);
	};

	return (
		<AuthContext.Provider
			value={{ user, err, register, login, logout, checkUserLoggedIn, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
