import cookie from "cookie";
import { API_URL, RECAPTCHA_SECRET_KEY } from "config/index";

async function validateHuman(token) {
	const secret = RECAPTCHA_SECRET_KEY;
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
		{
			method: "POST",
		}
	);

	const data = await response.json();

	return data.success;
}

export default async function login(req, res) {
	if (req.method === "POST") {
		const { identifier, password, recaptchaToken } = req.body;
		const human = await validateHuman(recaptchaToken);

		if (!human) {
			return res
				.status(400)
				.json({ message: "ReCaptcha gagal. Mohon coba lagi!" });
		}

		const strapiRes = await fetch(`${API_URL}/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

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
			res
				.status(data.statusCode)
				.json({ message: data.message[0].messages[0].id });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
