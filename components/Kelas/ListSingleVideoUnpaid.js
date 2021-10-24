import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
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
const Lock = styled(MdLockOutline)`
	font-size: 18px;
`;
const ListSingleVideoUnpaid = ({ videosState, video, ix }) => {
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

				{isVideoFinished(videosState, video) && (
					<VideoIndicatorCheckbox finished />
				)}
				<TextSecondary className={`text-white`}>
					{video.bunny_video.title}
				</TextSecondary>
			</div>
		</>
	);
};

export default ListSingleVideoUnpaid;
