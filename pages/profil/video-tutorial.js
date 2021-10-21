import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "utils/cookies";
import Onboarding from "components/Onboarding/Onboarding";
import { API_URL } from "config/index";

const VideoTutorial = ({ userServer, onboardings, noToken = false }) => {
	const router = useRouter();

	const { userLoading, user, checkUserLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		if (noToken) {
			checkUserLoggedIn();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noToken]);
	useEffect(() => {
		if (noToken && user && !userLoading) {
			router.reload();
		} else if (!user && !userLoading) {
			router.push("/masuk");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLoading]);
	if (noToken) {
		return <></>;
	}
	return (
		<Onboarding
			user={userServer}
			backTo="/profil"
			title="Video Tutorial | Unbelievable"
			onboardings={onboardings}
			videoSkippable
			showBackBtn
			steps={2}
		/>
	);
};

export async function getServerSideProps({ req, _ }) {
	const { token } = parseCookies(req);

	if (!token) {
		return {
			props: {
				noToken: true,
			},
		};
	}
	const res = await fetch(`${API_URL}/onboardings`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const res2 = await fetch(`${API_URL}/users/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	let user = await res2.json();
	user.token = token;
	const onboardings = await res.json();

	return {
		props: {
			onboardings,
			userServer: user,
		},
	};
}

export default VideoTutorial;
