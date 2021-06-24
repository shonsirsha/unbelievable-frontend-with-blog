import { Button } from "react-bootstrap";
import styled from "styled-components";
const StyledButton = styled(Button)`
	text-transform: uppercase;
	font-size: 18px;
	font-family: MontserratBold;
	padding: 10px 32px;
	border-radius: 8px;
	color: black;
	letter-spacing: 0.3px;

	&:hover {
		color: black;
	}
`;
export default function YellowButton({ children, ...props }) {
	return (
		<StyledButton className={"shadow bg-darktan"} {...props}>
			{children}
		</StyledButton>
	);
}
