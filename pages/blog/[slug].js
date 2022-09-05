import React from "react";
import { API_URL } from "config";
import { parseCookies } from "utils/cookies";
import Layout from "components/Layout";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import {
	HeadingLG,
	HeadingMD,
	HeadingXXS,
} from "components/Typography/Headings";
import {
	TextPrimary,
	TextSecondary,
	TextTertiary,
} from "components/Typography/Text";
import moment from "moment";

const StyledContainer = styled(Container)`
	width: 100%;
	justify-content: center;
	padding-top: 140px;
	padding-bottom: 56px;
	overflow: hidden;
`;

const TopicPill = styled.div`
	padding: 11px 40px;
	min-width: 96px;
	background: #dbdbdb;
	border-radius: 17px;
`;

const TopicText = styled(HeadingXXS)`
	font-size: 13px;
`;

export default function BlogPost({ slug, blogPost }) {
	return (
		<Layout
			background="#171b2d"
			title={blogPost.title}
			description="Semua kelas yang ada di Unbelievable. Ikuti sekarang! | Blog Unbelievable.id"
		>
			<StyledContainer>
				<HeadingMD as="h1">{blogPost.title}</HeadingMD>

				<div className="d-flex flex-col my-3">
					<TextPrimary className="text-gray2">
						{blogPost.readTime === 0 ? `1` : blogPost.readTime} Menit
					</TextPrimary>

					<TextPrimary className="text-gray2 ml-4">
						{moment(blogPost.createdAt).format("D MMMM YYYY")}
					</TextPrimary>
				</div>

				<div className="d-flex">
					{blogPost.blogTopics.map((topic, ix) => (
						<TopicPill
							className={`${ix > 0 ? `ml-2` : `ml-0`}`}
							key={topic.topicId}
						>
							<TopicText>{topic.topicName}</TopicText>
						</TopicPill>
					))}
				</div>

				<div
					className="ck-content mt-4"
					dangerouslySetInnerHTML={{ __html: blogPost.content }}
				></div>
			</StyledContainer>
		</Layout>
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
