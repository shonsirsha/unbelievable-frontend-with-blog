import cookie from "cookie";
import { API_URL } from "config/index";

export default async function login(req, res) {
	if (req.method === "POST") {
		const { token_details } = req.body;
		const strapiRes = await fetch(
			`${API_URL}/auth/google/callback?${token_details}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "development" ? true : false,
					maxAge: 60 * 60 * 24 * 7,
					sameSite: "strict",
					path: "/",
				})
			);
			res.status(200).json({
				user: data.user,
			});
		} else {
			console.log(data);
			res
				.status(data.statusCode)
				.json({ message: data.message[0].messages[0] });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
