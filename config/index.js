export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
// export const API_URL =
// 	process.env.NEXT_PUBLIC_API_URL || "https://unb-backend.herokuapp.com";

export const NEXT_URL =
	process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const USE_FALLBACK_VID = process.env.NEXT_PUBLIC_FALLBACK || true;
export const BUNNY_STREAM_PREFIX_URL =
	process.env.NEXT_PUBLIC_BUNNY_STREAM_PREFIX_URL ||
	"https://vz-b4f1e97e-483.b-cdn.net";
export const MAINTENANCE =
	process.env.NEXT_PUBLIC_MAINTENANCE == "true" ? true : false || false;

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
