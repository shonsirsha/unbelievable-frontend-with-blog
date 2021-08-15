import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Index({ slug }) {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push(`/kelas/${slug}`);
		}, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
