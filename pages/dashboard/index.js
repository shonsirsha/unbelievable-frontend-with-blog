import { useState, useEffect, useContext } from "react";
import withAuth from "utils/withAuth";
import AuthContext from "context/AuthContext";
import videojs from "video.js";
import VREPlayer from "videojs-react-enhanced";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";

const index = ({ user }) => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		console.log(user);
	}, []);

	const playerOptions = {
		src: "https://s3-ternakuang-video.s3-ap-southeast-1.amazonaws.com/module/22-richest-man-in-babylon/3-investasi-di-dirimu-sendiri/3.Investasi-di-Dirimu-Sendiri.m3u8",
		controls: true,
		autoplay: "play",
	};
	const videojsOptions = {
		fluid: true,
	};

	if (!user.onboarded) {
		return (
			<div>
				<VideoPlayer
					liveURL={`https://s3-ternakuang-video.s3-ap-southeast-1.amazonaws.com/module/22-richest-man-in-babylon/3-investasi-di-dirimu-sendiri/3.Investasi-di-Dirimu-Sendiri.m3u8`}
				/>
			</div>

			// 	<VREPlayer
			// 		playerOptions={playerOptions}
			// 		videojsOptions={videojsOptions}
			// 		onReady={(player) => console.log(player)}
			// 		onPlay={(e, _, second) => console.log("Play!")}
			// 		onPause={(e, _, second) => console.log("Pause!")}
			// 		onEnded={(e, _) => console.log("Ended!")}
			// 	/>{" "}
			// 	<button onClick={() => logout()}>logout</button>
			// </div>
			// <video
			// 	id="my-player"
			// 	class="video-js"
			// 	controls
			// 	preload="auto"
			// 	data-setup='{"fluid": true}'
			// >
			// 	<source src={`${playerOptions.src}`} type="video/mp4"></source>
			// 	<p class="vjs-no-js">
			// 		To view this video please enable JavaScript, and consider upgrading to
			// 		a web browser that
			// 		<a href="http://videojs.com/html5-video-support/" target="_blank">
			// 			supports HTML5 video
			// 		</a>
			// 	</p>
			// </video>
		);
	}
	return (
		<div>
			<button onClick={() => logout()}>logout</button>
		</div>
	);
};

export default withAuth(index);
