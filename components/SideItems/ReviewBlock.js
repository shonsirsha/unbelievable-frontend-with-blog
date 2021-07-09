import Link from "next/link";
import { Image } from "react-bootstrap";
import SideBlock from "./SideBlock";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import styled from "styled-components";

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 18px;
`;
export default function ReviewBlock() {
	const content = (
		<Link href="/review">
			<div
				role="button"
				className="d-flex justify-content-between align-items-center"
			>
				<div className="d-flex flex-column">
					<StyledHeadingXXS as="p">tulis review</StyledHeadingXXS>
					<TextTertiary className="mt-1">disini!</TextTertiary>
				</div>
				<Image src="images/character2.png" alt="Character" />
			</div>
		</Link>
	);
	return (
		<div>
			<SideBlock content={content} className="bg-yellow3" />
		</div>
	);
}
