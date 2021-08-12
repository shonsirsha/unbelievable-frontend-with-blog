import { parseCookies } from "utils/cookies";
import { API_URL, USE_FALLBACK_VID } from "config";
import Link from "next/link";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	HeadingXS,
	HeadingSM,
	HeadingXXS,
} from "components/Typography/Headings";
import { TextSecondary, TextTertiary } from "components/Typography/Text";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledContainer = styled.div`
	display: flex;
	padding: 32px 0;
	padding-bottom: 0;
	a:hover {
		text-decoration: none;
	}

	@media ${mediaBreakpoint.down.md} {
		padding-top: 0;
	}
`;
const VideoContainer = styled.div`
	width: 65%;
	background: transparent;
	display: flex;
	flex-direction: column;
	min-height: 320px;

	@media ${mediaBreakpoint.down.md} {
		width: 100%;
	}
`;

const VideosListContainer = styled.div`
	width: 35%;
	min-height: 320px;
	padding: 32px 0;
	@media ${mediaBreakpoint.down.md} {
		width: 100%;
	}
`;

const StyledHeadingSM = styled(HeadingSM)`
	font-size: 28px;
	margin-left: 32px;
`;

const StyledHeadingXS = styled(HeadingXS)`
	font-size: 22px;
`;

const CourseDayContainer = styled.div`
	padding: 16px 32px;
	${(props) => props.current && `background: rgba(255,255,255,0.28);`}

	transition: all 0.4s;

	&:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.28);
	}
`;

const Lock = styled(MdLockOutline)`
	font-size: 18px;
`;
const TimeText = styled(HeadingXXS)`
	font-size: 12px;
	font-family: MontSerratRegular;
`;
const Clock = styled(AiOutlineClockCircle)`
	font-size: 14px;
`;

const MiscContainer = styled.div``;
const MiscHeaderContainer = styled.div`
	display: flex;
	border-bottom: 1px #d1d1d1 solid;
	align-items: center;
	padding: 24px;
	padding-bottom: 24px;
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const MiscBodyContainer = styled.div`
	padding: 24px;
`;
const StyledTextSecondary = styled(TextSecondary)``;
export default function Kelas({ slug, currentCourse }) {
	const { paid, title } = currentCourse;
	const { video, day_title } = currentCourse.currentVideo;

	return (
		<Layout
			showBurger={false}
			title="Daftar Kelas | Unbelieveable"
			background="#171b2d"
			withMargin
		>
			<StyledContainer className="flex-column">
				<div className="d-flex w-100 justify-content-center">
					<HeadingXS>{title}</HeadingXS>
				</div>
				<div className="d-flex flex-md-row flex-column w-100 mt-4">
					<VideoContainer>
						<VideoPlayerHLS
							videoId={video.id}
							liveURL={
								USE_FALLBACK_VID
									? `https://content.jwplatform.com/manifests/yp34SRmf.m3u8`
									: `https://stream.mux.com/${video.playback_id}.m3u8`
							}
						/>
						<MiscContainer>
							<MiscHeaderContainer>
								<HeadingXXS as="p" className="text-primary1">
									Tentang course
								</HeadingXXS>
							</MiscHeaderContainer>
							<MiscBodyContainer>
								<StyledTextTertiary className="text-primary1">
									{currentCourse.short_desc}
								</StyledTextTertiary>
							</MiscBodyContainer>
						</MiscContainer>
					</VideoContainer>
					<VideosListContainer className="bg-primary1">
						<StyledHeadingSM as="p" className="text-white mb-3">
							Course content
						</StyledHeadingSM>

						{currentCourse.videos.map((video) => (
							<Link
								key={video.video.upload_id}
								href={
									video.video.upload_id
										? `/kelas/${slug}?c=${video.video.upload_id}`
										: `#`
								}
							>
								<a>
									<CourseDayContainer
										key={video.id}
										current={currentCourse.currentVideo.id === video.id}
										className="d-flex flex-column "
									>
										<StyledHeadingXS as="p" className="text-white mb-1">
											{video.day_title}
										</StyledHeadingXS>
										<div className="d-flex align-items-center mb-2">
											<Clock className="text-white mr-1" />
											<TimeText className="text-white">6 min</TimeText>
										</div>

										<div className="d-flex align-items-center">
											{!video.video.upload_id && (
												<Lock className="text-white mr-1" />
											)}
											<StyledTextSecondary className="text-white">
												{video.video.title}
											</StyledTextSecondary>
										</div>
									</CourseDayContainer>
								</a>
							</Link>
						))}
					</VideosListContainer>
				</div>
			</StyledContainer>
		</Layout>
	);
}
export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	}
	const { slug, c } = ctx.query;
	//c should be upload_id.
	//upload_id may come from videos[0].video.upload_id

	const res = await fetch(`${API_URL}/courses?slug=${slug}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const course = await res.json();
	if (course.length < 1) {
		return {
			redirect: {
				permanent: false,
				destination: "/dashboard",
			},
			props: {},
		};
	}

	const validUploadId = course[0].videos.some((crs) => {
		if (crs.video) {
			return crs.video.upload_id === c;
		} else {
			return false; // if .video prop isnt available (user hasnt bought the course / course has not even 1 video)
		}
	});
	if (!validUploadId) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].videos[0].video.upload_id}`,
			},
			props: {},
		};
	}

	if (c === "" || !c || c.length === 0) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].videos[0].video.upload_id}`,
			},
			props: {},
		};
	}

	const currentVideo = course[0].videos.find((crs) => {
		return crs.video.upload_id === c;
	});
	const currentCourse = {
		currentVideo,
		...course[0],
	};

	return {
		props: {
			slug,
			currentCourse,
		},
	};
}
