import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
const StyledButton = styled(Button)`
	border-radius: 100%;
	height: 64px;
	width: 64px;
	border: none;
`;
export default function RoundedBtnIcon({ bg, icon, ...props }) {
	return (
		<StyledButton
			variant="primary"
			className={`bg-${bg} ${props.className}`}
			onClick={props.onClick}
		>
			{icon}
		</StyledButton>
	);
}
