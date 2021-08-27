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
			<div>
				Profile page (Work in progress)
				<button className="mb-5" onClick={() => logout()}>
					logout
				</button>
			</div>
		</Layout>
	);
};
``;
export default withAuth(Profil);
