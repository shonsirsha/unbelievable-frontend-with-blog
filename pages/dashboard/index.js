import { parseCookies } from "utils/cookies";
import { useState, useEffect, useContext } from "react";
import withAuth from "utils/withAuth";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { API_URL } from "config/index";
import VideoPlayerNonHLS from "components/VideoPlayer/VideoPlayerNonHLS";

const index = ({ user, token, onboardings }) => {
	const { logout } = useContext(AuthContext);
	const router = useRouter();
	useEffect(() => {
		console.log(onboardings);
	}, []);
	return (
		<div>
			asd
			{token}
			<button onClick={() => logout()}>logout</button>
		</div>
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

		const onboardings = await res.json();

		return {
			props: {
				onboardings,
				token,
			},
		};
	}
}

export default index;
