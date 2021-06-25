import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
const StyledHeadingXXL = styled(HeadingXXL)`
	color: #a5a5a5;
`;
const StyledTextPrimary = styled(TextPrimary)`
	font-size: 30px;
`;
const StyledHeadingMD = styled(HeadingMD)`
	text-transform: uppercase;
`;
const StyledImg = styled(Image)`
	width: 80%;
	margin-top: 48px;
	border-radius: 8px;
`;

const StyledCol = styled(Col)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const StyledRow = styled(Row)`
	padding-top: 160px;
`;
const OuterContainer = styled.div`
	display: flex;
	padding-bottom: 160px;
`;
export default function HalfHalf({ left, right, mode = "dark" }) {
	return (
		<OuterContainer
			className={`${mode === "light" ? `bg-white` : `bg-primary1`}`}
		>
			<Container>
				<StyledRow>
					<Col lg={6} md={12}>
						{left}
					</Col>
					<StyledCol lg={6} md={12}>
						{right}
					</StyledCol>
				</StyledRow>
			</Container>
		</OuterContainer>
	);
}
