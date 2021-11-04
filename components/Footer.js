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
		<StyledFooter className="bg-primary1 flex-md-row flex-column">
			<Link href="/">
				<a>
					<Image
						width={"220px"}
						height={"24px"}
						src="/images/logo.svg"
						alt="logo"
					/>
				</a>
			</Link>

			<TextSecondary className="text-white ">
				© Unbelievable.id, {new Date().getFullYear()}
			</TextSecondary>
		</StyledFooter>
	);
}
