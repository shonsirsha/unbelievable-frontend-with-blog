import { useState } from "react";
import { Container } from "react-bootstrap";
import Layout from "components/Layout";
import styled from "styled-components";
import { HeadingSM, HeadingMD } from "components/Typography/Headings";
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
export default function Onboarding({ onboardings, token }) {
	const [stage, setStage] = useState(1);
	const url = onboardings[0][`video_intro_${stage}`].url;
	const bgArr = ["lightblue2", "palegreen"];

	const onVideoFinished = (e) => {
		console.log(e);
	};

	return (
		<Layout scrollToSolid background="rgba(0,0,0,0.27)">
			<OuterContainer className={`bg-${bgArr[stage - 1]}`}>
				<Container className="d-flex flex-column justify-content-center align-items-center justify-content-center">
					<HeadingSM as="h1" className="text-white">
						Selamat Datang
					</HeadingSM>
					<HeadingMD as="h2" className="mt-2 text-yellow2">
						Hero!
					</HeadingMD>
					{onboardings && (
						<VideoContainer className="mt-4">
							<VideoPlayerNonHLS
								liveUrl={url}
								onVideoFinished={onVideoFinished}
							/>
						</VideoContainer>
					)}
				</Container>
				<CircleButton
					className="ml-auto mr-lg-5 mr-auto mt-1"
					bg={"primary1"}
					icon={<FaChevronRight size={24} />}
				/>
			</OuterContainer>
		</Layout>
	);
}
