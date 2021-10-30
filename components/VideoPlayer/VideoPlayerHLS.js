import React, { useRef, useState, useEffect, Fragment } from "react";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";
import { BUNNY_STREAM_PREFIX_URL } from "config";
// those imports are important
import qualitySelector from "videojs-hls-quality-selector";
import { isMobile } from "react-device-detect";

const VideoPlayerHLS = ({
	liveURL,
	videoId,
	finishesVideo,
	thumbnailURL = "",
	bunnyVideoId,
	captions = [],
	onboarding = false,
}) => {
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
			const captionsCompleted =
				captions && captions.length > 0
					? captions.map((co) => ({
							...co,
							src: `${BUNNY_STREAM_PREFIX_URL}/${bunnyVideoId}/captions/${co.srclang}.vtt`,
							kind: `captions`,
					  }))
					: [];
			const allTracks = player.textTracks().tracks_;
			if (allTracks.length > 0) {
				allTracks.map((t) => {
					player.removeRemoteTextTrack(t);
				});
			}
			if (captionsCompleted.length > 0) {
				captionsCompleted.map((c, ix) => {
					player.addRemoteTextTrack({
						src: c.src,
						kind: c.kind,
						srclang: c.srclang,
						label: c.label,
						default: ix === 0,
					});
				});
			}
			setCallFinishVideoAPI(false);
			// setVidDuration(50000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId, liveURL, thumbnailURL, captions, player]);

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
			fluid: onboarding,
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
				vhs: {
					overrideNative: !isMobile,
				},
				nativeAudioTracks: isMobile,
				nativeVideoTracks: isMobile,
				nativeTextTracks: isMobile,
			},
			tracks:
				captions.length > 0
					? captions.map((co, ix) => ({
							...co,
							src: `${BUNNY_STREAM_PREFIX_URL}/${bunnyVideoId}/captions/${co.srclang}.vtt`,
							kind: `captions`,
							default: ix === 0,
					  }))
					: [],
		};

		const p = videojs(
			videoRef.current,
			videoJsOptions,
			function onPlayerReady() {
				this.qualityLevels();
				this.src({
					src: liveURL,
					type: "application/x-mpegURL",
					withCredentials: false,
				});
				this.hlsQualitySelector({ displayCurrentQuality: true });
				// console.log('onPlayerReady');
			}
		);

		setPlayer(p);
		return () => {
			if (player) player.dispose();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let currentTime = 0;

	return (
		<div data-vjs-player>
			<video
				playsInline={true}
				ref={videoRef}
				onLoadedMetadata={(e, _) => {
					// console.log(e.target.duration);
					setVidDuration(e.target.duration);
				}}
				onSeeking={(_) => {
					if (onboarding) {
						if (currentTime < player.currentTime()) {
							player.currentTime(currentTime);
						}
					}
				}}
				onSeeked={(_) => {
					if (onboarding) {
						if (currentTime < player.currentTime()) {
							player.currentTime(currentTime);
						}
					}
				}}
				onTimeUpdate={(e) => {
					if (e.target.currentTime >= vidDuration - 10) {
						setCallFinishVideoAPI(true);
					}

					setInterval(function () {
						if (!player.paused()) {
							console.log(player.currentTime());
							currentTime = player.currentTime();
						}
					}, 1000);
				}}
				className={`${
					!onboarding ? `vidPlayer` : `onboardingplayer`
				} video-js vjs-default-skin vjs-big-play-centered`}
			></video>
		</div>
	);
};

export default VideoPlayerHLS;
