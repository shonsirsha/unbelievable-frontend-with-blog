import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledButton = styled(Button)`
	border-radius: 100%;
	height: 52px;
	width: 52px;
	background: url(${(props) => props.img});
	border: 5px solid white;
	background-position: center;
	outline: none;

	&:hover {
		background: url(${(props) => props.img});
		border: 5px solid white;
		background-position: center;
	}
	&:focus {
		border: 5px solid white;
		outline: none;
	}
`;
export default function RoundedBtnIcon({ img, ...props }) {
	return <StyledButton {...props} img={img}></StyledButton>;
}
