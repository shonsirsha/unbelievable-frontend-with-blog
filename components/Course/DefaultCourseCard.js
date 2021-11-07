import { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { HeadingXXS, HeadingXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { Popover } from "react-tiny-popover";
import { nanoid } from "nanoid";
import Image from "next/image";

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;
	position: absolute;
	bottom: -16px;
	left: 0;
	right: 0;
	margin-left: ${(props) => (props.small ? `26%` : `26%`)};
    width: 136px;
}`;
const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 20px 32px;
	padding-bottom: 48px;
	height: 50%;
	& .react-tiny-popover-container {
		display: none;
	}
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 12px;
`;
const CardHeader = styled(HeadingXXS)`
	font-size: 14px;
	font-family: MontserratRegular;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
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
	width: ${(props) => (props.small ? `280px` : `308px`)};
	border: none;
	transition: 0.25s all;
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
	height: ${(props) => (props.small ? `300px` : `305px`)};
	width: 100%;
	position: relative;

	& > div {
		border-radius: 12px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
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
	height: auto;
	font-size: 14px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const LebihLanjut = styled(TextTertiary)`
	height: auto;
	font-size: 12px;
`;
const TextSiswa = styled(TextTertiary)`
	font-size: 11px;
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
	enrolled = false,
	...props
}) {
	const {
		title,
		short_desc,
		content_creator,
		image,
		slug,
		total_rating,
		paid,
		num_of_participants,
		display_siswa,
	} = course;
	const {
		enrollClassLoading,
		enrollClass,
		setPreviewModalOpen,
		setSelectedPreviewCourse,
		addWishlist,
	} = useContext(CourseContext);
	const { setUser, user, token } = useContext(AuthContext);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const openModal = () => {
		setPreviewModalOpen(true);
		setSelectedPreviewCourse(course);
	};

	const handleWishlistClicked = async () => {
		const added = await addWishlist(course, token);

		const alreadyInWishlist = user.wishlist.some((u) => {
			return course.uuid === u.course.uuid;
		});

		if (alreadyInWishlist || added) {
			if (!alreadyInWishlist) {
				setUser({
					...user,
					wishlist: [...user.wishlist, { course: course }],
				});
			}
			toast.success("Kelas ini telah ditambahkan ke wishlist!");
		} else {
			console.log(alreadyInWishlist);
			toast.error("Terjadi kesalahan dalam menambahkan kelas ke wishlist");
		}
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
			<ImageContainer small={small}>
				<Image src={image} layout="fill" objectFit="cover" alt="Poster Kelas" />
			</ImageContainer>

			<CardBody>
				<CardHeader as="p" className="mt-3">
					{title}
				</CardHeader>

				<div className="d-flex flex-column mt-2">
					{display_siswa && (
						<TextSiswa className="mb-2">{num_of_participants} siswa</TextSiswa>
					)}

					{small ? (
						//small here means this card is the one that's
						//displayed on the dashboard (not Daftar kelas page)
						<LebihLanjut>
							<u>Lebih lanjut</u>
						</LebihLanjut>
					) : (
						<TextDesc small={small}>{short_desc}</TextDesc>
					)}
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
									handleWishlistClicked();
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
									key={nanoid()}
									layout="fixed"
									width={17}
									height={16}
									src="/images/gold-star.svg"
								/>
							)
						)}
						{[
							...Array(total_rating > 0 ? 5 - Math.round(total_rating) : 5),
						].map((ix) => (
							<Image
								alt="star"
								key={nanoid()}
								layout="fixed"
								width={17}
								height={16}
								src="/images/gray-star.svg"
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
						{!enrolled ? "Tonton Gratis" : "Lanjutkan"}
					</StyledHeadingXXS>
				</EnrollBtn>
			</CardBody>
		</StyledCard>
	);
}
