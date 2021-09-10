import styled from "styled-components";
import { Image } from "react-bootstrap";
import { TextSecondary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
import HalfHalf from "components/HalfHalf/HalfHalf";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledHeadingXXL = styled(HeadingXXL)`
	@media ${mediaBreakpoint.down.lg} {
		font-size: 48px;
	}
`;
const StyledImage = styled(Image)`
	object-fit: cover;
`;
export default function TentangKami({ professionals }) {
	console.log(professionals);
	const left = (
		<>
			<HeadingMD as="h2" className="mt-1 text-white">
				dengan
			</HeadingMD>
			<StyledHeadingXXL as="h2" className="mt-2 text-blue">
				TERBAIK
			</StyledHeadingXXL>
			<HeadingMD as="h2" className="mt-1 text-white">
				di bidangnya
			</HeadingMD>
		</>
	);

	const right = (
		<>
			{professionals && (
				<div className="mt-lg-0 mt-4 d-flex flex-lg-row flex-column">
					{professionals.map((p) => (
						<div
							key={p.id}
							className="d-flex flex-column align-items-center mr-lg-5 mr-0"
						>
							<StyledImage
								alt="speaker"
								src={p.photo ? p.photo.url : `/images/plcholder.png`}
								width={210}
								height={210}
								roundedCircle
							/>
							<TextSecondary
								style={{ whiteSpace: "pre-line" }}
								className="mt-lg-5 mt-2  text-white text-justify"
							>
								{p.description}
							</TextSecondary>
						</div>
					))}
				</div>
			)}
		</>
	);
	return <HalfHalf left={left} right={right} />;
}
