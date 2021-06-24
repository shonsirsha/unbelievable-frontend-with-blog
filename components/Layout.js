import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";

export default function Layout({
	title = "Unbelieveable",
	keywords = "self development, lms",
	description = "Belajarlah setiap hari, jadilah unbelieveable!",
	children,
}) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<div>{children}</div>
			<Footer />
		</div>
	);
}
