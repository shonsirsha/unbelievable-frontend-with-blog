import { useEffect } from "react";
import NProgress from "nprogress";
import Head from "next/head";
import "nprogress/nprogress.css";
import "styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video.js/dist/video-js.css";
import "styles/globals.css";

import Router from "next/router";
import { MAINTENANCE } from "../config";
import { AuthProvider } from "context/AuthContext";
import { CourseProvider } from "context/CourseContext";

function Application({ Component, pageProps }) {
	NProgress.configure({
		minimum: 0.3,
		easing: "ease",
		speed: 800,
		showSpinner: false,
	});

	useEffect(() => {
		if (MAINTENANCE) {
			Router.push("/");
		}
	}, [MAINTENANCE]);

	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());
	return (
		<AuthProvider>
			<CourseProvider>
				<Head>
					<meta property="og:description" content={"tezt"} key="ogdesc" />
				</Head>
				{MAINTENANCE ? "Maaf, maintenance" : <Component {...pageProps} />}
			</CourseProvider>
		</AuthProvider>
	);
}

export default Application;
