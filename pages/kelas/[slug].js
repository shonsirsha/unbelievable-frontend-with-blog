/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext, memo } from "react";
import CourseContext from "context/CourseContext";
import Swal from "sweetalert2";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import MisiBlock from "components/Kelas/MisiBlock";
import BuyModal from "components/Course/BuyModal";
import { parseCookies } from "utils/cookies";
import { API_URL, BUNNY_STREAM_PREFIX_URL } from "config";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	HeadingXS,
	HeadingSM,
	HeadingXXS,
} from "components/Typography/Headings";
import { TextSecondary, TextTertiary } from "components/Typography/Text";
import { MdLockOutline, MdCheck, MdChevronLeft } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { mediaBreakpoint } from "utils/breakpoints";
import { dateDiffInDays } from "utils/dateDiffInDays";
import { secsToMinOnly } from "utils/secsToMin";
import Markdown from "markdown-to-jsx";
import AuthContext from "context/AuthContext";
import Linkify from "react-linkify";

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
	width: 75%;
	background: transparent;
	display: flex;
	position: relative;
	flex-direction: column;
	min-height: 320px;
	transition: all 0.8s;

	@media ${mediaBreakpoint.down.lg} {
		min-height: 0;
		width: 100%;
		max-height: unset;
	}

	&.hide {
		width: 100%;
	}
`;

const MenuOpenBtn = styled.div`
	display: none;
	background: #fff;
	width: 48px;
	height: 48px;
	z-index: 100;
	position: fixed;
	right: 0;
	top: 50%;
	pointer-events: auto;
	&:hover {
		cursor: pointer;
	}

	& > svg {
		font-size: 48px;
	}

	@media ${mediaBreakpoint.down.lg} {
		opacity: 0;
		pointer-events: none;
	}
`;

const VideosListContainer = styled.div`
	min-height: 320px;
	padding: 32px 0;
	overflow-y: auto;
	position: relative;
	transition: all 0.8s;
	transform: translate(0, 0);
	position: absolute;
	right: 0;
	max-height: 100%;
	height: 100%;

	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #171b2de8;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	@media ${mediaBreakpoint.down.lg} {
		min-height: 0;
		width: 100%;
		max-height: 480px;
	}

	&.hide {
		opacity: 0;
		width: 0;
		transform: translate(100%, 0);
	}

	&.show {
		width: 25%;
	}

	@media ${mediaBreakpoint.down.lg} {
		&.hide {
			opacity: 1;
			width: 100%;
			transform: translate(0, 0);
		}

		&.show {
			width: 100%;
		}
	}
`;

const StyledHeadingSM = styled(HeadingSM)`
	font-size: 28px;
`;

const CloseButton = styled(HeadingSM)`
	font-size: 20px;
	padding: 4px;
	&:hover {
		cursor: pointer;
	}
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
	background: #fff;
	padding-bottom: 24px;
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const MiscBodyContainer = styled.div`
	padding: 24px 32px;
	background: #fff;
	overflow-y: auto;
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	${(props) => props.opened && `text-decoration: underline;`}
`;

const StyledMarkDown = styled(Markdown)`
	& p {
		font-size: 13px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			"Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
			"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
			"Noto Color Emoji";
	}
`;
const StyledTextSecondary = styled(TextSecondary)``;
export default function Kelas({
	slug,
	currentCourse,
	token,
	userServer,
	noToken = false,
}) {
	const router = useRouter();

	const { userLoading, user, checkUserLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		if (noToken) {
			checkUserLoggedIn();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noToken]);
	useEffect(() => {
		if (noToken && user && !userLoading) {
			router.reload();
		} else if (!user && !userLoading) {
			router.push("/masuk");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLoading]);

	if (noToken) {
		return <></>;
	}

	const { paid, title, bought_day_diff } = currentCourse;

	const { finished_watching, missions, all_missions_completed } =
		currentCourse.currentVideo;
	const video_desc = (
		<>
			{currentCourse.long_descx ? (
				<StyledMarkDown>{currentCourse.long_descx}</StyledMarkDown>
			) : (
				<StyledTextTertiary>
					{currentCourse.short_desc && currentCourse.short_desc.length > 0
						? currentCourse.short_desc
						: "-"}
				</StyledTextTertiary>
			)}
		</>
	);
	const [renderedDescContext, setRenderedDescContext] = useState(
		<>{video_desc}</>
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
	const [hideList, setHideList] = useState(false);
	const [videosState, setVideosState] = useState(
		currentCourse.grouped_videos.videos
	);

	const [mis, setMis] = useState([]);

	useEffect(() => {
		setMissionsCtx(missions);
		setMis(missions);
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
			if (!res.ok) {
				console.log("failed...");
				// console.log(data.message);
			} else {
				let px = mis;
				missionIdsToAPI.map((x) => {
					px.map((y, ix) => {
						if (y.id === x) {
							px[ix].completed = true;
						}
					});
				});
				console.log("lalu", px);
				setMis(px);
				console.log("mission done");
				setMissionSaveLoading(false);

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
						confirmButtonText: "Tutup pemberitahuan",
					}).then((result) => {
						if (result.isConfirmed || result.dismiss) {
							if (window) {
								setTimeout(() => {
									window.scrollTo(0, 0);
								}, 500);
							}
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
		if (finishedWatching && loadingFetchMission) {
			setLoadingFetchMission(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [finishedWatching, loadingFetchMission]);

	useEffect(() => {
		if (!loadingFetchMission && mis.length > 0) {
			setRenderedDescContext(
				<MisiBlock
					missions={mis}
					finishedWatching
					loading={loadingFetchMission}
					setMissionIdsToAPI={setMissionIdsToAPI}
					setMissionHook={setMissionHook}
				/>
			);
			setCurrentlyOpened("misi");
		}
	}, [loadingFetchMission, mis]);

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
			console.log("fetched missions ", fetchedMissions);
			setMissionsCtx(fetchedMissions);
			setMis(fetchedMissions);
		}
	};

	useEffect(() => {
		setCurrentlyOpened("desc");
		setFinishedWatching(finished_watching);
		setRenderedDescContext(<>{video_desc}</>);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCourse.currentVideo]);

	const PengumumanBlock = () => {
		return (
			<div className="d-flex flex-column w-100">
				{currentCourse.announcement ? (
					<>
						{[...currentCourse.announcement.pengumuman].reverse().map((p) => (
							<div key={p.id} className=" mb-4">
								<HeadingXXS
									style={{ fontSize: "13px" }}
									className="text-info1 mb-2"
								>
									{currentCourse.content_creator.full_name}
								</HeadingXXS>
								<StyledTextTertiary className="text-primary1 mb-2">
									Memposting pengumuman {"-"}{" "}
									<span style={{ fontSize: "11px" }}>
										{dateDiffInDays(new Date(p.date), new Date())}
									</span>
								</StyledTextTertiary>
								<StyledTextTertiary
									className="text-primary1 mt-1"
									style={{ whiteSpace: "pre-line" }}
								>
									<Linkify
										componentDecorator={(decoratedHref, decoratedText, key) => (
											<a target="blank" href={decoratedHref} key={key}>
												{decoratedText}
											</a>
										)}
									>
										{p.text}
									</Linkify>
								</StyledTextTertiary>
								<hr />
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
				video.bunny_video.upload_id
					? `/kelas/${slug}?c=${video.bunny_video.upload_id}`
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
				setRenderedDescContext(<>{video_desc}</>);
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
					goToTheNextDay(video, video_day);
				} else {
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
			await getInvoiceUrl(currentCourse, userServer, token);
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
					<TimeText className={`text-white`}>
						{secsToMinOnly(video.bunny_video.duration)}
					</TimeText>
				</div>

				<div className="d-flex align-items-center">
					{ix > 0 && <Lock className="text-white mr-1" />}
					<StyledTextSecondary className={`text-white`}>
						{video.bunny_video.title}
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
						{secsToMinOnly(video.bunny_video.duration)}
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
						{video.bunny_video.title}
					</StyledTextSecondary>
				</div>
			</>
		);
	};

	// eslint-disable-next-line react/display-name
	const MiscContainer = memo(() => {
		return (
			<>
				<MiscHeaderContainer className="justify-content-sm-start justify-content-between">
					<StyledHeadingXXS
						opened={currentlyOpened === "desc"}
						onClick={() => {
							setRenderedDescContext(<>{video_desc}</>);
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
									missions={mis}
									finishedWatching={finishedWatching}
									setMissionIdsToAPI={setMissionIdsToAPI}
									setMissionHook={setMissionHook}
								/>
							);
							setCurrentlyOpened("misi");
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
	});

	if (noToken) {
		return <></>;
	}

	return (
		<Layout
			showBurger={false}
			description={
				currentCourse.short_desc && currentCourse.short_desc.length > 0
					? `${currentCourse.short_desc} Ikuti kelas ${title} sekarang juga di Unbelievable!`
					: `Ikuti kelas ${title} sekarang juga di Unbelievable!`
			}
			title={`${title} | Unbelievable`}
			background="#171b2d"
			withMargin
		>
			<BuyModal show={buyModalOpen} onHide={() => setBuyModalOpen(false)} />

			<StyledContainer className="flex-column">
				<div className="d-flex w-100 justify-content-center">
					<HeadingXS className="text-center">{title}</HeadingXS>
				</div>
				<div
					id="waw"
					className="position-relative d-flex flex-lg-row flex-column w-100 mt-4 bg-primary1"
				>
					<MenuOpenBtn
						className={`${hideList && `d-block shadow-lg`}`}
						onClick={() => setHideList(false)}
					>
						<MdChevronLeft />
					</MenuOpenBtn>
					<VideoContainer className={`${hideList && `hide`}`}>
						<VideoPlayerHLS
							posterURL={`${BUNNY_STREAM_PREFIX_URL}/${currentCourse.currentVideo.bunny_video.video_id}/${currentCourse.currentVideo.bunny_video.thumbnail_name}`}
							videoId={currentCourse.currentVideo.id}
							finishesVideo={finishesVideo}
							liveURL={`${BUNNY_STREAM_PREFIX_URL}/${currentCourse.currentVideo.bunny_video.video_id}/playlist.m3u8`}
						/>
						<MiscContainer />
					</VideoContainer>
					<VideosListContainer
						className={`bg-primary1 ${hideList ? `hide` : `show`}`}
					>
						<div className="px-4 d-flex justify-content-between">
							<StyledHeadingSM as="p" className="text-white mb-3">
								Course content
							</StyledHeadingSM>

							<CloseButton
								onClick={() => {
									setHideList(!hideList);
								}}
								as="p"
								className="text-white d-none d-lg-block"
							>
								X
							</CloseButton>
						</div>

						{videosState.map((vid, ix) => (
							<div
								key={vid.bunny_video.upload_id}
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
			props: {
				noToken: true,
				// this noToken prop serves as a 'hack'ish way to fix
				// when token can't be fetched after a redirect
				// from a different site
				// might have to find a better solution... :)
			},
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
	const validUploadId = course[0].grouped_videos.videos.some((crs) => {
		if (crs.bunny_video) {
			return crs.bunny_video.upload_id === c;
		} else {
			return false; // if user hasnt bought the course / course has not even 1 video
		}
	});

	if (!validUploadId) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].grouped_videos.videos[0].bunny_video.upload_id}`,
			},
			props: {},
		};
	}
	if (c === "" || !c || c.length === 0) {
		return {
			redirect: {
				permanent: false,
				destination: `/kelas/${slug}?c=${course[0].grouped_videos.videos[0].bunny_video.upload_id}`,
			},
			props: {},
		};
	}
	let currentVideoIndexInVideosArray =
		course[0].grouped_videos.videos.findIndex((crs, ix) => {
			return crs.bunny_video.upload_id === c;
		});
	if (currentVideoIndexInVideosArray > 0) {
		let prevVideoMissionsCompleted =
			course[0].grouped_videos.videos[currentVideoIndexInVideosArray - 1]
				.all_missions_completed;
		if (!prevVideoMissionsCompleted) {
			return {
				redirect: {
					permanent: false,
					destination: `/kelas/${slug}?c=${course[0].grouped_videos.videos[0].bunny_video.upload_id}`,
				},
				props: {},
			};
		}
	}
	if (!course[0].enrolled) {
		const enrolling = await fetch(
			`${API_URL}/courses/enroll/${course[0].uuid}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!enrolling.ok) {
			console.log("failed enrolling");

			return {
				redirect: {
					permanent: false,
					destination: `/masuk`,
				},
				props: {},
			};
		}
	}
	let currentVideo = course[0].grouped_videos.videos.find((crs, ix) => {
		return crs.bunny_video.upload_id === c;
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

	if (!user.onboarded) {
		return {
			redirect: {
				permanent: false,
				destination: `/dashboard`,
			},
			props: {},
		};
	}

	return {
		props: {
			slug,
			currentCourse,
			token,
			userServer: user,
		},
	};
}
