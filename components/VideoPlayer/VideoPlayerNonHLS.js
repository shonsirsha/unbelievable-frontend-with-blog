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
	let y = 0;
	return (
		<div id="macan">
			<VREPlayer
				playerOptions={playerOptions}
				videojsOptions={videojsOptions}
				onLoadedMetadata={(e, player) => {
					setDuration(player.duration());
				}}
				// onReady={(player) => {
				// 	// player.controlBar.progressControl.disable();
				// }}
				onSeeking={(ev, player, currentTimeSecond) => {
					console.log(y);

					if (y < currentTimeSecond) {
						player.pause();
						player.currentTime(y);
						return;
					}
				}}
				onSeeked={(ev, player, startPositionSecond, completeTimeSecond) => {
					if (startPositionSecond < completeTimeSecond) {
						player.pause();
						player.currentTime(startPositionSecond);

						return;
					}
				}}
				onPlay={(e, _, second) => {}}
				onTimeUpdate={(e, _, second) => {
					y = second;
					setSec(second);
				}}
				onPause={(e, _, second) => {}}
				onEnded={(e, _) => {
					console.log(y);
					console.log("ASDASD");
					setFinished(true);
				}}
			/>
		</div>
	);
}
