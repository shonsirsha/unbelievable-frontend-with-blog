// import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video.js/dist/video-js.css";
import "styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

import Router from "next/router";
import { MAINTENANCE } from "../config";
import { AuthProvider } from "context/AuthContext";
import { CourseProvider } from "context/CourseContext";
import MaintenancePage from "./maintenance";

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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [MAINTENANCE]);

	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => NProgress.done());
	Router.events.on("routeChangeError", () => NProgress.done());
	return (
		<AuthProvider>
			<CourseProvider>
				{MAINTENANCE ? <MaintenancePage /> : <Component {...pageProps} />}

				<Component {...pageProps} />
			</CourseProvider>
		</AuthProvider>
	);
}

export default Application;
