import cookie from "cookie";
import { API_URL } from "config/index";

export default async (req, res) => {
	if (req.method === "POST") {
		if (!req.headers.cookie) {
			res.status(403).json({ message: "Not Authorized" });
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);
		const strapiRes = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let user = await strapiRes.json();
		user.token = token;
		if (strapiRes.ok) {
			res.status(200).json({ user });
		} else {
			res.status(403).json({ message: "User Forbidden" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
