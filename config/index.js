export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
// export const API_URL =
// 	process.env.NEXT_PUBLIC_API_URL || "https://unb-backend.herokuapp.com";

export const NEXT_URL =
	process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const USE_FALLBACK_VID = process.env.NEXT_PUBLIC_FALLBACK || true;
export const MUX_READY = process.env.NEXT_PUBLIC_MUX_READY || true;
export const BUNNY_STREAM_PREFIX_URL =
	process.env.NEXT_PUBLIC_BUNNY_STREAM_PREFIX_URL ||
	"https://vz-a2adf92d-b24.b-cdn.net";
export const MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE || true;
