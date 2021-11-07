import { useState, useContext } from "react";
import Link from "next/link";
import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import { FaStar } from "react-icons/fa";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { Popover } from "react-tiny-popover";
import { nanoid } from "nanoid";
import Image from "next/image";
const CardBody = styled.div`
	display: flex;
	height: 40%;
	flex-direction: column;
	position: relative;
	padding: 20px 32px;
`;

const CardHeader = styled(HeadingXXS)`
	font-size: 13.5px;
	font-family: MontserratRegular;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StyledProgressBar = styled(ProgressBar)`
	border-radius: 16px;
	height: 12px;
	transition: 0.4s;
	.progress-bar {
		border-radius: 16px;
		background: #171b2d;
	}
`;

const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const StyledCard = styled(Card)`
	border-radius: 12px;
	box-shadow: 2px 1px 15px rgba(0, 0, 0, 0.1);
	width: ${(props) => (props.small ? `215px` : `308px`)};
	border: none;
	transition: 0.25s all;
	min-height: 480px;
	&:hover {
		cursor: pointer;
		transform: scale(1.01) translate(3px, -9px);
	}
	@media (max-width: 1024px) {
		&:hover {
			cursor: pointer;
			transform: none;
		}
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	height: 80%;
	position: relative;

	& > div {
		border-radius: 12px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

const Star = styled(FaStar)`
	color: #e8e8e8;
	transition: 0.2s;
	&.checked {
		color: gold;
	}
`;

const PopoverContainer = styled.div`
	min-width: 80px;
	padding: 16px;
	border-radius: 8px;

	a:hover {
		cursor: pointer;
	}

	a {
		text-decoration: underline !important;
	}
`;

export default function EnrolledCourseCard({ small, user, course, ...props }) {
	const [hoveredStar, setHoveredStar] = useState(-1);
	const {
		title,
		slug,
		content_creator,
		image,
		my_rating,
		grouped_videos,
		paid,
		percentage_course_finished,
	} = course;
	const { rateClass, setPreviewModalOpen, setSelectedPreviewCourse } =
		useContext(CourseContext);
	const { token } = useContext(AuthContext);
	const [selectedStar, setSelectedStar] = useState(my_rating);
	const [justRated, setJustRated] = useState(false);
	const [recentlyAddedStar, setRecentlyAddedStar] = useState(-1);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const openModal = () => {
		setPreviewModalOpen(true);
		setSelectedPreviewCourse(course);
		setIsPopoverOpen(false);
	};
	const handleClickStars = (ix) => {
		if (!paid) {
			setIsPopoverOpen(true);
			setTimeout(() => {
				setSelectedStar(-1);
				setRecentlyAddedStar(-1);
				setHoveredStar(-1);
			}, 350);
		} else {
			setJustRated(true);
			setSelectedStar(ix + 1);
			setRecentlyAddedStar(ix + 1);
			rateClass(course, token, ix + 1);
		}
	};

	return (
		<Link
			passHref
			href={`kelas/${slug}?c=${grouped_videos.videos[0].bunny_video.upload_id}`}
		>
			<StyledCard small={small} {...props}>
				<ImageContainer>
					<Image
						priority={true}
						src={image}
						layout="fill"
						objectFit="cover"
						alt="Poster Kelas"
					/>
				</ImageContainer>

				<CardBody>
					<CardHeader as="p" className="mt-3">
						{title}
					</CardHeader>

					<StyledTextTertiary className="mt-2">
						{content_creator && content_creator.full_name}
					</StyledTextTertiary>
					<StyledProgressBar
						className="mt-3 shadow-sm"
						now={percentage_course_finished}
					/>
					<div className="d-flex justify-content-between mt-3">
						<StyledTextTertiary>
							{percentage_course_finished}% complete
						</StyledTextTertiary>
						<div className="d-flex flex-column">
							<Popover
								isOpen={isPopoverOpen}
								onClickOutside={() => setIsPopoverOpen(false)}
								padding={32}
								reposition={true}
								positions={["bottom"]} // preferred positions by priority
								content={() => (
									// you can also provide a render function that injects some useful stuff!
									<PopoverContainer
										onClick={(e) => {
											e.stopPropagation();
										}}
										className="shadow text-white text-center bg-primary1"
									>
										<a onClick={openModal}>Beli kelas</a> ini untuk
										<br /> meninggalkan rating
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
							<div className="d-flex">
								{[...Array(5)].map((_, ix) => (
									<Star
										key={nanoid()}
										size={18}
										onMouseEnter={() => {
											setHoveredStar(ix + 1);
											setSelectedStar(-1);
										}}
										onMouseLeave={() => {
											setHoveredStar(-1);
											if (!justRated) {
												if (recentlyAddedStar > -1) {
													setSelectedStar(recentlyAddedStar);
												} else {
													setSelectedStar(my_rating);
												}
											} else {
												setSelectedStar(ix + 1);
												setJustRated(false);
											}
										}}
										onClick={(e) => {
											e.stopPropagation();
											handleClickStars(ix);
										}}
										className={`mr-1 ${
											(hoveredStar >= ix + 1 || selectedStar >= ix + 1) &&
											`checked`
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</CardBody>
			</StyledCard>
		</Link>
	);
}
