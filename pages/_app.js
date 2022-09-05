import { useEffect } from "react";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video.js/dist/video-js.css";
import "styles/globals.css";
import "styles/ck5.css";
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";
import { MAINTENANCE, GA_ID, FB_PIXEL_ID } from "../config";
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
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
			/>
			<Script id="ga-analytics">
				{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `}
			</Script>
			<Script id="facebook-pixel">
				{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${FB_PIXEL_ID});
        fbq('track', 'PageView');
      `}
			</Script>
			<AppProvider>
				<AuthProvider>
					<CourseProvider>
						{MAINTENANCE ? <MaintenancePage /> : <Component {...pageProps} />}
					</CourseProvider>
				</AuthProvider>
			</AppProvider>
		</>
	);
}

export default Application;
