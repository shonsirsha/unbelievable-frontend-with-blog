import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import Populer from "./Populer";
import Rekomendasi from "./Rekomendasi";
import AllTopics from "./AllTopics";

const StyledContainer = styled(Container)`
	width: 100%;
	justify-content: center;
	padding-top: 140px;
	padding-bottom: 56px;
	overflow: hidden;
	display: flex;
	max-width: 1180px;
	@media ${mediaBreakpoint.down.lg} {
		flex-direction: column;
	}
`;

const Main = styled.div`
	width: 72%;
	display: flex;
	flex-direction: column;

	@media ${mediaBreakpoint.down.lg} {
		width: 100%;
	}
`;

const Sidebar = styled.div`
	width: 28%;

	@media ${mediaBreakpoint.down.lg} {
		width: 100%;
	}
`;

const InnerBlogLayout = ({
	sideMenu = { allTopics: [], popularBlogPosts: [], recommendedBlogPosts: [] },
	children,
}) => {
	const { allTopics, popularBlogPosts, recommendedBlogPosts } = sideMenu;

	return (
		<StyledContainer>
			<Main className="pr-lg-5 mb-lg-0 mb-5">{children}</Main>
			<Sidebar>
				{recommendedBlogPosts.length > 0 && (
					<>
						<Rekomendasi recommendedBlogPosts={recommendedBlogPosts} />
						<div className="my-4" />
					</>
				)}
				<AllTopics allTopics={allTopics} />
				<hr />
				<div className="mt-5 mb-4" />
				<Populer popularBlogPosts={popularBlogPosts} />
			</Sidebar>
		</StyledContainer>
	);
};

export default InnerBlogLayout;
