import { API_URL } from "config";
import validateHuman from "utils/validateHuman";
export default async function forgotPassword(req, res) {
	if (req.method === "POST") {
		const { email, recaptchaToken } = req.body;

		const human = await validateHuman(recaptchaToken);

		if (!human) {
			return res
				.status(400)
				.json({ message: "ReCaptcha gagal. Mohon coba lagi!" });
		}

		const strapiRes = await fetch(`${API_URL}/auth/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await strapiRes.json();
		res.status(200).json(data);
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
