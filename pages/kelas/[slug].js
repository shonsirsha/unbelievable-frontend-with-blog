export default function Kelas({ slug }) {
	return (
		<div>
			Successfully enrolling for: <kbd>{slug}</kbd> class.
			<br />
			This page is a work in progress :)
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
