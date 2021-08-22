import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import Loading from "components/Loading/Loading";
const withAuth = (Component) => {
	const Auth = (props) => {
		const { user, userLoading } = useContext(AuthContext);

		const router = useRouter();

		if (userLoading) {
			return <Loading />; // loading svg..
		}

		// Login data added to props via redux-store (or use react context for example)
		if (!userLoading) {
			// If user is not logged in, return login component
			if (!user) {
				router.push("/masuk");
			} else {
				return <Component {...props} user={user} />;
			}
			// If user is logged in, return original component
		}
		return null;
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
};

export default withAuth;
