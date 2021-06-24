import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import { Button } from "react-bootstrap";
import {
	HeadingXL,
	HeadingLG,
	HeadingXXL,
	HeadingSM,
	HeadingMD,
	HeadingXS,
} from "components/Typography/Headings";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Next.js Starter!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<HeadingXXL>Heading XXL</HeadingXXL>
				<HeadingXL>Heading XL</HeadingXL>
				<HeadingLG>Heading LG</HeadingLG>
				<HeadingMD>Heading MD</HeadingMD>
				<HeadingSM>Heading SM</HeadingSM>
				<HeadingXS>Heading XS</HeadingXS>
			</main>

			<Footer />
		</div>
	);
}
