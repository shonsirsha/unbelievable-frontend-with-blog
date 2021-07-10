export default function Kelas({ slug }) {
	return (
		<div>
			{slug} is a work in progress :)
			<a href="/dashboard">Back home</a>
		</div>
	);
}
export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	return {
		props: {
			slug,
		},
	};
}
