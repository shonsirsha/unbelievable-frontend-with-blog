import cookie from "cookie";
import { API_URL } from "config/index";

export default async function register(req, res) {
	if (req.method === "POST") {
		const { email, password, first_name, last_name, dob } = req.body;
		const datex = Date.now();

		const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: String(datex),
				email,
				password,
				first_name,
				last_name,
				dob,
				onboarded: false,
				blocked: false,
			}),
		});

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "development" ? true : false,
					maxAge: 60 * 60 * 7,
					sameSite: "strict",
					path: "/",
				})
			);
			res.status(200).json({
				user: data.user,
			});
		} else {
			res
				.status(data.statusCode)
				.json({ message: data.message[0].messages[0].message });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
