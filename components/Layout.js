import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Headers/Header";
import RoundedBtnIcon from "./Buttons/RoundedBtnIcon";
import styled from "styled-components";

const FlyingButtonsContainer = styled.div`
	width: 380px;
	left: 0;
	top: 0;
	height: 100vh;
	position: fixed;
	padding-top: 128px;
	padding-left: 48px;
`;
export default function Layout({
	title = "Unbelieveable",
	keywords = "self development, lms",
	description = "Belajarlah setiap hari, jadilah unbelieveable!",
	children,
	withFB = false, // FB = FlyingButtons
}) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />

			{withFB && (
				<FlyingButtonsContainer>
					<Link href="/">
						<a>
							<RoundedBtnIcon img={`images/home.png`} />
						</a>
					</Link>
				</FlyingButtonsContainer>
			)}
			<div>{children}</div>
			<Footer />
		</div>
	);
}
