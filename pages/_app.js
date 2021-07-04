import { useState, useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "styles/globals.css";
import "styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video.js/dist/video-js.css";
import { useRouter } from "next/router";
import { AuthProvider } from "context/AuthContext";

function Application({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleStart = (url) => {
			console.log(`Loading: ${url}`);
			NProgress.start();
		};
		const handleStop = () => {
			NProgress.done();
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default Application;
