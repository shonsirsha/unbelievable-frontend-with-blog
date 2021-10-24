import cookie from "cookie";
import { API_URL } from "config/index";

export default async function register(req, res) {
	if (req.method === "PUT") {
		const { identifier, password, newPassword } = req.body;
		const { token } = cookie.parse(req.headers.cookie);

		const strapiRes = await fetch(`${API_URL}/users/password-reset`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				identifier,
				password,
				newPassword,
				confirmPassword: newPassword,
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
				jwt: data.jwt,
			});
		} else {
			res.status(data.statusCode).json({ data: data.message });
		}
	} else {
		res.setHeader("Allow", ["PUT"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
