import { RECAPTCHA_SECRET_KEY } from "config";
export default async function validateHuman(token) {
	const secret = RECAPTCHA_SECRET_KEY;
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
		{
			method: "POST",
		}
	);

	const data = await response.json();
	return true;
}
