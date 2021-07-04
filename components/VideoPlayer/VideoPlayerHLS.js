import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
// those imports are important
import qualitySelector from "videojs-hls-quality-selector";
import qualityLevels from "videojs-contrib-quality-levels";

const VideoPlayerHLS = ({ liveURL }) => {
	const videoRef = useRef();
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (player) {
			player.src([liveURL]);
		}
	}, [liveURL]);

	useEffect(() => {
		const videoJsOptions = {
			preload: "auto",
			autoplay: "any",
			controls: true,
			fluid: true,
			responsive: true,
			sources: [
				{
					src: liveURL,
				},
			],
		};

		videojs.registerPlugin("hlsQualitySelector", qualitySelector);
		const p = videojs(
			videoRef.current,
			videoJsOptions,
			function onPlayerReaady() {
				// console.log('onPlayerReady');
			}
		);
		setPlayer(p);
		return () => {
			if (player) player.dispose();
		};
	}, []);

	useEffect(() => {
		if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
	}, [player]);
	return (
		<div data-vjs-player>
			<video
				ref={videoRef}
				className="video-js vjs-default-skin vjs-big-play-centered"
			></video>
		</div>
	);
};

export default VideoPlayerHLS;
