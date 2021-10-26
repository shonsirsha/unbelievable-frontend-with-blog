import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledCol = styled(Col)`
	display: flex;
	flex-direction: column;
	justify-content: center;

	&.special {
		margin-top: 96px;
	}

	@media ${mediaBreakpoint.down.lg} {
		&:nth-child(2) {
			margin-top: 48px;
		}
	}
`;
const StyledRow = styled(Row)`
	padding-top: 160px;
	@media ${mediaBreakpoint.down.lg} {
		padding-top: 48px;
	}
`;
const OuterContainer = styled.div`
	display: flex;
	padding-bottom: 160px;

	@media ${mediaBreakpoint.down.lg} {
		padding-bottom: 48px;
	}
`;
export default function HalfHalf({
	left,
	right,
	leftLg = 6,
	rightLg = 6,
	light,
	bottom,
}) {
	return (
		<OuterContainer className={`${light ? `bg-white` : `bg-primary1`}`}>
			<Container>
				<StyledRow>
					<StyledCol lg={leftLg} md={12}>
						{left}
					</StyledCol>
					<StyledCol lg={rightLg} md={12}>
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
