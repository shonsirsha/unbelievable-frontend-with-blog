import React from "react";
import { API_URL } from "config";
import { parseCookies } from "utils/cookies";
import Layout from "components/Layout";
import styled from "styled-components";
import { HeadingMD, HeadingXXS } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import moment from "moment";
import { mediaBreakpoint } from "utils/breakpoints";
import Link from "next/link";
import InnerBlogLayout from "components/Blog/InnerBlogLayout";
import ShareOptions from "components/ShareOptions";
import { NEXT_URL } from "config";

const TopicPill = styled.div`
	padding: 11px 40px;
	min-width: 96px;
	background: #dbdbdb;
	border-radius: 17px;

	@media ${mediaBreakpoint.down.md} {
		padding: 8px 16px;
	}
`;

const TopicPillContainer = styled.div`
	@media ${mediaBreakpoint.down.md} {
		margin-left: -12px;
	}

	& a {
		color: #000;
	}
`;

const TopicText = styled(HeadingXXS)`
	font-size: 13px;
	text-align: center;

	@media ${mediaBreakpoint.down.md} {
		font-size: 11px;
	}
`;

export default function BlogPost({ blogPost, sideMenu }) {
	return (
		<Layout
			background="#171b2d"
			title={`${blogPost.title} | Blog Unbelievable`}
			description={`${blogPost.shortDesc}`}
			metaImageURL={
				blogPost.thumbnail
					? blogPost.thumbnail.url
					: `${NEXT_URL}/images/logo-no-text.png`
			}
		>
			<InnerBlogLayout sideMenu={sideMenu}>
				<div className="d-flex flex-column">
					<HeadingMD as="h1">{blogPost.title}</HeadingMD>

					<div className="d-flex my-3">
						<TextPrimary className="text-gray2">
							{blogPost.readTime === 0 ? `1` : blogPost.readTime} Menit
						</TextPrimary>

						<TextPrimary className="text-gray2 ml-4">
							{moment(blogPost.createdAt).format("D MMMM YYYY")}
						</TextPrimary>
					</div>

					<TopicPillContainer className="d-flex flex-md-nowrap flex-wrap">
						{blogPost.blogTopics.map((topic, ix) => (
							<Link href={`/blog-topik/${topic.topicId}`} key={topic.topicId}>
								<a>
									<TopicPill
										className={`${ix > 0 ? `ml-md-2` : `ml-md-0`} mb-3 ml-3`}
									>
										<TopicText as="p">{topic.topicName}</TopicText>
									</TopicPill>
								</a>
							</Link>
						))}
					</TopicPillContainer>

					<ShareOptions blogPostSlug={blogPost.slug} />

					<div
						style={{ lineBreak: "auto" }}
						className="ck-content mt-4"
						dangerouslySetInnerHTML={{ __html: blogPost.content }}
					></div>
				</div>
			</InnerBlogLayout>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const { slug } = ctx.query;
	const res = await fetch(`${API_URL}/blog-posts/${slug}`, {
		method: "GET",
	});

	const blogPost = await res.json();

	//embed: https://www.youtube.com/embed/videoseries?list=UUDrG2_1TcVkXKXXsD6Kjwig&controls=0

	if (!res.ok) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}

	const blogTopicsString = blogPost.blogTopics.reduce((acc, curr, ix) => {
		if (ix === 0) {
			return acc.concat(curr.topicId.toLowerCase());
		} else {
			return acc.concat(`,${curr.topicId.toLowerCase()}`);
		}
	}, "");

	const sideMenuResHeaders = token
		? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
		: { "Content-Type": "application/json" };
	const sideMenuRes = await fetch(
		`${API_URL}/blog-posts/side-menu-items?currentTopics=${blogTopicsString}&currentPostId=${blogPost.id}`,
		{
			method: "GET",
			headers: sideMenuResHeaders,
		}
	);

	const sideMenu = await sideMenuRes.json();

	if (sideMenuRes.ok) {
		return {
			props: {
				blogPost: blogPost,
				slug,
				sideMenu,
			},
		};
	}

	return {
		props: {
			blogPost: blogPost,
			slug,
			sideMenu: null,
		},
	};
}
