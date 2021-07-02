import videojs from "video.js";
import VREPlayer from "videojs-react-enhanced";
import styled from "styled-components";

const StyledPlayer = styled(VREPlayer)`
	height: 320px;
`;

export default function VideoPlayerNonHLS({ liveUrl }) {
	const playerOptions = {
		src: liveUrl,
		controls: true,
		autoplay: "play",
	};
	const videojsOptions = {
		fluid: true,
	};

	return (
		<StyledPlayer
			playerOptions={playerOptions}
			videojsOptions={videojsOptions}
			onReady={(player) => console.log(player)}
			onPlay={(e, _, second) => console.log("Play!")}
			onPause={(e, _, second) => console.log("Pause!")}
			onEnded={(e, _) => console.log("Ended!")}
		/>
	);
}
