import { parseCookies } from "utils/cookies";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { API_URL } from "config/index";
import Layout from "components/Layout";
import styled from "styled-components";
import { HeadingSM, HeadingMD } from "components/Typography/Headings";
import VideoPlayerNonHLS from "components/VideoPlayer/VideoPlayerNonHLS";
const OuterContainer = styled.div`
	min-height: 600px;
	width: 100%;
	padding-bottom: 64px;
	padding-top: 176px;
`;
const VideoContainer = styled.div`
	min-height: 480px;
	min-width: 100%;
`;
const index = ({ token, onboardings }) => {
	const { logout } = useContext(AuthContext);
	const [onboardingsData] = useState(onboardings);
	const [stage, setStage] = useState(1);
	const url = onboardingsData[0][`video_intro_${stage}`].url;
	return (
		<Layout
			onboarding={onboardingsData ? true : false}
			background="rgba(0,0,0,0.27)"
		>
			<OuterContainer className="bg-lightblue2">
				<Container className="d-flex flex-column justify-content-center align-items-center">
					<HeadingSM as="h1" className="text-white">
						Selamat Datang
					</HeadingSM>
					<HeadingMD as="h2" className="mt-2 text-yellow2">
						Hero!
					</HeadingMD>
					{onboardingsData && (
						<VideoContainer className="mt-4">
							<VideoPlayerNonHLS liveUrl={""} />
						</VideoContainer>
					)}
				</Container>
			</OuterContainer>
			<button onClick={() => logout()}>logout</button>
		</Layout>
	);
};

export async function getServerSideProps({ req, res }) {
	const { token } = parseCookies(req);

	if (token === undefined) {
		res.setHeader("location", "/");
		res.statusCode = 302;
		res.end();
	} else {
		const res = await fetch(`${API_URL}/onboardings`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const onboardings = await res.json();

		return {
			props: {
				onboardings,
				token,
			},
		};
	}
}

export default index;
