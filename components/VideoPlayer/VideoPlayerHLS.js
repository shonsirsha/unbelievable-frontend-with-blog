import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";

// those imports are important
import qualitySelector from "videojs-hls-quality-selector";

const VideoPlayerHLS = ({ liveURL, videoId }) => {
	const videoRef = useRef();
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (player) {
			player.src([liveURL]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId, liveURL]);

	useEffect(() => {
		const videoJsOptions = {
			preload: "auto",
			autoplay: true,
			controls: true,
			fluid: true,
			responsive: true,
			sources: [
				{
					src: liveURL,
					type: "application/x-mpegURL",
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
	}, [player]);
	return (
		<div data-vjs-player>
			<video
				ref={videoRef}
				onLoadedMetadata={(e, px) => {
					console.log(e.target.duration);
				}}
				onTimeUpdate={(e) => {
					console.log(e.target.currentTime);
				}}
				className="video-js vjs-default-skin vjs-big-play-centered"
			></video>
		</div>
	);
};

export default VideoPlayerHLS;
