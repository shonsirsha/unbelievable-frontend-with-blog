import { Card, CardImg, Button } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;
	margin: auto;
	margin-bottom: -40px;
	width: 116px;
`;
const CardBody = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	position: relative;
	padding: 20px 32px;
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 14px;
`;
const CardHeader = styled(HeadingXXS)`
	font-size: 17px;
	font-family: MontserratRegular;
`;
const StyledImg = styled(CardImg)`
	height: 120px;
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const StyledCard = styled(Card)`
	border-radius: 12px;
	box-shadow: 3px 1px 5px rgba(0, 0, 0, 0.1);
	width: 308px;
	min-height: 532px;
	border: none;
`;
const ImageContainer = styled.div`
	background: ${(props) =>
		props.img ? `url(${props.img}) no-repeat` : `gray`};
	background-size: cover; /* <------ */
	background-position: center center; /* optional, center the image */
	height: 100%;
	width: 100%;
	border-radius: 12px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`;
export default function DefaultCourseCard({
	title,
	shortDesc,
	img,
	creatorName,
	...props
}) {
	return (
		<StyledCard {...props}>
			<ImageContainer img={img} />

			<CardBody>
				<CardHeader as="p" className="mt-3">
					{title}
				</CardHeader>
				<TextTertiary className="mt-2">{shortDesc}</TextTertiary>
				<StyledTextTertiary className="mt-2">{creatorName}</StyledTextTertiary>
				<EnrollBtn className="bg-primary1">
					<StyledHeadingXXS as="p">enroll</StyledHeadingXXS>
				</EnrollBtn>
			</CardBody>
		</StyledCard>
	);
}
