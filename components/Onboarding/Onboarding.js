import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Button, Image } from "react-bootstrap";
import moment from "moment";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	HeadingSM,
	HeadingMD,
	HeadingLG,
	HeadingXS,
} from "components/Typography/Headings";
import { BUNNY_STREAM_PREFIX_URL } from "config";
import { TextSecondary } from "components/Typography/Text";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import CircleButton from "components/Buttons/CircleButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { mediaBreakpoint } from "utils/breakpoints";
import Swal from "sweetalert2";

const StyledTextSecondary = styled(TextSecondary)`
	font-family: "OpenSansBold";
`;
const OuterContainer = styled.div`
	min-height: 100vh;
	width: 100%;
	justify-content: center;
	padding-bottom: 0;
	padding-top: calc(112px + 64px);
	padding-bottom: 64px;
	background: ${(props) => props.bg};
	transition: background 0.5s;
	display: flex;
	flex-direction: column;

	@media ${mediaBreakpoint.down.md} {
		padding-top: calc(75px + 32px);
		padding-bottom: 32px;
		min-height: 100vh;
	}
`;

const VideoContainer = styled.div`
	max-width: 740px;
	width: 100%;
`;
const StyledHeadingSM = styled(HeadingSM)`
	font-family: MontserratRegular;
	font-size: 16px;
`;
const HighHeadingSM = styled(HeadingSM)`
	z-index: 3;

	@media ${mediaBreakpoint.down.md} {
		font-size: 24px;
	}
`;
const HighHeadingXS = styled(HeadingXS)`
	z-index: 3;

	@media ${mediaBreakpoint.down.md} {
		font-size: 16px;
	}
`;
const FinishBtn = styled(Button)`
	padding: 16px 24px;
	border-radius: 32px;
	max-width: 320px;
	p {
		font-size: 16px;
	}
	border: none;
`;
const Blob = styled(Image)`
	position: absolute;
	z-index: 2;

	&.teal {
		right: 0;
		bottom: -10px;
	}

	&.purple {
		right: -40px;
		bottom: 30px;

		@media ${mediaBreakpoint.down.md} {
			right: 0;
			top: 0;
			width: 320px;
			height: 320px;
		}
	}
`;

const StyledP = styled.p`
	line-height: 32px;
	z-index: 3;
`;

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;
	left: 0;
	right: 0;
	width: 116px;
`;
export default function Onboarding({
	onboardings,
	user,
	backTo = "",
	showBreadCrumb = false,
	handleFinishOnboarding = () => {},
	videoSkippable = false,
	steps = 4,
	title = "Selamat Datang! | Unbelievable",
	stepsRange = null,
	showBackBtn = false,
}) {
	const [stage, setStage] = useState(stepsRange ? stepsRange[0] : 1);
	const bgArr = [
		"#02a0e1",
		"#42a591",
		"#007474",
		"linear-gradient(#1022a4, #31a4fa)",
	];

	const onVideoFinished = () => {
		setAllowToNextStep(true);
	};

	const [allowToNextStep, setAllowToNextStep] = useState(false);
	const [userName, setUserName] = useState("");
	const [lastStep] = useState(stepsRange ? stepsRange[1] : steps);
	const [firstStep] = useState(stepsRange ? stepsRange[0] : 1);
	const [url, setUrl] = useState(
		`${BUNNY_STREAM_PREFIX_URL}/${onboardings[0].video_1.video.video_id}/playlist.m3u8`
	);
	const [VP, setVP] = useState(
		<VideoContainer id="macan" className="mt-4">
			<VideoPlayerHLS
				captions={onboardings[0].video_1.video.captions}
				onboarding
				liveURL={url}
				finishesVideo={onVideoFinished}
				bunnyVideoId={onboardings[0].video_1.video.video_id}
			/>
		</VideoContainer>
	);

	useEffect(() => {
		setUserName(`${user.first_name} ${user.last_name}`);
	}, [user]);

	const onClickNextBtn = () => {
		if (allowToNextStep || videoSkippable) {
			setStage(stage + 1);
		} else {
			Swal.fire({
				title: "Pemberitahuan",
				html: "Tonton video hingga selesai untuk melanjutkan",
				confirmButtonColor: "#171b2d",
				confirmButtonText: "Lanjutkan menonton",
				icon: "info",
				timer: 10000,
				timerProgressBar: true,
			});
		}
	};

	const onClickFinishBtn = async () => {
		setVP(
			<HeadingXS as="p" className="mt-3 text-white">
				Mohon Menunggu...
			</HeadingXS>
		);
		await handleFinishOnboarding();
	};

	const headingText = [
		<>
			<HeadingSM as="h1" className="text-white">
				Selamat Datang
			</HeadingSM>
			<HeadingLG as="h2" className="mt-2 text-yellow2">
				Hero!
			</HeadingLG>
		</>,
		<>
			<HeadingSM as="h1" className="text-white">
				Cara Belajar
			</HeadingSM>
			<HeadingMD as="h2" className="mt-2 text-yellow2">
				Paling Efektif
			</HeadingMD>
		</>,
		<>
			<HighHeadingSM as="h1" className="text-white">
				Hi {userName}!
			</HighHeadingSM>
		</>,
		<>
			<HeadingSM as="h1" className="text-center text-white">
				Komitmen {userName}
			</HeadingSM>
		</>,
	];

	useEffect(() => {
		setTimeout(() => {
			if (stage <= 2) {
				setUrl(
					`${BUNNY_STREAM_PREFIX_URL}/${
						onboardings[0][`video_${stage}`].video.video_id
					}/playlist.m3u8`
				);
			} else if (stage === 3) {
				setVP(
					<>
						<StyledP className="text-center mt-5 text-white">
							Surat ini aku bikin khusus buat kamu!
							<br />
							Aku tau sekrang kamu baru mau mulai petualangan yang bakal kamu
							inget seumur hidup
							<br />
							Kenapa aku tau? karena aku {user.first_name} dari{" "}
							{parseInt(moment(user.created_at).format("yyyy")) + 1}
						</StyledP>

						<HighHeadingSM
							as="p"
							className="text-center text-yellow2 mt-lg-3 mt-1"
						>
							Kenapa aku tau? karena aku {user.first_name} dari{" "}
							{parseInt(moment(user.created_at).format("yyyy")) + 1}!
							<br />
							Ya! Aku adalah kamu dari masa depan!
						</HighHeadingSM>

						{/* <HighHeadingSM
							as="p"
							className="text-center text-yellow2 mt-lg-3 mt-1"
						>
							{moment(user.created_at).format("dddd, D MMMM, yyyy")} is the day
							<br />
							we decided to change our lives for the better
						</HighHeadingSM> */}

						<StyledP className="text-center mt-5 text-white">
							Sama kaya kamu, dulu juga aku dapet surat misterius ini! Oh iya,
							kalau kamu mau tau,
							<br />
							aku sekarang sudah jauh lebih percaya diri, lebih bisa nerima
							diri, dan tentunya lebih sehat sekarang!
						</StyledP>

						<StyledP className="text-center mt-lg-3 mt-3 text-white">
							Tau gak sih ternyata kebahagiaan yang kita cari selama ini bisa
							kita dapetin dari hal-hal yang ada di
							<br />
							sekeliling kita, namun kita butuh belajar buat cari itu dan
							ternyata kita gak sendiri!
							<br />
							Tau gak? Sekarang aku juga udah punya banyak teman, terutama
							saudara-saudara kita,
							<br />
							para Heroes lainnya di UNBELIEVABLE!
						</StyledP>

						<StyledP className="text-center mt-lg-3 mt-3 text-white">
							Kayanya kamu belum tau ya Heroes itu apa? Gapapa, abis ini bakal
							langsung di jelasin sama
							<br />
							Eric di video selanjutnya! Tinggal pencet kanan bawah aja!
						</StyledP>

						<HighHeadingXS
							as="p"
							className="mt-1 mx-auto mt-3 text-white text-center"
						>
							Congratulations! Now you are officially part of the Heroes
							generation!
						</HighHeadingXS>

						<Blob className={`teal`} src={"/images/blueblob.png"} alt="Blob" />
						<Blob
							className={`purple`}
							src={"/images/purpleblob.png"}
							alt="Blob"
						/>
					</>
				);
				setAllowToNextStep(true);
			} else if (stage === 4) {
				setVP(
					<div className="d-flex flex-column">
						<StyledP className="text-center mt-5 text-white">
							Aku, {userName}, mulai hari ini akan mengambil identitas menjadi
							seorang heroes.
							<br />
							Aku akan mulai sayang sama diriku sendiri, membangun harapan dan
							keberanian mengejar masa depan.
							<br />
							Aku tau aku baru mulai dan aku akan mencoba menikmati prosesnya
							setiap hari.
						</StyledP>
						<HighHeadingSM as="p" className="text-center text-yellow2 mt-3">
							Karena aku tau, aku akan menjadi pahlawan
							<br /> di masa depan yang akan punya dampak positif <br /> buat
							diriku dan orang-orang di sekitarku!
						</HighHeadingSM>
						{!stepsRange && (
							<FinishBtn
								onClick={onClickFinishBtn}
								className="mt-4 mx-auto bg-primary1"
							>
								<HeadingXS as="p">Ya, saya siap berkomitmen!</HeadingXS>
							</FinishBtn>
						)}
					</div>
				);
				setAllowToNextStep(false);
			}
		}, 0);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage]);

	useEffect(() => {
		if (stage <= 2) {
			setTimeout(() => {
				setVP(
					<>
						<VideoContainer className="mt-4">
							<VideoPlayerHLS
								captions={onboardings[0][`video_${stage}`].video.captions}
								liveURL={url}
								finishesVideo={onVideoFinished}
								bunnyVideoId={onboardings[0][`video_${stage}`].video.video_id}
								onboarding
							/>
						</VideoContainer>
					</>
				);
			}, 500);
			setAllowToNextStep(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return (
		<Layout
			backTo={backTo}
			title={title}
			scrollToSolid
			showBurger={false}
			background="rgba(0,0,0,0.27)"
		>
			<OuterContainer bg={bgArr[stage - 1]}>
				<Container className="position-relative d-flex flex-column justify-content-center align-items-center justify-content-center mb-3">
					{headingText[stage - 1]}
					{onboardings && VP}
				</Container>
				<div className="d-flex flex-lg-row flex-column align-items-center mt-1">
					{stage <= 2 && steps === 4 && (
						<StyledHeadingSM as="p" className="ml-lg-5 ml-0 text-white">
							intro
						</StyledHeadingSM>
					)}
					{showBackBtn && stage !== firstStep && (
						<>
							<CircleButton
								className="ml-auto mr-lg-5 mr-auto "
								bg={"primary1"}
								onClick={() => {
									setStage(stage - 1);
								}}
								icon={<FaChevronLeft size={24} />}
							/>
						</>
					)}

					{stage !== lastStep && (
						<>
							<CircleButton
								className="ml-auto mr-lg-5 mr-auto "
								bg={"primary1"}
								onClick={onClickNextBtn}
								icon={<FaChevronRight size={24} />}
							/>
						</>
					)}
				</div>
				{stage === steps && videoSkippable && (
					<Link href="/profil">
						<a className="mx-auto mt-4 mt-lg-0">
							<EnrollBtn className="bg-primary1">
								<StyledTextSecondary>Selesai</StyledTextSecondary>
							</EnrollBtn>
						</a>
					</Link>
				)}
			</OuterContainer>
		</Layout>
	);
}
