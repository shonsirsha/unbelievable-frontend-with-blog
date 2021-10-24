import { Image } from "react-bootstrap";
import styled from "styled-components";
import Head from "next/head";
const StyledImage = styled(Image)`
	position: fixed;
	top: 50%;
	left: 50%;
	${(props) => props.transform && `transform: translate(-50%, -50%);`}
	right: 50%;
	width: 48px;
	height: 48px;
`;
export default function LoadingLayout({
	title,
	keywords = "self development, lms",
	description,
	imageURL = null,
}) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta property="og:title" content={title} />
				{imageURL && <meta property="og:image" content={imageURL} />}
				<meta name="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta name="keywords" content={keywords} />
				<meta name="description" content={description} />
				<link rel="shortcut icon" href="/images/favicon/favicon.ico" />
			</Head>
			<StyledImage src="/images/loading.gif" alt="Loading..." />
		</>
	);
}
