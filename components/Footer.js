import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { TextSecondary } from "./Typography/Text";
import Link from "next/link";
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
	const { user } = useContext(AuthContext);

	return (
		<StyledFooter className="bg-primary1">
			{/* <Image
				width={"20px"}
				height={"20px"}
				src="/netliheart.svg"
				alt="Netlify Logo"
				className={styles.logo}
			/> */}
			<Link href={user ? `/dashboard` : `/`}>
				<Image
					width={"220px"}
					height={"24px"}
					src="/images/logo.png"
					alt="logo"
				/>
			</Link>

			<TextSecondary className="text-white ">
				© Unbelievable.id, 2021
			</TextSecondary>
		</StyledFooter>
	);
}
