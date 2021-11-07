import styled from "styled-components";
import { Button } from "react-bootstrap";
import Image from "next/image";
const StyledButton = styled(Button)`
	border-radius: 100%;
	height: 52px;
	width: 52px;
	border: 5px solid white;
	outline: none;
	position: relative;
	&:hover {
		border: 5px solid white;
	}
	&:focus {
		border: 5px solid white;
		outline: none;
	}
`;
export default function RoundedBtnIcon({ img, ...props }) {
	return (
		<StyledButton {...props}>
			<Image src={img} layout="fill" objectFit={true} alt="Drawing" />
		</StyledButton>
	);
}
