import { Card, Image, Button } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS, HeadingXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;
	position: absolute;
	bottom: -16px;
	left: 0;
	right: 0;
	margin-left: ${(props) => (props.small ? `22.5%` : `30%`)};

	width: 116px;
`;
const CardBody = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	position: relative;
	padding: 20px 32px;
	padding-bottom: 48px;
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 13px;
`;
const CardHeader = styled(HeadingXXS)`
	font-size: 14px;
	height: 40px;
	font-family: MontserratRegular;
`;

const TotalRating = styled(HeadingXXS)`
	font-size: 14px;
	font-family: MontserratRegular;
`;

const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const StyledCard = styled(Card)`
	border-radius: 12px;
	box-shadow: 2px 1px 15px rgba(0, 0, 0, 0.1);
	width: ${(props) => (props.small ? `215px` : `308px`)};
	height: 520px;
	border: none;

	&:hover {
		cursor: pointer;
	}
`;
const ImageContainer = styled.div`
	background: ${(props) =>
		props.img ? `url(${props.img}) no-repeat` : `gray`};
	background-size: cover; /* <------ */
	background-position: center center; /* optional, center the image */
	height: ${(props) => (props.small ? `240px` : `380px`)};

	width: 100%;
	border-radius: 12px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`;
const Share = styled(MdShare)`
	font-size: 26px;
	color: #171b2d;
	transition: 0.25s;
	&:hover {
		cursor: pointer;
		color: #3c4777;
	}
`;
const Like = styled(FaHeart)`
	font-size: 24px;
	color: #171b2d;
	transition: 0.25s;
	&:hover {
		cursor: pointer;
		color: #3c4777;
	}
`;
const TextDesc = styled(TextTertiary)`
	height: ${(props) => (props.small ? `56px` : `32px`)};
	font-size: ${(props) => (props.small ? `12px` : `14px`)};
`;
export default function DefaultCourseCard({
	title,
	shortDesc,
	img,
	creatorName,
	rating,
	small,
	enrollClass,
	user,
	owned = false,
	...props
}) {
	return (
		<StyledCard small={small} {...props} onClick={() => alert("Card clicked")}>
			<ImageContainer small={small} img={img} />

			<CardBody>
				<CardHeader as="p" className="mt-3">
					{title}
				</CardHeader>
				<div className="d-flex mt-2">
					<TextDesc small={small}>{shortDesc}</TextDesc>
				</div>

				<StyledTextTertiary className="mt-auto">
					{creatorName}
				</StyledTextTertiary>

				<div className="d-flex ml-0 mt-4 ml-lg-auto justify-content-center align-items-center">
					<HeadingXS className="text-primary1 mr-1 ">
						{rating ? rating : "-"}
					</HeadingXS>
					<TotalRating>/ 5</TotalRating>
				</div>
				<div className="mt-auto d-flex justify-content-between align-items-center">
					<div className="d-flex">
						{user && (
							<Like
								onClick={(e) => {
									e.stopPropagation();
									alert("liked");
								}}
								className="mr-2"
							/>
						)}
						<Share
							onClick={(e) => {
								e.stopPropagation();
								alert("Share");
							}}
						/>
					</div>
					<div className="d-flex">
						{[...Array(parseInt(rating ? rating : 0))].map((ix) => (
							<Image
								key={ix}
								width={17}
								height={16}
								src="/images/gold-star.png"
							/>
						))}
						{[...Array(rating ? 5 - parseInt(rating) : 5)].map((ix) => (
							<Image
								key={ix}
								width={17}
								height={16}
								src="/images/gray-star.png"
							/>
						))}
					</div>
				</div>

				<EnrollBtn
					className="bg-primary1"
					small={small}
					onClick={(e) => {
						e.stopPropagation();
						enrollClass();
					}}
				>
					<StyledHeadingXXS as="p">
						{!owned ? "enroll" : "lanjutkan"}
					</StyledHeadingXXS>
				</EnrollBtn>
			</CardBody>
		</StyledCard>
	);
}
