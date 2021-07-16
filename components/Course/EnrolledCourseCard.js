import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import { FaStar } from "react-icons/fa";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
const CardBody = styled.div`
	display: flex;
	height: 40%;
	flex-direction: column;
	position: relative;
	padding: 20px 32px;
`;

const CardHeader = styled(HeadingXXS)`
	font-size: 14px;
	font-family: MontserratRegular;
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
	min-height: 480px;
	&:hover {
		cursor: pointer;
	}
`;
const ImageContainer = styled.div`
	background: ${(props) =>
		props.img ? `url(${props.img}) no-repeat` : `gray`};
	background-size: cover; /* <------ */
	background-position: center center; /* optional, center the image */
	height: 80%;
	border-radius: 12px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`;

const Star = styled(FaStar)`
	color: #e8e8e8;
	transition: 0.2s;
	&.checked {
		color: gold;
	}
`;
export default function EnrolledCourseCard({
	small,
	user,
	totalProgress = 0,
	course,
	...props
}) {
	const [hoveredStar, setHoveredStar] = useState(-1);
	const [selectedStar, setSelectedStar] = useState(-1);
	const { title, slug, content_creator, image, rating } = course;
	const { rateClass } = useContext(CourseContext);
	const { token } = useContext(AuthContext);

	useEffect(() => {
		const userRatedIndex = rating.findIndex((rating) => {
			return rating.user.id == user.id;
		});
		if (userRatedIndex >= 0) {
			// if user is there, it will ahve an Index
			setSelectedStar(rating[userRatedIndex].rate);
		}
	}, [rating]);
	const handleClickStars = (ix) => {
		console.log(course.id);
		setSelectedStar(ix + 1);
		rateClass(course, user.id, token, ix + 1);
	};
	return (
		<Link href={`kelas/${slug}`}>
			<StyledCard small={small} {...props}>
				<ImageContainer small={small} img={image} />

				<CardBody>
					<CardHeader as="p" className="mt-3">
						{title}
					</CardHeader>

					<StyledTextTertiary className="mt-2">
						{content_creator && content_creator.full_name}
					</StyledTextTertiary>
					<StyledProgressBar className="mt-3 shadow-sm" now={totalProgress} />
					<div className="d-flex justify-content-between mt-3">
						<StyledTextTertiary>{totalProgress}% complete</StyledTextTertiary>

						<div className="d-flex">
							{[...Array(5)].map((_, ix) => (
								<Star
									size={18}
									onMouseEnter={() => setHoveredStar(ix + 1)}
									onMouseLeave={() => setHoveredStar(-1)}
									onClick={(e) => {
										e.stopPropagation();
										handleClickStars(ix);
									}}
									className={`mr-1 ${
										(hoveredStar >= ix + 1 || selectedStar >= ix + 1) &&
										`checked`
									}`}
									key={ix}
								/>
							))}
						</div>
					</div>
				</CardBody>
			</StyledCard>
		</Link>
	);
}
