import Link from "next/link";
import { Image } from "react-bootstrap";
import SideBlock from "./SideBlock";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import styled from "styled-components";
import { MdRateReview } from "react-icons/md";

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 18px;
`;
const StyledSideBlock = styled(SideBlock)`
	width: 180px;

	a {
		color: inherit;
	}
	a:hover {
		text-decoration: none;
	}

	@media (max-width: 1024px) {
		width: 56px;
		height: 56px;
		border-radius: 100%;
	}
`;
const ContentContainer = styled.div`
	@media (max-width: 1024px) {
		display: none !important;
	}
`;
const Feedback = styled(MdRateReview)`
	display: none;
	font-size: 24px;
	color: black;
	@media (max-width: 1024px) {
		display: block;
	}
`;
export default function ReviewBlock() {
	const content = (
		<Link href="/profil/feedback">
			<a>
				<ContentContainer
					role="button"
					className="d-flex justify-content-between align-items-center flex-column"
				>
					<div className="d-flex flex-column">
						<StyledHeadingXXS as="p" className="text-center">
							Tulis Masukkan
						</StyledHeadingXXS>
						<TextTertiary className="mt-1 text-center mb-2">
							Disini!
						</TextTertiary>
					</div>
					<Image src="/images/character2.png" alt="Character" />
				</ContentContainer>
				<Feedback />
			</a>
		</Link>
	);
	return <StyledSideBlock content={content} className="bg-yellow3" />;
}
