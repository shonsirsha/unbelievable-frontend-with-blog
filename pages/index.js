import Layout from "components/Layout";
import Hero from "components/LandingPage/Hero";
import TentangKami from "components/LandingPage/TentangKami";
import CaraKerja from "components/LandingPage/CaraKerja";
import TentangKami2 from "components/LandingPage/TentangKami2";
import MulaiSekarang from "components/LandingPage/MulaiSekarang";
import Testimonial from "components/LandingPage/Testimonial";
import { API_URL } from "config";

export default function Home({ homePageContent, seo }) {
	const { about, carakerja, professionals, testimonials, about_image } =
		homePageContent;
	return (
		<Layout landingPage withFB>
			<Hero />
			<TentangKami about={about} about_image={about_image} />
			<CaraKerja carakerja={carakerja} />
			<TentangKami2 professionals={professionals} />
			{testimonials && testimonials.length > 0 && (
				<Testimonial testimonials={testimonials} />
			)}
			<MulaiSekarang />
		</Layout>
	);
}

export async function getStaticProps() {
	const homeRes = await fetch(`${API_URL}/homepage`);
	const homePageContent = await homeRes.json();
	return {
		props: {
			homePageContent,
		},
		revalidate: 1,
	};
}
