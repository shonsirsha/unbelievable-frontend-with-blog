import { useContext, useState } from "react";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { Modal, ModalBody, Button } from "react-bootstrap";
import Image from "next/image";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { mediaBreakpoint } from "utils/breakpoints";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { toast } from "react-toastify";
import { Popover } from "react-tiny-popover";

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px;

	width: 164px;
`;
const StyledModal = styled(Modal)`
	padding: 0;
	.modal-content {
		border-radius: 16px;
		padding: 0;
	}

	@media ${mediaBreakpoint.up.md} {
		.modal-dialog {
			max-width: 60%;
		}
	}
`;
const StyledModalBody = styled(ModalBody)`
	border-radius: 16px;
	padding: 0;

	.left {
		border-radius: 16px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		background: ${(props) =>
			props.img ? `url(${props.img}) no-repeat` : `gray`};
		background-position: center;
		background-size: cover;
		width: 55%;
	}

	.right {
		width: 45%;
		padding: 24px 48px;
		padding-right: 32px;
	}

	@media ${mediaBreakpoint.down.lg} {
		display: none;
		.left {
			min-height: 240px;
			border-bottom-left-radius: 0;
			border-top-right-radius: 16px;
			width: 100%;
		}
		.right {
			display: none;
			width: 100%;
			padding: 32px;
		}
	}
`;
const Clock = styled(AiOutlineClockCircle)`
	font-size: 21px;
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-family: MontserratRegular;
	font-size: 14px;
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 14px;
`;

const Like = styled(FaHeart)`
	font-size: 24px;
	color: white;
	transition: 0.25s;

	&:hover {
		color: #f2f2f2;
	}
`;

const Share = styled(MdShare)`
	font-size: 26px;
	color: white;
	transition: 0.25s;

	&:hover {
		color: #f2f2f2;
	}
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

const PreviewModal = (props) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const {
		selectedPreviewCourse,
		getInvoiceUrl,
		setPreviewModalOpen,
		setBuyModalOpen,
		checkIfInvoiceValid,
		enrollClassLoading,
		addWishlist,
	} = useContext(CourseContext);
	const { token, user, setUser } = useContext(AuthContext);

	if (!selectedPreviewCourse) {
		return <></>;
	}
	const onClickEnrollBtn = async (e) => {
		if (!enrollClassLoading) {
			e.stopPropagation();
			const invoiceIsValid = await checkIfInvoiceValid(
				selectedPreviewCourse.id,
				token
			); // exists and not expiring soon/expired yet
			if (!invoiceIsValid) {
				// console.log("getting new url (call to xendit)...");
				await getInvoiceUrl(selectedPreviewCourse, user, token);
			}
			setPreviewModalOpen(false);
			setBuyModalOpen(true);
		}
	};
	const price = selectedPreviewCourse.course_price
		? parseInt(selectedPreviewCourse.course_price.price)
		: 5000;
	const crossedOutPrice =
		selectedPreviewCourse.course_price &&
		!Number.isNaN(
			parseInt(selectedPreviewCourse.course_price.crossed_out_price)
		)
			? selectedPreviewCourse.course_price.crossed_out_price
			: null;

	const handleWishlistClicked = async () => {
		const added = await addWishlist(selectedPreviewCourse, token);

		const alreadyInWishlist = user.wishlist.some((u) => {
			return selectedPreviewCourse.uuid === u.course.uuid;
		});

		if (alreadyInWishlist || added) {
			if (!alreadyInWishlist) {
				setUser({
					...user,
					wishlist: [...user.wishlist, { course: selectedPreviewCourse }],
				});
			}
			toast.success("Kelas ini telah ditambahkan ke wishlist!");
		} else {
			console.log(alreadyInWishlist);
			toast.error("Terjadi kesalahan dalam menambahkan kelas ke wishlist");
		}
	};

	return (
		<StyledModal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<StyledModalBody
				img={selectedPreviewCourse.image}
				className="d-flex flex-lg-row bg-primary1 flex-column"
			>
				<div className="d-flex left"></div>
				<div className="d-flex flex-column right">
					<HeadingXS
						as="p"
						className="text-white"
						style={{ lineBreak: "anywhere" }}
					>
						{selectedPreviewCourse.title}
					</HeadingXS>
					<div className="d-flex justify-content-between mt-3 align-items-center">
						<div className="d-flex">
							<Clock className="text-white mr-2" />
							<StyledTextTertiary className="text-white ">
								{selectedPreviewCourse.grouped_videos.videos.length} hari
							</StyledTextTertiary>
						</div>
						<div className="d-flex">
							<Like
								role="button"
								className="mr-2"
								onClick={async (e) => {
									e.stopPropagation();
									handleWishlistClicked();
								}}
							/>
							<Share
								role="button"
								onClick={(e) => {
									e.stopPropagation();
									e.stopPropagation();
									navigator.clipboard.writeText(
										`${window.location.origin}/kelas/${selectedPreviewCourse.slug}`
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
					</div>
					{selectedPreviewCourse.display_siswa && (
						<div className="d-flex mt-2 align-items-center">
							<StyledTextTertiary className="text-white mr-3">
								{selectedPreviewCourse.num_of_participants} siswa
							</StyledTextTertiary>
						</div>
					)}

					<div className="d-flex flex-column mt-2 ">
						{/* <StyledTextTertiary className="text-white mr-3">
							dapatkan e-Sertifikat <br />
							setelah menyelesaikan kelas ini
						</StyledTextTertiary> */}
						{crossedOutPrice && (
							<StyledTextTertiary
								style={{ textDecoration: "line-through" }}
								className="text-white"
							>
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(crossedOutPrice)}
							</StyledTextTertiary>
						)}
						<StyledTextTertiary
							style={{ fontSize: `${crossedOutPrice ? `16px` : `14px`}` }}
							className="text-white"
						>
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(price + 3000)}
						</StyledTextTertiary>
					</div>
					<div className="mt-2">
						<TextSecondary className="text-white">
							{selectedPreviewCourse.short_desc}
						</TextSecondary>
					</div>
					<div className="mt-3 d-flex flex-column">
						{selectedPreviewCourse.features && (
							<>
								{selectedPreviewCourse.features.map((f) => (
									<div key={f.id} className="d-flex align-items-center mb-3">
										<Image
											width={24}
											height={24}
											src="/images/yellowcheck.svg"
											alt="Checkmark"
											layout="fixed"
										/>
										<HeadingXXS className="ml-2 text-white">
											{f.feature}
										</HeadingXXS>
									</div>
								))}
							</>
						)}

						<EnrollBtn
							disabled={enrollClassLoading}
							onClick={onClickEnrollBtn}
							className="bg-cyan align-self-center mt-4"
						>
							<StyledHeadingXXS>
								{enrollClassLoading ? "Menunggu..." : "Beli Kelas"}
							</StyledHeadingXXS>
						</EnrollBtn>
					</div>
				</div>
			</StyledModalBody>
		</StyledModal>
	);
};
export default PreviewModal;
