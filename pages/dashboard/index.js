import { parseCookies } from "utils/cookies";
import { useContext } from "react";
import Router from "next/router";
import AuthContext from "context/AuthContext";
import { API_URL } from "config/index";
import Onboarding from "components/Onboarding/Onboarding";
const index = ({ token, onboardings, user }) => {
	const { logout } = useContext(AuthContext);

	const handleFinishOnboarding = async () => {
		const res = await fetch(`${API_URL}/users/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ onboarded: true }),
		});

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
				return;
			}
			toast.error("Terjadi Kesalahan Mohon Coba Lagi");
		} else {
			Router.reload();
		}
	};

	if (!user.onboarded) {
		return (
			<>
				<Onboarding
					handleFinishOnboarding={handleFinishOnboarding}
					token={token}
					user={user}
					onboardings={onboardings}
				/>
				<button onClick={() => logout()}>logout</button>
			</>
		);
	}
	console.log(user.onboarded);
	return (
		<>
			Onboarded!
			{user.onboarded}
			<button onClick={() => logout()}>logout</button>
		</>
	);
};

export async function getServerSideProps({ req, res }) {
	const { token } = parseCookies(req);

	if (token === undefined) {
		res.setHeader("location", "/");
		res.statusCode = 302;
		res.end();
	} else {
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
		const onboardings = await res.json();
		const user = await res2.json();

		return {
			props: {
				onboardings,
				token,
				user,
			},
		};
	}
}

export default index;
