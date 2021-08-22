import { Image } from "react-bootstrap";
import styled from "styled-components";

const StyledImage = styled(Image)`
	position: static;
	width: 48px;
	height: 48px;
`;
const StyledDiv = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	right: 50%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export default function LoadingCallback() {
	return (
		<StyledDiv>
			<StyledImage src="/images/loading.gif" alt="Loading..." />
			<p className="mt-3">Masuk dengan Google...</p>
		</StyledDiv>
	);
}
