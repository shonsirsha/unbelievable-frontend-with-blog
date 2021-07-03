import { parseCookies } from "utils/cookies";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { API_URL } from "config/index";
import styled from "styled-components";
import Onboarding from "components/Onboarding/Onboarding";
const index = ({ token, onboardings }) => {
	const { logout } = useContext(AuthContext);

	return (
		<>
			<Onboarding token={token} onboardings={onboardings} />
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
