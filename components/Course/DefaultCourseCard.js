import { useContext, useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS, HeadingXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { Popover } from "react-tiny-popover";

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

	& .react-tiny-popover-container {
		display: none;
	}
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 13px;
`;
const CardHeader = styled(HeadingXXS)`
	font-size: 14px;
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
	height: ${(props) => (props.small ? `240px` : `305px`)};

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

const PopoverContainer = styled.div`
	min-width: 80px;
	padding: 8px;
	border-radius: 8px;
	background: #0160ef;
	a:hover {
		cursor: pointer;
	}
	font-size: 14px;

	a {
		text-decoration: underline !important;
	}
`;

export default function DefaultCourseCard({
	course,
	small,
	user,
	enrolled = false,
	...props
}) {
	const {
		title,
		short_desc,
		content_creator,
		image,
		videos,
		slug,
		total_rating,
		paid,
	} = course;
	const {
		enrollClassLoading,
		enrollClass,
		setPreviewModalOpen,
		setSelectedPreviewCourse,
		addWishlist,
	} = useContext(CourseContext);
	const { token } = useContext(AuthContext);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const openModal = () => {
		setPreviewModalOpen(true);
		setSelectedPreviewCourse(course);
	};

	return (
		<StyledCard
			small={small ? 1 : 0}
			{...props}
			onClick={() => {
				if (!enrolled || !token) {
					openModal();
				} else {
					enrollClass(course, token);
				}
			}}
		>
			<ImageContainer small={small} img={image} />

			<CardBody>
				<CardHeader as="p" className="mt-3">
					{title}
				</CardHeader>
				<div className="d-flex mt-2">
					<TextDesc small={small}>{short_desc}</TextDesc>
				</div>

				<StyledTextTertiary className="mt-4">
					{content_creator && content_creator.full_name}
				</StyledTextTertiary>

				<div className="d-flex ml-0 mt-4 ml-lg-auto justify-content-center align-items-center">
					<HeadingXS className="text-primary1 mr-1 ">
						{total_rating > 0 ? total_rating : "-"}
					</HeadingXS>
					<TotalRating>/ 5</TotalRating>
				</div>
				<div className="mt-auto d-flex justify-content-between align-items-center">
					<div className="d-flex">
						{user && !paid && (
							<Like
								onClick={async (e) => {
									e.stopPropagation();
									const wishlisted = await addWishlist(
										{ course: course },
										token
									);

									if (wishlisted) {
										toast.success("Kelas ini telah ditambahkan ke wishlist!");
									} else {
										toast.error(
											"Terjadi kesalahan dalam menambahkan kelas ke wishlist"
										);
									}
								}}
								className="mr-2"
							/>
						)}
						<Share
							onClick={(e) => {
								e.stopPropagation();
								navigator.clipboard.writeText(
									`${window.location.origin}/kelas/${slug}`
								);
								setIsPopoverOpen(true);

								setTimeout(() => {
									setIsPopoverOpen(false);
								}, 800);
							}}
						/>

						<Popover
							isOpen={isPopoverOpen}
							onClickOutside={() => setIsPopoverOpen(false)}
							padding={4}
							reposition={true}
							positions={["bottom"]} // preferred positions by priority
							content={() => (
								// you can also provide a render function that injects some useful stuff!
								<PopoverContainer
									onClick={(e) => {
										e.stopPropagation();
									}}
									className="shadow text-white text-center"
								>
									URL kelas telah disalin
								</PopoverContainer>
							)}
						>
							<div
								onClick={(e) => {
									e.stopPropagation();
									setIsPopoverOpen(!isPopoverOpen);
								}}
							></div>
						</Popover>
					</div>
					<div className="d-flex">
						{[...Array(Math.round(total_rating > 0 ? total_rating : 0))].map(
							(ix) => (
								<Image
									alt="star"
									key={ix}
									width={17}
									height={16}
									src="/images/gold-star.png"
								/>
							)
						)}
						{[
							...Array(total_rating > 0 ? 5 - Math.round(total_rating) : 5),
						].map((ix) => (
							<Image
								alt="star"
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
					disabled={enrollClassLoading}
					small={small ? 1 : 0}
					onClick={(e) => {
						if (!enrollClassLoading) {
							e.stopPropagation();
							enrollClass(course, token ? token : null);
						}
					}}
				>
					<StyledHeadingXXS as="p">
						{!enrolled ? "Free Trial" : "Lanjutkan"}
					</StyledHeadingXXS>
				</EnrollBtn>
			</CardBody>
		</StyledCard>
	);
}
