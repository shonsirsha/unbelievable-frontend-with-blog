import { useEffect } from "react";
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
import { MAINTENANCE, API_URL } from "../config";
import { AuthProvider } from "context/AuthContext";
import { AppProvider } from "context/AppContext";
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
		<AppProvider>
			<AuthProvider>
				<CourseProvider>
					{MAINTENANCE ? <MaintenancePage /> : <Component {...pageProps} />}
				</CourseProvider>
			</AuthProvider>
		</AppProvider>
	);
}

export default Application;
