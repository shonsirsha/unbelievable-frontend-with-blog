import { HeadingLG } from "components/Typography/Headings";
import styled from "styled-components";
const OuterContainer = styled.div`
	height: 380px;
	width: 100%;
	padding-top: 112px;
	padding-bottom: 64px;
	display: flex;
	background: #31a4fa;
	background-image: linear-gradient(#080f3e, #31a4fa);
	align-items: center;
	justify-content: center;
`;
const StyledHeading = styled(HeadingLG)`
	font-size: 47px;
`;
export default function Showcase({ title = "Title" }) {
	return (
		<OuterContainer>
			<StyledHeading className="text-white text-center">{title}</StyledHeading>
		</OuterContainer>
	);
}
