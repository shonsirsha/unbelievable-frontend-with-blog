import styled from "styled-components";
import HalfHalf from "components/HalfHalf/HalfHalf";
import { TextSecondary } from "components/Typography/Text";

import {
	HeadingLG,
	HeadingXXL,
	HeadingXS,
	HeadingSM,
} from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledTextSecondary = styled(TextSecondary)`
	max-width: 260px;
	text-align: justify;
	white-space: pre-line;
	@media ${mediaBreakpoint.down.lg} {
		max-width: 100%;
	}
`;
const StyledHeadingXXL = styled(HeadingXXL)`
	font-size: 96px;
	margin-right: ${(props) => (props.nth === 0 ? `80` : `64`)}px;

	@media ${mediaBreakpoint.down.md} {
		margin-bottom: auto;
		font-size: 72px;
		margin-right: ${(props) => (props.nth === 0 ? `40` : `24`)}px;
	}
`;
const StyledHeadingXS = styled(HeadingXS)`
	font-size: 18px;
`;

const StyledHeadingLG = styled(HeadingLG)`
	@media ${mediaBreakpoint.down.md} {
		font-size: 32px;
	}
`;

const StyledHeadingSM = styled(HeadingSM)`
	@media ${mediaBreakpoint.down.md} {
		font-size: 34px;
	}

	@media ${mediaBreakpoint.down.lg} {
		font-size: 40px;
	}
`;
export default function CaraKerja({ carakerja }) {
	const left = (
		<>
			<StyledHeadingLG as="h2">bagaimana</StyledHeadingLG>
			<StyledHeadingSM as="h2" className="mt-1 text-blue">
				cara kerjanya?
			</StyledHeadingSM>
		</>
	);

	const right = (
		<>
			<div className="d-flex flex-column">
				{carakerja &&
					carakerja.map((item, ix) => (
						<div key={ix} className="mb-lg-3 mb-5 d-flex align-items-center">
							<StyledHeadingXXL nth={ix} className="text-lightblue" as="p">
								{ix + 1}
							</StyledHeadingXXL>
							<div className=" d-flex flex-column">
								<StyledHeadingXS as="h3" className="mb-1">
									{item.title}
								</StyledHeadingXS>
								<StyledTextSecondary>{item.content}</StyledTextSecondary>
							</div>
						</div>
					))}
			</div>
		</>
	);
	return <HalfHalf left={left} right={right} light />;
}
