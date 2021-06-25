import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
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
export default function HalfHalf({ left, right, light }) {
	return (
		<OuterContainer className={`${light ? `bg-white` : `bg-primary1`}`}>
			<Container>
				<StyledRow>
					<StyledCol lg={6} md={12}>
						{left}
					</StyledCol>
					<StyledCol lg={6} md={12}>
						{right}
					</StyledCol>
				</StyledRow>
			</Container>
		</OuterContainer>
	);
}
