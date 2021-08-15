import { useState, useEffect } from "react";
import VREPlayer from "videojs-react-enhanced";

export default function VideoPlayerNonHLS({ liveUrl, onVideoFinished }) {
	const playerOptions = {
		src: liveUrl,
		controls: true,
		autoplay: true,
		playsinline: true,
	};
	const videojsOptions = {
		fluid: true,
	};

	const [duration, setDuration] = useState(null);
	const [finished, setFinished] = useState(false);
	const [sec, setSec] = useState(0);

	useEffect(() => {
		if (finished) {
			onVideoFinished();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [finished]);

	useEffect(() => {
		if (!finished && duration) {
			if (sec >= duration - 10) {
				setFinished(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
