import Layout from "components/Layout";
import Hero from "components/LandingPage/Hero";
import TentangKami from "components/LandingPage/TentangKami";
import CaraKerja from "components/LandingPage/CaraKerja";
import TentangKami2 from "components/LandingPage/TentangKami2";
import MulaiSekarang from "components/LandingPage/MulaiSekarang";
import Testimonial from "components/LandingPage/Testimonial";
import { API_URL } from "config";

export default function Home({ testimonials }) {
	return (
		<Layout withFB>
			<Hero />
			<TentangKami />
			<CaraKerja />
			<TentangKami2 />
			{testimonials && <Testimonial testimonials={testimonials} />}
			<MulaiSekarang />
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/testimonials`);
	const testimonials = await res.json();
	return {
		props: { testimonials },
		revalidate: 1,
	};
}
