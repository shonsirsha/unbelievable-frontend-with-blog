import { useState, useEffect, useContext } from "react";
import withAuth from "utils/withAuth";
import AuthContext from "context/AuthContext";

const index = ({ user }) => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		console.log(user);
	}, []);

	if (!user.onboarded) {
		return (
			<div>
				onboarding material... <button onClick={() => logout()}>logout</button>
			</div>
		);
	}
	return (
		<div>
			<button onClick={() => logout()}>logout</button>
		</div>
	);
};

export default withAuth(index);
