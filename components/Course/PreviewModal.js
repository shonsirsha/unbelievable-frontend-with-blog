import { useContext } from "react";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { Modal, ModalBody, Image, Button } from "react-bootstrap";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { mediaBreakpoint } from "utils/breakpoints";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";

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
		width: 60%;
	}

	.right {
		width: 40%;
		padding: 24px 16px;
	}

	@media ${mediaBreakpoint.down.lg} {
		display: none;
		.left {
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
const PreviewModal = (props) => {
	const {
		selectedPreviewCourse,
		getInvoiceUrl,
		setPreviewModalOpen,
		setBuyModalOpen,
		enrollClassLoading,
	} = useContext(CourseContext);
	const { token, user } = useContext(AuthContext);

	if (!selectedPreviewCourse) {
		return <></>;
	}
	const onClickEnrollBtn = async (e) => {
		e.stopPropagation();
		await getInvoiceUrl(selectedPreviewCourse, user, token);
		setPreviewModalOpen(false);
		setBuyModalOpen(true);
		// enrollClass(
		// 	selectedPreviewCourse,
		// 	user ? user.id : null,
		// 	token ? token : null
		// );
	};
	return (
		<StyledModal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<StyledModalBody className="d-flex flex-lg-row bg-primary1 flex-column">
				<div className="d-flex left"></div>
				<div className="d-flex flex-column right">
					<HeadingXS as="p" className="text-white">
						{selectedPreviewCourse.title}
					</HeadingXS>
					<div className="d-flex justify-content-between mt-3 align-items-center">
						<div className="d-flex">
							<Clock className="text-white mr-2" />
							<StyledTextTertiary className="text-white ">
								{selectedPreviewCourse.videos.length} hari
							</StyledTextTertiary>
						</div>
						<div className="d-flex">
							<Like
								role="button"
								className="mr-2"
								onClick={(e) => {
									e.stopPropagation();
									alert("Wishlisted (WIP)");
								}}
							/>
							<Share
								role="button"
								onClick={(e) => {
									e.stopPropagation();
									alert("Share (WIP)");
								}}
							/>
						</div>
					</div>
					<div className="d-flex mt-2 align-items-center">
						<StyledTextTertiary className="text-white mr-3">
							{selectedPreviewCourse.num_of_participants} siswa
						</StyledTextTertiary>
					</div>
					<div className="d-flex mt-2 align-items-center">
						<StyledTextTertiary className="text-white mr-3">
							dapatkan e-Sertifikat <br />
							setelah menyelesaikan kelas ini
						</StyledTextTertiary>
						<StyledTextTertiary className="text-white">
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(selectedPreviewCourse.price)}
						</StyledTextTertiary>
					</div>
					<div className="mt-2">
						<TextSecondary className="text-white">
							{selectedPreviewCourse.short_desc}
						</TextSecondary>
					</div>
					<div className="mt-3 d-flex flex-column">
						<div className="d-flex align-items-center mb-3">
							<Image
								width={19.58}
								height={19.58}
								src="images/yellowcheck.png"
								alt="Checkmark"
								className="mr-2"
							/>
							<HeadingXXS className="text-white">
								30+ Video Course How to be confident
							</HeadingXXS>
						</div>
						<div className="d-flex align-items-center mb-3">
							<Image
								width={19.58}
								height={19.58}
								src="images/yellowcheck.png"
								alt="Checkmark"
								className="mr-2"
							/>
							<HeadingXXS className="text-white">Daily Challenge</HeadingXXS>
						</div>
						<div className="d-flex align-items-center mb-3">
							<Image
								width={19.58}
								height={19.58}
								src="images/yellowcheck.png"
								alt="Checkmark"
								className="mr-2"
							/>
							<HeadingXXS className="text-white">
								Akses ke Exclusive Community (Tanya seputar materi & LIVE)
							</HeadingXXS>
						</div>
						<div className="d-flex align-items-center mb-3">
							<Image
								width={19.58}
								height={19.58}
								src="images/yellowcheck.png"
								alt="Checkmark"
								className="mr-2"
							/>
							<HeadingXXS className="text-white">Bonus Consultation</HeadingXXS>
						</div>
						<EnrollBtn
							disabled={enrollClassLoading}
							onClick={onClickEnrollBtn}
							className="bg-cyan align-self-center mt-4"
						>
							<StyledHeadingXXS>
								{enrollClassLoading ? "menunggu..." : "beli kelas"}
							</StyledHeadingXXS>
						</EnrollBtn>
					</div>
				</div>
			</StyledModalBody>
		</StyledModal>
	);
};
export default PreviewModal;
