import Link from "next/link";
import Image from "next/image";
import SideBlock from "./SideBlock";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import styled from "styled-components";
import { MdRateReview } from "react-icons/md";
import SmallGreenMonster from "../../public/images/character2.svg";
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 18px;
`;
const StyledSideBlock = styled(SideBlock)`
	width: 240px;

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
export default function ReviewBlock({ ...props }) {
	const { className } = props;
	const content = (
		<Link href="/profil/feedback">
			<a>
				<ContentContainer
					role="button"
					className="d-flex justify-content-between align-items-center flex-row"
				>
					<div className="d-flex flex-column">
						<StyledHeadingXXS as="p" className="text-left mb-1">
							Tulis Masukkan
						</StyledHeadingXXS>
						<TextTertiary className="mt-1 text-left ">Di sini!</TextTertiary>
					</div>
					<Image
						layout="fixed"
						width={67}
						height={57}
						src={SmallGreenMonster}
						alt="Character"
					/>
				</ContentContainer>
				<Feedback />
			</a>
		</Link>
	);
	return (
		<StyledSideBlock content={content} className={`bg-yellow3 ${className}`} />
	);
}
