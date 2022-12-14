import styled from "styled-components";
import { Col, Row, Container, Image } from "react-bootstrap";
import { HeadingXL } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import YellowButton from "components/Buttons/YellowButton";
import { mediaBreakpoint } from "utils/breakpoints";
import Link from "next/link";
import { isDesktop } from "react-device-detect";

const StyledContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const StyledHeading = styled(HeadingXL)`
	font-family: MontserratRegular;
	max-width: 800px;
	& > span {
		font-family: MontserratBold;
	}

	@media ${mediaBreakpoint.down.md} {
		font-size: 32px;
		line-height: 48px;
	}

	@media (max-width: 320px) {
		margin-top: 94px;
		font-size: 30px;
		line-height: 45px;
	}
`;

const OuterContainer = styled.div`
	height: 1080px;
	position: relative;
	background: linear-gradient(#1022a4, #31a4fa);
	@media (max-width: 320px) {
		min-height: 100vh;
	}

	& video {
		position: absolute;
		min-width: 100%;
		min-height: 100%;
	}

	@media (max-width: 1024px) {
		height: 100vh;
		& video {
			display: none;
		}
	}
`;
const StyledRow = styled(Row)`
	position: relative;
	z-index: 1;
`;
const BlueBlob = styled(Image)`
	position: absolute;
	bottom: 18%;
	right: 160px;
	display: none;
	width: 340px;
	height: 340px;

	@media (max-width: 1024px) {
		display: block;
	}
`;
export default function Hero() {
	return (
		<OuterContainer id="hero">
			{isDesktop && (
				<video autoPlay muted loop id="myVideo">
					<source src="/images/homexzxz.mp4" type="video/mp4" />
					Your browser does not support HTML5 video.
				</video>
			)}

			<StyledContainer className="position-relative">
				<StyledRow>
					<Col className="align-items-center d-flex justify-content-center">
						<StyledHeading className="text-white text-center">
							Belajarlah Setiap Hari Jadilah <span>UNBELIEVABLE!</span>
						</StyledHeading>
					</Col>
				</StyledRow>
				<StyledRow className="mt-4">
					<Col className="align-items-center d-flex justify-content-center">
						<TextPrimary className="text-center text-white text-capitalize">
							jadilah lebih baik setiap harinya bersama komunitas kami menuju
							pribadi yang luar biasa!
						</TextPrimary>
					</Col>
				</StyledRow>
				<StyledRow className="mt-4">
					<Col>
						<Link href="/menjadi-member">
							<a>
								<YellowButton>Coba Gratis!</YellowButton>
							</a>
						</Link>
					</Col>
				</StyledRow>
				<BlueBlob className="position-absolute" src={"/images/blueblob.png"} />
			</StyledContainer>
		</OuterContainer>
	);
}
