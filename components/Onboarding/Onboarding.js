import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
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
const OuterContainer = styled.div`
	min-height: 600px;
	width: 100%;
	padding-bottom: 32px;
	padding-top: 144px;
	transition: background 0.5s;
	display: flex;
	flex-direction: column;
`;
const VideoContainer = styled.div`
	max-width: 810px;
	width: 100%;
`;
const StyledHeadingSM = styled(HeadingSM)`
	font-family: MontserratRegular;
	font-size: 16px;
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
export default function Onboarding({
	onboardings,
	token,
	user,
	handleFinishOnboarding,
}) {
	const onVideoFinished = () => {
		setBtnDisplayed(true);
	};

	const onClickNextBtn = () => {
		setStage(stage + 1);
	};

	const [stage, setStage] = useState(1);
	const bgArr = ["lightblue2", "palegreen", "darkpalegreen", "darkpalegreen"];
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
			<HeadingSM as="h1" className="text-white">
				{firstName}, do you copy?{" "}
			</HeadingSM>
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
					<p className="text-center mt-5 text-white">
						It’s me, future {firstName}. I’m calling from 2022 because today is
						an important
						<br />
						day for you - for us!
					</p>
					<HeadingSM className="text-center text-yellow2 mt-3">
						Wednesday, 2 June, 2021 is the day
						<br />
						we decided to change our lives for the better
					</HeadingSM>

					<p className="text-center mt-5 text-white">
						I have excellent news, I’m healthy, in great shape, and worry-free,
						thanks to choices you’re making.
						<br />
						I’ll be with you every step of the way. See you soon!
					</p>

					<HeadingSM className="mt-1 ml-auto mr-auto mr-lg-5 text-white">
						future {firstName}
					</HeadingSM>
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
					<HeadingSM as="p" className="text-center text-yellow2 mt-3">
						I, {firstName}, will make the most of tommorow.
						<br />
						I will always remember that I will not live forever.
						<br />
						Every fear and irritation that threatens to distract me
						<br />
						will become fuel for building my best life one day at the time
					</HeadingSM>
					<FinishBtn
						onClick={handleFinishOnboarding}
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
					<VideoContainer className="mt-4">
						<VideoPlayerNonHLS
							liveUrl={url}
							onVideoFinished={onVideoFinished}
						/>
					</VideoContainer>
				);
			}, 300);
			setBtnDisplayed(false);
		}
	}, [url]);

	return (
		<Layout
			title="Selamat Datang! | Unbelieveable"
			scrollToSolid
			background="rgba(0,0,0,0.27)"
		>
			<OuterContainer className={`bg-${bgArr[stage - 1]}`}>
				<Container className="d-flex flex-column justify-content-center align-items-center justify-content-center">
					{headingText[stage - 1]}
					{onboardings && VP}
				</Container>
				<div className="d-flex  mt-1">
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
