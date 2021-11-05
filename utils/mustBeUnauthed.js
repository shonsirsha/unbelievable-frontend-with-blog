import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import LoadingLayout from "components/Loading/LoadingLayout";
const mustBeUnauthed = (Component) => {
	const Auth = (props) => {
		const { user, userLoading } = useContext(AuthContext);
		const router = useRouter();
		let description = "";
		let title = "";
		switch (router.pathname) {
			case "/daftar":
				title = "Daftar Gratis | Unbelievable";
				description =
					"Daftar gratis sekarang dan jadilah lebih baik setiap harinya!";
				break;
			case "/masuk":
				title = "Masuk | Unbelievable";
				description = "Masuk ke Unbelievable!";
				break;
			default:
				description = "Belajarlah setiap hari, jadilah unbelievable!";
		}

		if (userLoading) {
			return <LoadingLayout title={title} description={description} />; // loading svg..
		}
		// Login data added to props via redux-store (or use react context for example)
		if (!userLoading) {
			// If user is not logged in, return login component
			if (user) {
				router.push("/dashboard");
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

export default mustBeUnauthed;
