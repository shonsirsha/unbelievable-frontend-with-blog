import { useState, useEffect } from "react";
import VREPlayer from "videojs-react-enhanced";

export default function VideoPlayerNonHLS({ liveUrl, onVideoFinished }) {
	const playerOptions = {
		src: liveUrl,
		controls: true,
		autoplay: "play",
	};
	const videojsOptions = {
		fluid: true,
	};

	const [duration, setDuration] = useState(null);
	const [finished, setFinished] = useState(false);
	const [sec, setSec] = useState(0);

	useEffect(() => {}, [duration]);

	useEffect(() => {
		if (!finished && duration) {
			if (sec >= duration - 10) {
				console.log("finisshedd");
				setFinished(true);
			}
		}
	}, [sec]);

	return (
		<VREPlayer
			playerOptions={playerOptions}
			videojsOptions={videojsOptions}
			onLoadedMetadata={(e, player) => {
				setDuration(player.duration());
			}}
			onReady={(player) => {}}
			onPlay={(e, _, second) => {}}
			onTimeUpdate={(e, _, second) => {
				setSec(second);
			}}
			onPause={(e, _, second) => {}}
			onEnded={(e, _) => {
				setFinished(true);
			}}
		/>
	);
}
