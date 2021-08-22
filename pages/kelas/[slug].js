import { useState, useEffect, useContext } from "react";
import CourseContext from "context/CourseContext";
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
import { MdLockOutline, MdCheck } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import { mediaBreakpoint } from "utils/breakpoints";
import Swal from "sweetalert2";
import { dateDiffInDays } from "utils/dateDiffInDays";
import BuyModal from "components/Course/BuyModal";

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
	width: 60%;
	background: transparent;
	display: flex;
	flex-direction: column;
	min-height: 320px;

	@media ${mediaBreakpoint.down.lg} {
		min-height: 0;
		width: 100%;
	}
`;

const VideosListContainer = styled.div`
	width: 40%;
	min-height: 320px;
	padding: 32px 0;
	@media ${mediaBreakpoint.down.lg} {
		min-height: 0;
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
export default function Kelas({ slug, currentCourse, token, user }) {
	const router = useRouter();

	console.log(currentCourse);

	const { paid, title, bought_day_diff } = currentCourse;
	const { finished_watching, missions, all_missions_completed } =
		currentCourse.currentVideo;
	const [renderedDescContext, setRenderedDescContext] = useState(
		<StyledTextTertiary className="text-primary1 mb">
			{currentCourse.short_desc}
		</StyledTextTertiary>
	);
	const {
		setMissionsCtx,
		missionsCtx,
		setMissionsCompleted,
		setMissionIdsDoneFromAPI,
		checkIfInvoiceValid,
		setBuyModalOpen,
		buyModalOpen,
		getInvoiceUrl,
		setMissionSaveLoading,
	} = useContext(CourseContext);
	const [finishedWatching, setFinishedWatching] = useState(finished_watching);
	const [currentlyOpened, setCurrentlyOpened] = useState("desc");
	const [missionIdsToAPI, setMissionIdsToAPI] = useState([]);
	const [missionHook, setMissionHook] = useState(false);
	const [loadingFetchMission, setLoadingFetchMission] = useState(true);
	const [videosState, setVideosState] = useState(currentCourse.videos);

	useEffect(() => {
		setMissionsCtx(missions);
		setMissionsCompleted(all_missions_completed);
		let misObj = missions.filter((m) => m.completed === true);
		let ary = [];
		misObj.forEach((m) => {
			ary.push(m.id);
		});
		setMissionIdsDoneFromAPI(ary);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCourse.currentVideo]);

	useEffect(() => {
		async function handleMissionsSave() {
			console.log("doing mission...");
			const res = await fetch(
				`${API_URL}/courses/do-mission/${currentCourse.uuid}/${currentCourse.currentVideo.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},

					body: JSON.stringify({
						missionIds: missionIdsToAPI,
					}),
				}
			);

			// const data = await res.json();
			console.log(res);
			if (!res.ok) {
				console.log("failed...");
				// console.log(data.message);
			} else {
				console.log("mission done");
				if (missionsCtx.length === missionIdsToAPI.length) {
					setVideosState(
						[...videosState].map((vidObj) => {
							if (vidObj.id === currentCourse.currentVideo.id) {
								return {
									...vidObj,
									all_missions_completed: true,
								};
							} else return vidObj;
						})
					);
					setMissionsCompleted(true);
					Swal.fire({
						title: "Kerja Bagus!",
						text: "Kamu telah berhasil menyelesaikan semua misi video ini!",
						icon: "success",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Tutup notifikasi",
					}).then((result) => {
						if (result.isConfirmed || result.dismiss) {
							if (window) {
								setTimeout(() => {
									window.scrollTo(0, 0);
								}, 500);
							}
							setMissionSaveLoading(false);
						}
					});
				}
			}
		}
		if (missionHook) {
			handleMissionsSave();
			setMissionHook(!missionHook);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [missionHook]);

	useEffect(() => {
		if (finishedWatching) {
			setRenderedDescContext(
				<MisiBlock
					finishedWatching
					loading={loadingFetchMission}
					setMissionIdsToAPI={setMissionIdsToAPI}
					setMissionHook={setMissionHook}
				/>
			);
			setCurrentlyOpened("misi");
			setLoadingFetchMission(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [finishedWatching, missionsCtx]);

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
				console.log(res);
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
			setMissionsCtx(fetchedMissions);
		}
	};

	useEffect(() => {
		setCurrentlyOpened("desc");
		setFinishedWatching(finished_watching);
		setRenderedDescContext(
			<StyledTextTertiary className="text-primary1 mb">
				{currentCourse.short_desc}
			</StyledTextTertiary>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCourse.currentVideo]);

	const PengumumanBlock = () => {
		console.log(currentCourse);
		return (
			<div className="d-flex flex-column w-100">
				{currentCourse.announcement ? (
					<>
						{[...currentCourse.announcement.pengumuman].reverse().map((p) => (
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

		const current = videosState.findIndex((vid) => vid.id === currentDay);
		const target = videosState.findIndex((vid) => vid.id === targetDay);
		if (target > current) {
			return true;
		}
		return false;
		//false means user goes to previous day
	};

	const goToTheNextDay = (video, video_day) => {
		const previousOfClickedVideoIx =
			videosState.findIndex((v) => v.id === video.id) - 1;

		if (videosState[previousOfClickedVideoIx].all_missions_completed) {
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
				text: "Mohon kerjakan terlebih dahulu semua misi yang diperlukan untuk dapat melanjutkan ke video ini",
				icon: "error",
				confirmButtonColor: "#171b2d",
				confirmButtonText: "Tutup",
			});
		}
	};

	const handleClickedVideoDay = (video, video_day) => {
		if (paid) {
			if (currentCourse.currentVideo.id !== video.id) {
				const goNextDay = isGoingNext(currentCourse.currentVideo.id, video.id);
				if (goNextDay) {
					console.log("ASDASD");
					goToTheNextDay(video, video_day);
				} else {
					console.log("asd");
					goToVideo(video);
				}
			}
		} else {
			Swal.fire({
				title: "Pemberitahuan",
				text: "Kamu harus membeli kelas ini untuk melanjutkan",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#171b2d",
				cancelButtonColor: "#d52f89",
				confirmButtonText: "Beli Kelas",
				cancelButtonText: "Tutup",
				preConfirm: async (email) => {
					await onClickBuyButton();
				},
			}).then(async (result) => {});
		}
	};

	const onClickBuyButton = async () => {
		const invoiceIsValid = await checkIfInvoiceValid(currentCourse.id, token); // exists and not expiring soon/expired yet
		if (!invoiceIsValid) {
			console.log("getting new url (call to xendit)...");
			await getInvoiceUrl(currentCourse, user, token);
		}
		setBuyModalOpen(true);
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

	const VideoDetail = ({ video, currentlyWatchedVideo, ix }) => {
		const isFirstVideo = videosState.findIndex((v) => v.id === video.id) === 0; // first video of the course

		const isPrevVideoFinished = () => {
			if (ix !== 0) {
				const currentVideoIx = videosState.findIndex((v) => v.id === video.id);
				const prevVideoIx = currentVideoIx - 1;
				return videosState[prevVideoIx].all_missions_completed;
			}
			return true;
		};
		const isVideoFinished = () => {
			const currentVideoIx = videosState.findIndex((v) => v.id === video.id);
			return videosState[currentVideoIx].all_missions_completed;
		};
		return (
			<>
				<div className="d-flex align-items-center">
					<StyledHeadingXS
						as="p"
						className={`text-${
							bought_day_diff >= ix ? `white` : "lighterDarkGray"
						} mb-1`}
					>
						{video.day_title}{" "}
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

					{!isFirstVideo && !isPrevVideoFinished() && (
						<Lock
							className={`text-${
								bought_day_diff >= ix ? `white` : "lighterDarkGray"
							} mr-1`}
						/>
					)}

					{isVideoFinished() && (
						<MdCheck
							className={`text-${
								bought_day_diff >= ix ? `white` : "lighterDarkGray"
							} mr-1`}
						/>
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

	const MiscContainer = () => {
		return (
			<>
				<MiscHeaderContainer className="justify-content-sm-start justify-content-between">
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
						className="text-center text-primary1 mx-sm-2 mx-0"
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
						className="text-center text-primary1 mx-sm-2 mx-0"
					>
						Pengumuman
					</StyledHeadingXXS>
					<StyledHeadingXXS
						opened={currentlyOpened === "misi"}
						onClick={() => {
							setRenderedDescContext(
								<MisiBlock
									finishedWatching={finishedWatching}
									setMissionIdsToAPI={setMissionIdsToAPI}
									setMissionHook={setMissionHook}
								/>
							);
							setCurrentlyOpened("misi");
							console.log(missions);
						}}
						role="button"
						as="p"
						className="text-center text-primary1 mx-sm-2 mx-0"
					>
						Misi
					</StyledHeadingXXS>
				</MiscHeaderContainer>
				<MiscBodyContainer>{renderedDescContext}</MiscBodyContainer>
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
			<BuyModal show={buyModalOpen} onHide={() => setBuyModalOpen(false)} />

			<StyledContainer className="flex-column">
				<div className="d-flex w-100 justify-content-center">
					<HeadingXS>{title}</HeadingXS>
				</div>
				<div className="d-flex flex-lg-row flex-column w-100 mt-4">
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

						<MiscContainer />
					</VideoContainer>
					<VideosListContainer className="bg-primary1">
						<StyledHeadingSM as="p" className="text-white mb-3">
							Course content
						</StyledHeadingSM>

						{videosState.map((vid, ix) => (
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
										{paid ? (
											<>
												<VideoDetail
													video={vid}
													currentlyWatchedVideo={
														currentCourse.currentVideo.id === vid.id
													}
													ix={ix}
												/>
											</>
										) : (
											<VideoDetailUnpaid video={vid} ix={ix} />
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
	let currentVideoIndexInVideosArray = course[0].videos.findIndex((crs, ix) => {
		return crs.video.upload_id === c;
	});
	if (currentVideoIndexInVideosArray > 0) {
		let prevVideoMissionsCompleted =
			course[0].videos[currentVideoIndexInVideosArray - 1]
				.all_missions_completed;
		if (!prevVideoMissionsCompleted) {
			return {
				redirect: {
					permanent: false,
					destination: `/kelas/${slug}?c=${course[0].videos[0].video.upload_id}`,
				},
				props: {},
			};
		}
	}
	let currentVideo = course[0].videos.find((crs, ix) => {
		return crs.video.upload_id === c;
	});
	const currentCourse = {
		currentVideo,
		...course[0],
	};

	const res2 = await fetch(`${API_URL}/users/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	let user = await res2.json();

	return {
		props: {
			slug,
			currentCourse,
			token,
			user,
		},
	};
}
