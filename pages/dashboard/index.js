import { useState, useEffect, useContext } from "react";
import withAuth from "utils/withAuth";
import AuthContext from "context/AuthContext";

const index = () => {
	const { logout } = useContext(AuthContext);

	return (
		<div>
			<button onClick={() => logout()}>logout</button>
		</div>
	);
};

export default withAuth(index);
