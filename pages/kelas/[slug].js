/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext, memo } from "react";
import CourseContext from "context/CourseContext";
import VideoPlayerHLS from "components/VideoPlayer/VideoPlayerHLS";
import MisiBlock from "components/Kelas/MisiBlock";
import MiscContainer from "components/Kelas/MiscContainer";
import ListSingleVideoPaid from "components/Kelas/ListSingleVideoPaid";
import ListSingleVideoUnpaid from "components/Kelas/ListSingleVideoUnpaid";
import {
	handleClickVideoDay,
	handleMissionsSave,
	finishesVideo,
} from "components/Kelas/utils";

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
import { TextTertiary } from "components/Typography/Text";
import { MdChevronLeft } from "react-icons/md";
import { mediaBreakpoint } from "utils/breakpoints";
import Markdown from "markdown-to-jsx";
import AuthContext from "context/AuthContext";

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
		position: relative;
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

const CourseDayContainer = styled.div`
	padding: 16px 32px;
	${(props) => props.current && `background: rgba(255,255,255,0.28);`}

	transition: all 0.4s;

	&:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.28);
	}
`;

const TimeText = styled(HeadingXXS)`
	font-size: 12px;
	font-family: MontSerratRegular;
`;

const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const CheckBoxWrapper = styled.div`
	display: flex;
	input[type="checkbox"] {
		width: 20px !important;
		height: 20px !important;
		appearance: none;
		position: static;
		outline: none;
		box-shadow: none;
		background: #dbdbdb;
	}

	input[type="checkbox"]:checked {
		background: #0ac7ce;
	}

	& svg {
		width: 21px;
    height: 21px;
}
	}
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
const StyledHeadingXS = styled(HeadingXS)`
	line-break: anywhere;
	@media ${mediaBreakpoint.down.md} {
		font-size: 18px;
	}
`;
export default function Kelas({
	slug,
	currentCourse,
	token,
	noToken = false,
	userServer,
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
		setBuyModalOpen,
		buyModalOpen,
		setMissionSaveLoading,
		getInvoiceUrl,
		checkIfInvoiceValid,
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
		if (missionHook) {
			handleMissionsSave(
				currentCourse,
				token,
				missionsCtx,
				missionIdsToAPI,
				setVideosState,
				setMissionsCompleted,
				setMissionSaveLoading,
				videosState
			);
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
		if (!loadingFetchMission && missionsCtx && missionsCtx.length > 0) {
			setRenderedDescContext(
				<MisiBlock
					finishedWatching
					loading={loadingFetchMission}
					setMissionIdsToAPI={setMissionIdsToAPI}
					setMissionHook={setMissionHook}
				/>
			);
			setCurrentlyOpened("misi");
		}
	}, [loadingFetchMission, missionsCtx]);

	useEffect(() => {
		setCurrentlyOpened("desc");
		setFinishedWatching(finished_watching);
		setRenderedDescContext(<>{video_desc}</>);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCourse.currentVideo]);

	if (noToken) {
		return <></>;
	}

	const thumbnailURL = `${BUNNY_STREAM_PREFIX_URL}/${currentCourse.currentVideo.bunny_video.video_id}/${currentCourse.currentVideo.bunny_video.thumbnail_name}`;
	return (
		<Layout
			showBurger={false}
			metaImageURL={thumbnailURL}
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
				<div className="d-flex w-100 justify-content-center px-3">
					<StyledHeadingXS as="h1" className="text-center">
						{title}
					</StyledHeadingXS>
				</div>
				<div className="position-relative d-flex flex-lg-row flex-column w-100 mt-4 bg-primary1">
					<MenuOpenBtn
						className={`${hideList && `d-block shadow-lg`}`}
						onClick={() => setHideList(false)}
					>
						<MdChevronLeft />
					</MenuOpenBtn>
					<VideoContainer className={`${hideList && `hide`}`}>
						{/* {currentCourse.currentVideo.id} */}
						<VideoPlayerHLS
							thumbnailURL={thumbnailURL}
							videoId={currentCourse.currentVideo.id}
							captions={
								currentCourse.currentVideo.bunny_video.captions
									? currentCourse.currentVideo.bunny_video.captions
									: []
							}
							bunnyVideoId={currentCourse.currentVideo.bunny_video.video_id}
							finishesVideo={() =>
								finishesVideo(
									finishedWatching,
									currentCourse,
									token,
									currentCourse.currentVideo.id,
									setFinishedWatching,
									setMissionsCtx
								)
							}
							liveURL={`${BUNNY_STREAM_PREFIX_URL}/${currentCourse.currentVideo.bunny_video.video_id}/playlist.m3u8`}
						/>
						<MiscContainer
							setRenderedDescContext={setRenderedDescContext}
							setCurrentlyOpened={setCurrentlyOpened}
							setMissionIdsToAPI={setMissionIdsToAPI}
							setMissionHook={setMissionHook}
							videoDesc={video_desc}
							currentCourse={currentCourse}
							currentlyOpened={currentlyOpened}
							renderedDescContext={renderedDescContext}
							finishedWatching={finishedWatching}
						/>
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
								onClick={() =>
									handleClickVideoDay(
										currentCourse,
										vid,
										video_desc,
										ix,
										paid,
										videosState,
										slug,
										bought_day_diff,
										setRenderedDescContext,
										userServer,
										checkIfInvoiceValid,
										getInvoiceUrl,
										setBuyModalOpen,
										token
									)
								}
							>
								<a>
									<CourseDayContainer
										key={vid.id}
										current={currentCourse.currentVideo.id === vid.id}
										className="d-flex flex-column "
									>
										{paid ? (
											<>
												<ListSingleVideoPaid
													videosState={videosState}
													video={vid}
													ix={ix}
													boughtDayDiff={bought_day_diff}
												/>
											</>
										) : (
											<ListSingleVideoUnpaid
												videosState={videosState}
												video={vid}
												ix={ix}
											/>
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
	//c is the  upload_id.
	//upload_id comes from bunny_video.upload_id

	const res = await fetch(`${API_URL}/courses?slug=${slug}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const course = await res.json();
	if (!res.ok || course[0].grouped_videos.videos.length < 1) {
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
		}
		return false; // if user hasnt bought the course / course has not even 1 video
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
