import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";

const withAuth = (Component) => {
	const Auth = (props) => {
		const { user, loading, checkUserLoggedIn } = useContext(AuthContext);
		const router = useRouter();

		useEffect(() => {
			checkUserLoggedIn();
		}, []);
		if (loading) {
			return "loading..."; // loading svg..
		}

		// Login data added to props via redux-store (or use react context for example)
		if (!loading) {
			// If user is not logged in, return login component
			if (!user) {
				router.push("/login");
			} else {
				return <Component {...props} />;
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
