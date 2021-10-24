import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";

// those imports are important
import qualitySelector from "videojs-hls-quality-selector";

const VideoPlayerHLS = ({ liveURL, videoId, finishesVideo, thumbnailURL }) => {
	const videoRef = useRef();
	const [player, setPlayer] = useState(undefined);
	const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
	const [vidDuration, setVidDuration] = useState(50000);

	useEffect(() => {
		if (player) {
			player.src([liveURL]);
			player.poster(thumbnailURL);
			setCallFinishVideoAPI(false);
			setVidDuration(50000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId, liveURL, thumbnailURL]);

	useEffect(() => {
		if (callFinishVideoAPI) {
			finishesVideo();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callFinishVideoAPI]);

	useEffect(() => {
		const videoJsOptions = {
			preload: "auto",
			autoplay: false,
			controls: true,
			playsinline: true,
			responsive: true,
			overrideNative: true,
			poster: thumbnailURL,
			html5: {
				hls: {
					overrideNative: true, // add this line
				},
			},
			sources: [
				{
					src: liveURL,
					type: "application/x-mpegURL",
				},
			],
		};

		const p = videojs(
			videoRef.current,
			videoJsOptions,
			function onPlayerReady() {
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
					// console.log(e.target.duration);
					setVidDuration(e.target.duration);
				}}
				onTimeUpdate={(e) => {
					if (e.target.currentTime >= vidDuration - 10) {
						setCallFinishVideoAPI(true);
					}
				}}
				className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
			></video>
		</div>
	);
};

export default VideoPlayerHLS;
