import styles from "./Footer.module.css";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { TextSecondary } from "./Typography/Text";
const StyledFooter = styled.footer`
	margin-top: auto;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-top: 3px solid #2b72f0;
`;

export default function Footer() {
	return (
		<StyledFooter className="bg-primary1">
			{/* <Image
				width={"20px"}
				height={"20px"}
				src="/netliheart.svg"
				alt="Netlify Logo"
				className={styles.logo}
			/> */}
			<Image
				width={"220px"}
				height={"24px"}
				src="/images/logo.png"
				alt="logo"
			/>
			<TextSecondary className="text-white ">
				© Unbelievable.id, 2021
			</TextSecondary>
		</StyledFooter>
	);
}
