import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import styled from "styled-components";
import { Col, Row, Container, Image } from "react-bootstrap";
import { HeadingXL } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import YellowButton from "components/Buttons/YellowButton";

const StyledHeading = styled(HeadingXL)`
	font-family: MontserratRegular;
	max-width: 800px;
	& > span {
		font-family: MontserratBold;
	}
`;

const StyledContainer = styled(Container)`
	height: 100%;
`;

const OuterContainer = styled.div`
	height: 100vh;
	background-image: linear-gradient(#1022a4, #31a4fa);
`;
const StyledRow = styled(Row)`
	position: relative;
	z-index: 1;
`;
const BlueBlob = styled(Image)`
	position: absolute;
	bottom: 18%;
	right: 160px;
	width: 340px;
	height: 340px;
`;
const PurpleBlob = styled(Image)`
	position: absolute;
	bottom: 15%;
	right: 240px;
`;

export default function Home() {
	return (
		<OuterContainer>
			<StyledContainer className="position-relative">
				<StyledRow>
					<Col className="align-items-center d-flex justify-content-center">
						<StyledHeading className="text-white text-center">
							Belajarlah Setiap Hari Jadilah <span>UNBELIEVEABLE!</span>
						</StyledHeading>
					</Col>
				</StyledRow>
				<StyledRow className="mt-5">
					<Col className="align-items-center d-flex justify-content-center">
						<TextPrimary className="text-white text-capitalize">
							jadilah lebih baik setiap harinya bersama komunitas kami menuju
							pribadi yang luar biasa!
						</TextPrimary>
					</Col>
				</StyledRow>
				<StyledRow className="mt-4">
					<Col>
						<YellowButton>Mulai Sekarang!</YellowButton>
					</Col>
				</StyledRow>
				<BlueBlob className="position-absolute" src={"/images/blueblob.png"} />
			</StyledContainer>
		</OuterContainer>
	);
}
