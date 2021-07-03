import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
const StyledButton = styled(Button)`
	border-radius: 100%;
	height: 48px;
	width: 48px;
	border: none;
`;
export default function RoundedBtnIcon({ bg, icon, ...props }) {
	return (
		<StyledButton variant="primary" className={`bg-${bg} ${props.className}`}>
			{icon}
		</StyledButton>
	);
}
