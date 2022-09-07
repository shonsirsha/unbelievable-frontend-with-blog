import styled from "styled-components";
import { FormControl } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { mediaBreakpoint } from "utils/breakpoints";
const StyledBar = styled(FormControl)`
	padding: 28px 21px;
	padding-left: 60px;
	background: #f2f2f2;
	border: none;
	font-size: 13px;
	border-radius: 28px;
	width: 100%;
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

	@media ${mediaBreakpoint.down.lg} {
		max-width: 100%;
	}
`;

const SearchIcon = styled(MdSearch)`
	position: absolute;
	font-size: 29px;
	left: 18px;
	top: 13px;
`;
export default function SearchBarBlog({ ...props }) {
	return (
		<StyledContainer>
			<StyledBar {...props} />
			<SearchIcon />
		</StyledContainer>
	);
}
