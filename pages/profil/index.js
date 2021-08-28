import { useContext } from "react";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import withAuth from "utils/withAuth";

const Profil = () => {
	const { logout } = useContext(AuthContext);

	return (
		<Layout
			title="Profil | Unbelieveable"
			background="#171b2d"
			withMargin
			mainApp
		>
			<div>Profile page (Work in progress)</div>
		</Layout>
	);
};
``;
export default withAuth(Profil);
