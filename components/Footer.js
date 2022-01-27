import { useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { TextPrimary, TextSecondary, TextTertiary } from "./Typography/Text";
import Link from "next/link";
import AppContext from "context/AppContext";
import { whitespace } from "utils/whitespace";

const StyledFooter = styled.footer`
	margin-top: auto;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 32px 64px;
	border-top: 3px solid #2b72f0;

	& .aboutText {
		max-width: 480px;
	}

	& a {
		color: #fff;
	}

	@media screen and (max-width: 576px) {
		padding: 16px 32px;
	}
`;
const StyledTextSecondary = styled(TextSecondary)`
	font-family: OpenSansBold;
`;
export default function Footer() {
	const { siteData } = useContext(AppContext);

	useEffect(() => {
		console.log(siteData);
	}, []);

	const links = [
		{
			url: "/#about",
			text: "Tentang Kami",
		},
		{
			url: "/daftar-kelas",
			text: "Daftar Kelas",
		},
		{
			url: "/pertanyaan",
			text: "Pertanyaan",
		},
		{
			url: "/menjadi-member",
			text: "Menjadi Member",
		},
	];

	if (!siteData) return <></>;

	return (
		<StyledFooter className="bg-primary1 flex-column">
			<div className="d-flex">
				<Link href="/">
					<a>
						<Image
							width={"280px"}
							height={"40px"}
							src="/images/logo.svg"
							alt="logo"
						/>
					</a>
				</Link>
			</div>

			<div className="d-flex align-items-center flex-lg-row flex-column">
				<TextSecondary className="aboutText text-white mr-lg-none mr-auto mt-lg-none mt-3">
					{siteData.about}
				</TextSecondary>

				<div className="d-flex flex-column mx-lg-auto mr-auto mt-lg-none mt-3">
					{links.map((link) => (
						<div key={link.url} className="d-flex">
							<Image src={"/images/arrow.svg"} alt="arrow" />
							<Link key={link.url} href={link.url}>
								<a>
									<TextPrimary className="text-white mb-2 mt-1 ml-3">
										{link.text}
									</TextPrimary>
								</a>
							</Link>
						</div>
					))}
				</div>

				<div className="d-flex flex-column ml-lg-auto  mr-lg-0 mr-auto mt-md-none mt-3">
					<div className="d-flex">
						{siteData.instagram && !whitespace(siteData.instagram) && (
							<a
								href={`https://instagram.com/${siteData.instagram}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src={"/images/instagram_footer.svg"}
									alt="ig"
									height={"38px"}
									width={"38px"}
									className="mr-3"
								/>
							</a>
						)}
						{siteData.youtube && !whitespace(siteData.youtube) && (
							<a
								href={`${siteData.youtube}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src={"/images/youtube.svg"}
									alt="yt"
									height={"38px"}
									width={"38px"}
								/>
							</a>
						)}
					</div>

					<StyledTextSecondary className="text-white mt-2">
						Jangan ragu menghubungi kami!
					</StyledTextSecondary>
					{siteData.email && !whitespace(siteData.email) && (
						<div className="d-flex flex-column">
							<TextSecondary className="text-white mt-2">E-mail</TextSecondary>
							<TextTertiary className="text-white mt-1">
								<a href={`mailto:${`unbeliveable@gmail.com`}`}>
									{siteData.email}
								</a>
							</TextTertiary>
						</div>
					)}

					{siteData.whatsapp_number && !whitespace(siteData.whatsapp_number) && (
						<div className="d-flex flex-column mt-2">
							<TextSecondary className="text-white mt-2">
								WhatsApp
							</TextSecondary>
							<TextTertiary className="text-white mt-1">
								<a
									href={`https://api.whatsapp.com/send?phone=${siteData.whatsapp_number}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									{siteData.whatsapp_number}
								</a>
							</TextTertiary>
						</div>
					)}
				</div>
			</div>

			<TextTertiary className="text-white">
				Unbelievable {new Date().getFullYear()}
			</TextTertiary>
		</StyledFooter>
	);
}
