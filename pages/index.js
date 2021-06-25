import Layout from "components/Layout";
import Hero from "components/LandingPage/Hero";
import TentangKami from "components/LandingPage/TentangKami";
import CaraKerja from "components/LandingPage/CaraKerja";
import TentangKami2 from "components/LandingPage/TentangKami2";
export default function Home() {
	return (
		<Layout>
			<Hero />
			<TentangKami />
			<CaraKerja />
			<TentangKami2 />
		</Layout>
	);
}
