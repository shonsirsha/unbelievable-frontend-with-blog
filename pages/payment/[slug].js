import { parseCookies } from "utils/cookies";
import { API_URL } from "config";
export default function Payment({ slug }) {
	return (
		<div>
			Dummy page pembayaran kelas: {slug}. <br />
			<br /> Klik tombol untuk membayar
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	}
	const { slug } = ctx.query;

	const res = await fetch(`${API_URL}/courses?slug=${slug}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const course = await res.json();
	if (course.length < 1) {
		return {
			redirect: {
				permanent: false,
				destination: "/dashboard",
			},
			props: {},
		};
	}

	return {
		props: {
			slug,
		},
	};
}
