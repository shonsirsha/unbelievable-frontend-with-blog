import React, { useContext } from "react";
import Link from "next/link";
import AppContext from "context/AppContext";
import { API_URL } from "config";
import Container from "react-bootstrap/Container";
import { parseCookies } from "utils/cookies";
import Layout from "components/Layout";
import styled from "styled-components";
import InnerBlogLayout from "components/Blog/InnerBlogLayout";
import BlogCardMain from "components/Blog/BlogCardMain";
import ShowcaseBlog from "components/Blog/ShowcaseBlog";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextPrimary } from "components/Typography/Text";
import SocialEmbed from "components/SocialEmbeds";

const StyledContainer = styled(Container)`
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(auto-fill, 325px);
	grid-column-gap: 32px;
	grid-row-gap: 64px;
`;

const TopicPill = styled.div`
	padding: 12px 56px;
	min-width: 96px;
	background: #dbdbdb;
	border-radius: 12px;

	@media ${mediaBreakpoint.down.md} {
		padding: 8px 16px;
	}
`;

const TopicText = styled(TextPrimary)`
	font-size: 17.5px;
	text-align: center;
	font-family: OpenSansBold;

	@media ${mediaBreakpoint.down.md} {
		font-size: 13px;
	}
`;

export default function BlogPost({ blogPosts, sideMenu }) {
	const { siteData } = useContext(AppContext);
	return (
		<Layout
			scrollToSolid
			title={`Blog | Unbelievable`}
			description={
				"Artikel-artikel untuk kamu dari Unbelievable. Keputusan yang telah kamu ambil hari ini akan membuat diri kamu lebih lebih baik lagi ke depannya!"
			}
			keywords={
				"blog, unbelievable, unbelievable.id blog, self-improvement indonesia, kelas unbelievable indonesia, blog bahasa indonesia"
			}
		>
			<ShowcaseBlog title="Artikel rekomendasi untuk kamu" />
			<Container style={{ marginTop: "-36px" }}>
				<div className="d-flex flex-wrap">
					{siteData &&
						siteData.featured_blog_topics &&
						siteData.featured_blog_topics.map((topic) => (
							<Link
								key={topic.blog_topic.topicId}
								href={`/blog-topik/${topic.blog_topic.topicId}`}
							>
								<a className="text-black">
									<TopicPill className="mr-3 mt-3">
										<TopicText as="h2">{topic.blog_topic.topicName}</TopicText>
									</TopicPill>
								</a>
							</Link>
						))}
				</div>
			</Container>

			<InnerBlogLayout
				lessPaddingTop
				showSearch={false}
				showSubscribe={false}
				sideMenu={sideMenu}
			>
				<StyledContainer className="mb-5">
					{blogPosts.map((blogPost) => (
						<BlogCardMain blogPost={blogPost} key={blogPost.id} />
					))}
				</StyledContainer>

				<SocialEmbed />
			</InnerBlogLayout>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const res = await fetch(`${API_URL}/blog-posts?_sort=created_at:desc`, {
		method: "GET",
	});

	const blogPosts = await res.json();

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

	const sideMenuResHeaders = token
		? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
		: { "Content-Type": "application/json" };
	const sideMenuRes = await fetch(
		`${API_URL}/blog-posts/side-menu-items?currentTopics=`,
		{
			method: "GET",
			headers: sideMenuResHeaders,
		}
	);

	const sideMenu = await sideMenuRes.json();

	if (sideMenuRes.ok) {
		return {
			props: {
				blogPosts,
				sideMenu,
			},
		};
	}

	return {
		props: {
			blogPost: blogPost,
			sideMenu: null,
		},
	};
}
