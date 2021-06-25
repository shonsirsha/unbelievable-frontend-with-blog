import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
const StyledCol = styled(Col)`
	display: flex;
	flex-direction: column;
	justify-content: center;

	&.special {
		margin-top: 96px;
	}
`;
const StyledRow = styled(Row)`
	padding-top: 160px;
`;
const OuterContainer = styled.div`
	display: flex;
	padding-bottom: 160px;
`;
export default function HalfHalf({ left, right, light, bottom }) {
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
					{bottom && (
						<StyledCol className="special align-items-center" lg={12}>
							{bottom}
						</StyledCol>
					)}
				</StyledRow>
			</Container>
		</OuterContainer>
	);
}
