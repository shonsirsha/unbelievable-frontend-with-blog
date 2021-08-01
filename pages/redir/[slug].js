import { useEffect } from "react";
import { useRouter } from "next/router";
export default function index({ slug }) {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push(`/kelas/${slug}`);
		}, 1000);
	}, []);
	return <div>Mengalihkan...</div>;
}
export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;

	return {
		props: {
			slug,
		},
	};
}
