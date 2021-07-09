import Link from "next/link";
import { Image } from "react-bootstrap";
import SideBlock from "./SideBlock";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import styled from "styled-components";

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
`;
export default function ReviewBlock() {
	const content = (
		<Link href="/review">
			<a>
				<div
					role="button"
					className="d-flex justify-content-between align-items-center flex-column"
				>
					<div className="d-flex flex-column">
						<StyledHeadingXXS as="p" className="text-center">
							tulis review
						</StyledHeadingXXS>
						<TextTertiary className="mt-1 text-center mb-2">
							disini!
						</TextTertiary>
					</div>
					<Image src="images/character2.png" alt="Character" />
				</div>
			</a>
		</Link>
	);
	return <StyledSideBlock content={content} className="bg-yellow3" />;
}
