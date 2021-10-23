import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXS } from "components/Typography/Headings";
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	padding: 32px;
	& > .inner {
		display: flex; // make us of Flexbox
		flex-direction: column;
		align-items: center; // does vertically center the desired content
		justify-content: center; // horizontally centers single line items
		margin: auto;
	}
	& #logo {
		max-width: 571px;
		width: 100%;
	}
`;

const MaintenancePage = () => {
	return (
		<Container className="bg-primary1">
			<div className="inner">
				<Image id="logo" src="/images/logo.png" alt="logo" />
				<HeadingXS className="text-white mt-5 text-center">
					Sedang terjadi maintenance hingga 04.02.2022 jam 13:30. Sampai nanti!
				</HeadingXS>
			</div>
		</Container>
	);
};

export default MaintenancePage;
