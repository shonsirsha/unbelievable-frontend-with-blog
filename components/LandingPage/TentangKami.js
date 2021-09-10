import styled from "styled-components";
import { Image } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
import HalfHalf from "components/HalfHalf/HalfHalf";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledHeadingXXL = styled(HeadingXXL)`
	color: #a5a5a5;

	@media ${mediaBreakpoint.down.md} {
		font-size: 48px;
	}
`;
const StyledTextPrimary = styled(TextPrimary)`
	font-size: 30px;
`;
const StyledHeadingMD = styled(HeadingMD)`
	text-transform: uppercase;

	@media ${mediaBreakpoint.down.md} {
		font-size: 32px;
	}
`;
const StyledImg = styled(Image)`
	width: 80%;
	margin-top: 48px;
	border-radius: 8px;

	@media ${mediaBreakpoint.down.md} {
		margin-top: 16px;
	}
`;

export default function TentangKami({ about }) {
	const left = (
		<>
			<StyledHeadingXXL as="h2">tumbuh</StyledHeadingXXL>
			<StyledTextPrimary as="h2" className="text-white">
				bersama komunitas
			</StyledTextPrimary>
			<StyledHeadingMD as="h2" className="mt-1 text-blue">
				Unbelievable
			</StyledHeadingMD>
			<StyledImg src="/images/cat.jpeg" alt="image" />
		</>
	);

	const right = (
		<>
			{about && (
				<TextPrimary className="text-white" style={{ whiteSpace: "pre-line" }}>
					{about}
				</TextPrimary>
			)}
		</>
	);
	return (
		<div id="about">
			<HalfHalf left={left} right={right} />
		</div>
	);
}
