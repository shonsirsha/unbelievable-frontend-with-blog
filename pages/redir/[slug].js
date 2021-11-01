import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "components/Loading/Loading";
export default function Index({ slug }) {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push(`/kelas/${slug}`);
		}, 300);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Loading />;
}
export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;

	return {
		props: {
			slug,
		},
	};
}
