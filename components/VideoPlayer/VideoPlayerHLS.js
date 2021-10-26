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
			player.src({
				src: liveURL,
				type: "application/x-mpegURL",
				withCredentials: false,
			});
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
			autoplay: false,
			preload: "auto",
			controls: true,
			poster: thumbnailURL,
			sources: [
				{
					src: liveURL,
					type: "application/x-mpegURL",
					withCredentials: false,
				},
			],
			html5: {
				hls: {
					overrideNative: true,
				},
				nativeAudioTracks: false,
				nativeVideoTracks: false,
			},
		};

		const p = videojs(
			videoRef.current,
			videoJsOptions,
			function onPlayerReady() {
				// console.log('onPlayerReady');
			}
		);

		console.log(p.qualityLevels());
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
