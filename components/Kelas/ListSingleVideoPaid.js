import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import { AiOutlineClockCircle } from "react-icons/ai";
import { secsToMinOnly } from "utils/secsToMin";
import { isVideoFinished } from "./utils";
import VideoIndicatorCheckbox from "./VideoIndicatorCheckbox";

import styled from "styled-components";
const StyledHeadingXS = styled(HeadingXS)`
	font-size: 22px;
`;

const Clock = styled(AiOutlineClockCircle)`
	font-size: 14px;
`;
const TimeText = styled(HeadingXXS)`
	font-size: 12px;
	font-family: MontSerratRegular;
`;

const ListSingleVideoPaid = ({ video, videosState, ix, boughtDayDiff }) => {
	const isFirstVideo = videosState.findIndex((v) => v.id === video.id) === 0; // first video of the course

	const isPrevVideoFinished = () => {
		if (ix !== 0) {
			const currentVideoIx = videosState.findIndex((v) => v.id === video.id);
			const prevVideoIx = currentVideoIx - 1;
			return videosState[prevVideoIx].all_missions_completed;
		}
		return true;
	};

	return (
		<>
			<div className="d-flex align-items-center">
				{isVideoFinished(videosState, video) ? (
					<StyledHeadingXS as="p" className={`text-white mb-1`}>
						{video.day_title}
					</StyledHeadingXS>
				) : (
					<StyledHeadingXS
						as="p"
						className={`text-${
							boughtDayDiff >= ix ? `white` : "lighterDarkGray"
						} mb-1`}
					>
						{video.day_title}
					</StyledHeadingXS>
				)}
			</div>
			<div className="d-flex align-items-center mb-2">
				{isVideoFinished(videosState, video) ? (
					<>
						<Clock className={`text-white mr-1`} />

						<TimeText className={`text-white`}>
							{secsToMinOnly(video.bunny_video.duration)}
						</TimeText>
					</>
				) : (
					<>
						<Clock
							className={`text-${
								boughtDayDiff >= ix ? `white` : "lighterDarkGray"
							} mr-1`}
						/>

						<TimeText
							className={`text-${
								boughtDayDiff >= ix ? `white` : "lighterDarkGray"
							}`}
						>
							{secsToMinOnly(video.bunny_video.duration)}
						</TimeText>
					</>
				)}
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

				{isVideoFinished(videosState, video) ? (
					<VideoIndicatorCheckbox finished />
				) : (
					<VideoIndicatorCheckbox />
				)}

				{/* {ix > 0 && } */}

				{isVideoFinished(videosState, video) ? (
					<TextSecondary className={`text-white`}>
						{video.bunny_video.title}
					</TextSecondary>
				) : (
					<TextSecondary
						className={`text-${
							boughtDayDiff >= ix ? `white` : "lighterDarkGray"
						}`}
					>
						{video.bunny_video.title}
					</TextSecondary>
				)}
			</div>
		</>
	);
};

export default ListSingleVideoPaid;
