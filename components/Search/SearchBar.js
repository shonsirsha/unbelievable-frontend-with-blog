import styled from "styled-components";
import { FormControl } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
const StyledBar = styled(FormControl)`
	padding: 32px 24px;
	padding-left: 52px;
	background: #f2f2f2;
	border: none;
	font-size: 19px;
	border-radius: 8px;
	transition: 0.4s;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f2f2f2 inset !important;
		outline: none;
	}

	&:focus {
		background: #e8e8e8;
		outline: none;
	}
`;
const StyledContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 640px;
	display: flex;
`;
const SearchIcon = styled(MdSearch)`
	position: absolute;
	font-size: 29px;
	left: 16px;
	top: 18px;
`;
export default function SearchBar({ ...props }) {
	return (
		<StyledContainer>
			<StyledBar {...props} />
			<SearchIcon />
		</StyledContainer>
	);
}
