import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
const StyledContainer = styled(Container)`
	width: 100%;
	justify-content: center;
	padding-top: 140px;
	padding-bottom: 56px;
	overflow: hidden;
	display: flex;
	@media ${mediaBreakpoint.down.lg} {
		flex-direction: column;
	}
`;

const Main = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
`;

const Sidebar = styled.div`
	width: 20%;

	@media ${mediaBreakpoint.down.lg} {
		width: 100%;
	}
`;

const InnerBlogLayout = ({ children }) => {
	return (
		<StyledContainer>
			<Main>{children}</Main>
			<Sidebar>DADAX</Sidebar>
		</StyledContainer>
	);
};

export default InnerBlogLayout;
