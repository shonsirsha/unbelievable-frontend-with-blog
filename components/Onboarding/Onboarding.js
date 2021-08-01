import { useState, useEffect } from "react";
import { Container, Button, Image } from "react-bootstrap";
import moment from "moment";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	HeadingSM,
	HeadingMD,
	HeadingXS,
} from "components/Typography/Headings";
import VideoPlayerNonHLS from "components/VideoPlayer/VideoPlayerNonHLS";
import CircleButton from "components/Buttons/CircleButton";
import { FaChevronRight } from "react-icons/fa";
import { mediaBreakpoint } from "utils/breakpoints";

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
	z-index: 3;
`;
export default function Onboarding({
	onboardings,
	user,
	handleFinishOnboarding,
}) {
	const [stage, setStage] = useState(1);
	const bgArr = [
		"#02a0e1",
		"#42a591",
		"#007474",
		"linear-gradient(#1022a4, #31a4fa)",
	];

	const onVideoFinished = () => {
		setBtnDisplayed(true);
	};

	const [loadingFinishBtn, setLoadingFinishBtn] = useState(false);
	const [btnDisplayed, setBtnDisplayed] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [url, setUrl] = useState(onboardings[0][`video_intro_1`].url);
	const [VP, setVP] = useState(
		<VideoContainer className="mt-4">
			<VideoPlayerNonHLS liveUrl={url} onVideoFinished={onVideoFinished} />
		</VideoContainer>
	);

	useEffect(() => {
		setFirstName(user.first_name);
	}, [user]);

	const onClickNextBtn = () => {
		setStage(stage + 1);
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
			<HeadingMD as="h2" className="mt-2 text-yellow2">
				Hero!
			</HeadingMD>
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
				{firstName}, do you copy?{" "}
			</HighHeadingSM>
		</>,
		<>
			<HeadingSM as="h1" className="text-white">
				{firstName}'s Contract
			</HeadingSM>
		</>,
	];

	useEffect(() => {
		if (stage <= 2) {
			setUrl(onboardings[0][`video_intro_${stage}`].url);
		} else if (stage === 3) {
			setVP(
				<>
					<StyledP className="text-center mt-5 text-white">
						It’s me, future {firstName}. I’m calling from 2022 because today is
						an important
						<br />
						day for you - for us!
					</StyledP>
					<HighHeadingSM
						as="p"
						className="text-center text-yellow2 mt-lg-3 mt-1"
					>
						{moment(user.created_at).format("dddd, D MMMM, yyyy")} is the day
						<br />
						we decided to change our lives for the better
					</HighHeadingSM>

					<StyledP className="text-center mt-lg-5 mt-3 text-white">
						I have excellent news, I’m healthy, in great shape, and worry-free,
						thanks to choices you’re making.
						<br />
						I’ll be with you every step of the way. See you soon!
					</StyledP>

					<HighHeadingSM
						as="p"
						className="mt-1 ml-auto mr-auto mr-lg-5 text-white"
					>
						future {firstName}
					</HighHeadingSM>

					<Blob className={`teal`} src={"/images/blueblob.png"} alt="Blob" />
					<Blob
						className={`purple`}
						src={"/images/purpleblob.png"}
						alt="Blob"
					/>
				</>
			);
			setBtnDisplayed(true);
		} else if (stage === 4) {
			setVP(
				<div className="d-flex flex-column">
					<p className="text-center mt-5 text-white">
						It’s me, future {firstName}. I’m calling from 2022 because today is
						an important
						<br />
						day for you - for us!
					</p>
					<HighHeadingSM as="p" className="text-center text-yellow2 mt-3">
						I, {firstName}, will make the most of tommorow.
						<br />
						I will always remember that I will not live forever.
						<br />
						Every fear and irritation that threatens to distract me
						<br />
						will become fuel for building my best life one day at the time
					</HighHeadingSM>
					<FinishBtn
						onClick={onClickFinishBtn}
						className="mt-4 mx-auto bg-primary1"
					>
						<HeadingXS as="p">Ya, saya siap berkomitmen!</HeadingXS>
					</FinishBtn>
				</div>
			);
			setBtnDisplayed(false);
		}
	}, [stage]);

	useEffect(() => {
		if (stage <= 2) {
			setVP(<></>);
			setTimeout(() => {
				setVP(
					<>
						<VideoContainer className="mt-4">
							<VideoPlayerNonHLS
								liveUrl={url}
								onVideoFinished={onVideoFinished}
							/>
						</VideoContainer>
					</>
				);
			}, 300);
			setBtnDisplayed(false);
		}
	}, [url]);

	return (
		<Layout
			title="Selamat Datang! | Unbelieveable"
			scrollToSolid
			showBurger={false}
			background="rgba(0,0,0,0.27)"
		>
			<OuterContainer bg={bgArr[stage - 1]}>
				<Container className="position-relative d-flex flex-column justify-content-center align-items-center justify-content-center">
					{headingText[stage - 1]}
					{onboardings && VP}
				</Container>
				<div className="d-flex flex-lg-row flex-column align-items-center mt-1">
					{stage <= 2 && (
						<StyledHeadingSM as="p" className="ml-lg-5 ml-0 text-white">
							intro
						</StyledHeadingSM>
					)}
					{btnDisplayed && (
						<CircleButton
							className="ml-auto mr-lg-5 mr-auto "
							bg={"primary1"}
							onClick={onClickNextBtn}
							icon={<FaChevronRight size={24} />}
						/>
					)}
				</div>
			</OuterContainer>
		</Layout>
	);
}
