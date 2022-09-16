import React, { useEffect, useContext } from "react";
import { API_URL } from "config";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import { parseCookies } from "utils/cookies";
import styled from "styled-components";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { mediaBreakpoint } from "utils/breakpoints";
import BlogCardMain from "components/Blog/BlogCardMain";
import SearchBarBlog from "components/Search/SearchBarBlog";
import { HeadingSM } from "components/Typography/Headings";
import { FormGroup, Form } from "react-bootstrap";

const Select = styled(Form)`
	appearance: none;
	padding: 16px;
	border-radius: 8px;
	border: none;
	background: #f6f6f6;
	background-image: url("/images/dropdown-caret.svg");
	background-repeat: no-repeat;
	background-position-x: 98%;
	background-position-y: 21px;
	font-size: 14px;
	min-width: 280px;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f4f4f7 inset !important;
	}
	&:focus {
		outline: none;
	}

	@media ${mediaBreakpoint.down.md} {
		width: 100%;
	}
`;

const StyledFormGroup = styled(FormGroup)`
	@media ${mediaBreakpoint.down.lg} {
		width: 100%;
	}
`;

const OuterContainer = styled.div`
	width: 100%;
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	grid-column-gap: 32px;
	grid-row-gap: 64px;
	@media ${mediaBreakpoint.down.lg} {
		max-width: 100%;
	}

	@media ${mediaBreakpoint.down.md} {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
`;

const Bookmarks = ({ bookmarkedBlogPosts = [] }) => {
	const { checkUserLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		checkUserLoggedIn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout
			title="Bookmarked Blog Posts | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
			showLogout
		>
			<div className="d-flex flex-column w-100">
				<Breadcrumb />

				<HeadingSM className="mb-3">Bookmark Blog</HeadingSM>

				<div className="w-100 d-flex align-items-center justify-content-lg-between flex-lg-row flex-column">
					<SearchBarBlog
						barWidthPercent="60"
						placeholder="Cari artikel (judul, kategori, topik)..."
					/>

					<StyledFormGroup className="d-flex flex-column text-gray2 mt-lg-0 mt-3">
						<Select
							onChange={(e) => setCategoriesId(e.target.value)}
							as="select"
							aria-label="Default select example"
							className="shadow-md"
						>
							<option>Terbaru</option>
							<option>Terlama</option>
							<option>Judul (A-Z)</option>
							<option>Judul (Z-A)</option>
						</Select>
					</StyledFormGroup>
				</div>

				<OuterContainer className="mt-5">
					{bookmarkedBlogPosts.map((blogPost) => (
						<BlogCardMain
							blogPost={blogPost}
							key={blogPost.id}
							showBookmark={false}
						/>
					))}
				</OuterContainer>
			</div>
		</Layout>
	);
};
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

	const res = await fetch(`${API_URL}/users/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}

	const userFromServer = await res.json();

	const resBookmarkedBlogPosts = await fetch(
		`${API_URL}/blog-posts?_bookmarked_by.id=${userFromServer.id}&_sort=created_at:desc`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!resBookmarkedBlogPosts.ok) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}
	const bookmarkedBlogPosts = await resBookmarkedBlogPosts.json();
	return {
		props: { userFromServer, bookmarkedBlogPosts },
	};
}
export default Bookmarks;
