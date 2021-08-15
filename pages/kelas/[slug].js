import { useState, useEffect } from "react";
import { parseCookies } from "utils/cookies";
import { API_URL, USE_FALLBACK_VID } from "config";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	HeadingXS,
	HeadingSM,
	HeadingXXS,
} from "components/Typography/Headings";
import MisiBlock from "components/Kelas/MisiBlock";
import { TextSecondary, TextTertiary } from "components/Typography/Text";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import { mediaBreakpoint } from "utils/breakpoints";
import Swal from "sweetalert2";
import { dateDiffInDays } from "utils/dateDiffInDays";
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
const StyledHeadingXXS = styled(HeadingXXS)`
	${(props) => props.opened && `text-decoration: underline;`}
`;
const StyledTextSecondary = styled(TextSecondary)``;
export default function Kelas({ slug, currentCourse, token }) {
	const router = useRouter();

	console.log(currentCourse);

	const { paid, title, bought_day_diff, videos } = currentCourse;
	const { finished_watching, missions, all_missions_completed } =
		currentCourse.currentVideo;
	const [renderedDescContext, setRenderedDescContext] = useState(
		<StyledTextTertiary className="text-primary1 mb">
			{currentCourse.short_desc}
		</StyledTextTertiary>
	);
	const [finishedWatching, setFinishedWatching] = useState(finished_watching);
	const [currentlyOpened, setCurrentlyOpened] = useState("desc");
	const [localMissions, setLocalMissions] = useState(missions);

	const [loadingFetchMission, setLoadingFetchMission] = useState(true);

	useEffect(() => {
		setCurrentlyOpened("desc");
		setFinishedWatching(finished_watching);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCourse.currentVideo]);

	useEffect(() => {
		if (finishedWatching) {
			console.log("ASD");
			setRenderedDescContext(
				<MisiBlock
					finishedWatching
					missions={localMissions ? localMissions : []}
					loading={loadingFetchMission}
				/>
			);
			setCurrentlyOpened("misi");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [finishedWatching]);

	useEffect(() => {
		if (localMissions.length !== 0) {
			setRenderedDescContext(
				<MisiBlock finishedWatching missions={localMissions} loading={false} />
			);
			setLoadingFetchMission(false);
		}
	}, [localMissions]);

	const finishesVideo = async (videoId) => {
		console.log("finishing...");

		if (!finishedWatching) {
			const res = await fetch(
				`${API_URL}/courses/finish/${currentCourse.uuid}/${videoId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res.ok) {
				console.log("failed...");
			} else {
				setFinishedWatching(true);
				console.log("finished video");
				await fetchCurrentVideoMissions(videoId);
			}
		} else {
			console.log("No further actions (done anyway)");
		}
	};

	const fetchCurrentVideoMissions = async (videoId) => {
		const res = await fetch(
			`${API_URL}/courses/current-mission/${currentCourse.uuid}/${videoId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const fetchedMissions = await res.json();

		if (!res.ok) {
			console.log("failed fetching missions...");
		} else {
			console.log("fetched mission: ");
			console.log(fetchedMissions);
			setLocalMissions(fetchedMissions);
		}
	};

	const PengumumanBlock = () => {
		return (
			<div className="d-flex flex-column w-50">
				{currentCourse.pengumuman.length > 0 ? (
					<>
						{[...currentCourse.pengumuman].reverse().map((p) => (
							<div key={p.id} className=" mb-4">
								<StyledTextTertiary className="text-info1 mb-2">
									{currentCourse.content_creator.full_name}
								</StyledTextTertiary>
								<StyledTextTertiary className="text-primary1 mb-2">
									Memposting pengumuman {"-"}{" "}
									{dateDiffInDays(new Date(p.date), new Date())}
								</StyledTextTertiary>
								<StyledTextTertiary className="text-primary1 ">
									{p.text}
								</StyledTextTertiary>
							</div>
						))}
					</>
				) : (
					<StyledTextTertiary className="text-primary1 ">
						Belum ada pengumuman
					</StyledTextTertiary>
				)}
			</div>
		);
	};

	const goToVideo = (video) => {
		router.push(
			`${
				video.video.upload_id
					? `/kelas/${slug}?c=${video.video.upload_id}`
					: `#`
			}`
		);
	};

	const isGoingNext = (currentDay, targetDay) => {
		if (currentDay === targetDay) return;

		const current = videos.findIndex((vid) => vid.id === currentDay);
		const target = videos.findIndex((vid) => vid.id === targetDay);
		if (target > current) {
			return true;
		}
		return false;
		//false means user goes to previous day
	};

	const goToTheNextDay = (video, video_day) => {
		if (all_missions_completed) {
			if (bought_day_diff >= video_day) {
				goToVideo(video);
				setRenderedDescContext(
					<StyledTextTertiary className="text-primary1">
						{currentCourse.short_desc}
					</StyledTextTertiary>
				);
			} else {
				Swal.fire({
					title: "Pemberitahuan",
					text: "Menonton lebih dari 1 video dalam satu hari tidak disarankan. Apakah kamu tetap ingin melanjutkan?",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#171b2d",
					cancelButtonColor: "#d52f89",
					confirmButtonText: "Ya, lanjutkan!",
					cancelButtonText: "Batal",
				}).then((result) => {
					if (result.isConfirmed) {
						goToVideo(video);
					}
				});
			}
		} else {
			Swal.fire({
				title: "Ups...",
				text: "Mohon kerjakan semua misi dari video ini untuk melanjutkan ke video selanjutnya",
				icon: "error",
				confirmButtonColor: "#171b2d",
				confirmButtonText: "Tutup",
			});
		}
	};

	const goToPrevDay = (video, video_day) => {
		goToVideo(video);
	};

	const handleClickedVideoDay = (video, video_day) => {
		if (paid) {
			if (currentCourse.currentVideo.id !== video.id) {
				const goNextDay = isGoingNext(currentCourse.currentVideo.id, video.id);
				if (goNextDay) {
					goToTheNextDay(video, video_day);
				} else {
					goToVideo(video);
				}
			}
		} else {
			alert("beli dulu buskuh");
		}
	};

	const VideoDetailPaid = ({ video, ix }) => {
		return (
			<>
				<div className="d-flex align-items-center">
					<StyledHeadingXS
						as="p"
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						} mb-1`}
					>
						{video.day_title}
					</StyledHeadingXS>
				</div>

				<div className="d-flex align-items-center mb-2">
					<Clock
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						} mr-1`}
					/>
					<TimeText
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						}`}
					>
						6 min
					</TimeText>
				</div>

				<div className="d-flex align-items-center">
					<StyledTextSecondary
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						}`}
					>
						{video.video.title}
					</StyledTextSecondary>
				</div>
			</>
		);
	};

	const VideoDetailUnpaid = ({ video, ix }) => {
		return (
			<>
				<div className="d-flex align-items-center">
					<StyledHeadingXS as="p" className={`text-white mb-1`}>
						{video.day_title}
					</StyledHeadingXS>
				</div>

				<div className="d-flex align-items-center mb-2">
					<Clock className="text-white mr-1" />
					<TimeText className={`text-white`}>6 min</TimeText>
				</div>

				<div className="d-flex align-items-center">
					{ix > 0 && <Lock className="text-white mr-1" />}
					<StyledTextSecondary className={`text-white`}>
						{video.video.title}
					</StyledTextSecondary>
				</div>
			</>
		);
	};

	const VideoDetailNotCompleted = ({ video, currentlyWatchedVideo, ix }) => {
		// {
		// 	videos.findIndex((vid) => vid.ix);
		// }
		// const thisVidIndex =
		return (
			<>
				<div className="d-flex align-items-center">
					<StyledHeadingXS
						as="p"
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						} mb-1`}
					>
						{video.day_title}
					</StyledHeadingXS>
				</div>
				<div className="d-flex align-items-center mb-2">
					<Clock
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						} mr-1`}
					/>
					<TimeText
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						}`}
					>
						6 min
					</TimeText>
				</div>

				<div className="d-flex align-items-center">
					{/* {currentlyWatchedVideo ? (
						<>
							{all_missions_completed && ix && <Lock className="text-white mr-1" />}
						</>
					) : (
						<>
							{all_missions_completed && <Lock className="text-white mr-1" />}
						</>
					)} */}
					{!all_missions_completed && !currentlyWatchedVideo && (
						<Lock className="text-white mr-1" />
					)}
					{/* {ix > 0 && } */}
					<StyledTextSecondary
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						}`}
					>
						{video.video.title}
					</StyledTextSecondary>
				</div>
			</>
		);
	};

	return (
		<Layout
			showBurger={false}
			title={`${title} | Unbelieveable`}
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
							videoId={currentCourse.currentVideo.id}
							finishesVideo={finishesVideo}
							liveURL={
								// https://content.jwplatform.com/manifests/yp34SRmf.m3u8
								USE_FALLBACK_VID
									? `https://content.jwplatform.com/manifests/yp34SRmf.m3u8`
									: `https://stream.mux.com/${currentCourse.currentVideo.video.playback_id}.m3u8`
							}
						/>
						<MiscContainer>
							<MiscHeaderContainer>
								<StyledHeadingXXS
									opened={currentlyOpened === "desc"}
									onClick={() => {
										setRenderedDescContext(
											<StyledTextTertiary className="text-primary1">
												{currentCourse.short_desc}
											</StyledTextTertiary>
										);
										setCurrentlyOpened("desc");
									}}
									role="button"
									as="p"
									className="text-primary1 mr-5"
								>
									Tentang course
								</StyledHeadingXXS>
								<StyledHeadingXXS
									opened={currentlyOpened === "pengumuman"}
									onClick={() => {
										setRenderedDescContext(<PengumumanBlock />);
										setCurrentlyOpened("pengumuman");
									}}
									role="button"
									as="p"
									className="text-primary1 mr-5"
								>
									Pengumuman
								</StyledHeadingXXS>
								<StyledHeadingXXS
									opened={currentlyOpened === "misi"}
									onClick={() => {
										setRenderedDescContext(
											<MisiBlock
												finishedWatching={finishedWatching}
												missions={missions}
											/>
										);
										setCurrentlyOpened("misi");
									}}
									role="button"
									as="p"
									className="text-primary1"
								>
									Misi
								</StyledHeadingXXS>
							</MiscHeaderContainer>
							<MiscBodyContainer>{renderedDescContext}</MiscBodyContainer>
						</MiscContainer>
					</VideoContainer>
					<VideosListContainer className="bg-primary1">
						<StyledHeadingSM as="p" className="text-white mb-3">
							Course content
						</StyledHeadingSM>

						{currentCourse.videos.map((vid, ix) => (
							<div
								key={vid.video.upload_id}
								onClick={() => handleClickedVideoDay(vid, ix)}
							>
								<a>
									<CourseDayContainer
										key={vid.id}
										current={currentCourse.currentVideo.id === vid.id}
										className="d-flex flex-column "
									>
										{/* <VideoDetailPaid video={video} ix={ix} /> */}
										{paid ? (
											<>
												{/* {all_missions_completed ? (
													<VideoDetailPaid video={video} ix={ix} />
												) : (
													<VideoDetailNotCompleted video={video} ix={ix} />
												)} */}
												<VideoDetailNotCompleted
													video={vid}
													currentlyWatchedVideo={
														currentCourse.currentVideo.id === vid.id
													}
													ix={ix}
												/>
											</>
										) : (
											<VideoDetailUnpaid video={video} ix={ix} />
										)}
									</CourseDayContainer>
								</a>
							</div>
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
			return false; // if user hasnt bought the course / course has not even 1 video
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
	let currentVideo = course[0].videos.find((crs, ix) => {
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
			token,
		},
	};
}
