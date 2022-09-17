import React, { useEffect, useContext, useState } from "react";
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
import { FormGroup, Form, Container } from "react-bootstrap";
import { whitespace } from "utils/whitespace";

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
	const [blogPostsState, setBlogPostsState] = useState(bookmarkedBlogPosts);
	const [sort, setSort] = useState("created_at:desc");
	const [keyword, setKeyword] = useState("");

	const sorter = (a, b) => {
		switch (sort) {
			case "created_at:desc":
				return b.id - a.id;
			case "created_at:asc":
				return a.id - b.id;
			case "title:desc":
				return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
			case "title:asc":
				return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
			default:
				return b.id - a.id;
		}
	};

	useEffect(() => {
		checkUserLoggedIn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!whitespace(keyword)) {
			const filteredBlogPosts = bookmarkedBlogPosts.filter(
				(blogPosts) =>
					blogPosts.title.toLowerCase().includes(keyword.toLowerCase()) ||
					blogPosts.blogTopicsText.toLowerCase().includes(keyword.toLowerCase())
			);
			setBlogPostsState(filteredBlogPosts);
		} else {
			setBlogPostsState([...bookmarkedBlogPosts].sort((a, b) => sorter(a, b)));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	useEffect(() => {
		setBlogPostsState([...blogPostsState].sort((a, b) => sorter(a, b)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort]);

	return (
		<Layout
			title="Bookmarked Blog Posts | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
			showLogout
		>
			<Container className="d-flex flex-column">
				<Breadcrumb />

				<HeadingSM className="mb-3">Bookmark Blog</HeadingSM>

				<div className="w-100 d-flex align-items-center justify-content-lg-between flex-lg-row flex-column">
					<SearchBarBlog
						barWidthPercent="60"
						onChange={(e) => {
							setKeyword(e.target.value);
						}}
						placeholder="Cari artikel (judul & topik)..."
					/>

					<StyledFormGroup className="d-flex flex-column text-gray2 mt-lg-0 mt-3">
						<Select
							onChange={(e) => setSort(e.target.value)}
							as="select"
							aria-label="Default select example"
							className="shadow-md"
						>
							<option value="created_at:desc">Terbaru</option>
							<option value="created_at:asc">Terlama</option>
							<option value="title:asc">Judul (A-Z)</option>
							<option value="title:desc">Judul (Z-A)</option>
						</Select>
					</StyledFormGroup>
				</div>

				<OuterContainer className="mt-5">
					{blogPostsState.map((blogPost) => (
						<BlogCardMain
							blogPost={blogPost}
							key={blogPost.id}
							showBookmark={false}
						/>
					))}
				</OuterContainer>
			</Container>
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
