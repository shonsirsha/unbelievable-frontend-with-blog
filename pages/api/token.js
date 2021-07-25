import cookie from "cookie";

export default async (req, res) => {
	if (req.method === "POST") {
		if (!req.headers.cookie) {
			res.status(403).json({ message: "Not Authorized" });
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		if (token) {
			res.status(200).json({ token });
		} else {
			res.status(403).json({ message: "User Forbidden" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
