import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "utils/cookies";
import Onboarding from "components/Onboarding/Onboarding";
import { API_URL } from "config/index";

const VideoTutorial = ({ user, onboardings }) => {
	return (
		<Onboarding
			user={user}
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

	if (token === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	} else {
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
			user,
		},
	};
}

export default VideoTutorial;
