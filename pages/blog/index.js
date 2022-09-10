import React from "react";
import { API_URL } from "config";
import Container from "react-bootstrap/Container";
import { parseCookies } from "utils/cookies";
import Layout from "components/Layout";
import styled from "styled-components";
import InnerBlogLayout from "components/Blog/InnerBlogLayout";
import BlogCardMain from "components/Blog/BlogCardMain";
import ShowcaseBlog from "components/Blog/ShowcaseBlog";

const StyledContainer = styled(Container)`
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(auto-fill, 325px);
	grid-column-gap: 32px;
	grid-row-gap: 32px;
`;

export default function BlogPost({ blogPosts, sideMenu }) {
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
			<InnerBlogLayout
				lessPaddingTop
				showSearch={false}
				showSubscribe={false}
				sideMenu={sideMenu}
			>
				<StyledContainer>
					{blogPosts.map((blogPost) => (
						<BlogCardMain blogPost={blogPost} key={blogPost.id} />
					))}
				</StyledContainer>
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
