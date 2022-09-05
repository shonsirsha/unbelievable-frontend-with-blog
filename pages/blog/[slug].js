import React from "react";
import { API_URL } from "config";
import { parseCookies } from "utils/cookies";

export default function BlogPost({ slug, blogPost }) {
	return (
		<div
			className="ck-content p-4"
			dangerouslySetInnerHTML={{ __html: blogPost.content }}
		></div>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const { slug } = ctx.query;
	const res = await fetch(`${API_URL}/blog-posts?_slug=${slug}`, {
		method: "GET",
	});

	const blogPost = await res.json();

	//embed: https://www.youtube.com/embed/videoseries?list=UUDrG2_1TcVkXKXXsD6Kjwig&controls=0

	if (!res.ok || !blogPost.length) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}

	return {
		props: {
			blogPost: blogPost[0],
			slug,
		},
	};
}
