import { parseCookies } from "utils/cookies";
import { API_URL } from "config";
export default function Kelas({ slug, currentVideo }) {
	const { video } = currentVideo;
	return (
		<div>
			Successfully enrolling for: <kbd>{slug}</kbd> class.
			<br />
			Welcome to: <b>{currentVideo.day_title}</b> <br />
			This video is titled: <b>{video.title}</b>
			<br />
			<a href="/dashboard">Back home</a>
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
	const { slug, c } = ctx.query;
	//c should be upload_id.
	//upload_id may come from videos[0].video.upload_id

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

	const validUploadId = course[0].videos.findIndex(
		(course) => course.video.upload_id === c
	);
	if (validUploadId === -1) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].videos[0].video.upload_id}`,
			},
			props: {},
		};
	}

	if (
		c === "" ||
		!c ||
		c.length === 0 ||
		c === undefined ||
		c === "undefined"
	) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].videos[0].video.upload_id}`,
			},
			props: {},
		};
	}

	const currentVideo = course[0].videos.find(
		(course) => course.video.upload_id === c
	);

	return {
		props: {
			slug,
			currentVideo,
		},
	};
}
