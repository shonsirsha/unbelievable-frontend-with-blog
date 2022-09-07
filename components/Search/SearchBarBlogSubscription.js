import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import HeaderTextBig from "components/Blog/HeaderTextBig";

const StyledBar = styled(FormControl)`
	padding: 18px 21px;
	padding-right: 128px;
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

const StyledButton = styled(Button)`
	position: absolute;
	font-size: 14px;
	right: 0;
	top: 0;
	width: 120px;
	padding-top: 7.5px;
	padding-bottom: 7.5px;
	border-radius: 28px;
	font-family: MontSerratBold;
	border: none;
`;
export default function SearchBarBlogSubscription({ ...props }) {
	return (
		<div className="d-flex flex-column">
			<HeaderTextBig>Berlangganan Artikel Unbelievable</HeaderTextBig>
			<StyledContainer className="mt-3">
				<StyledBar type="email" {...props} />
				<StyledButton variant="primary" className="bg-primary1">
					Subscribe
				</StyledButton>
			</StyledContainer>
		</div>
	);
}
