import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Headers/Header";
import SideMenu from "components/Headers/SideMenu";
import RoundedBtnIcon from "./Buttons/RoundedBtnIcon";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import SideBlock from "./SideItems/SideBlock";
import UpgradeBlock from "./SideItems/UpgradeBlock";
import AdBlock from "./SideItems/AdBlock";
import ReviewBlock from "./SideItems/ReviewBlock";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import Loading from "./Loading/Loading";
import { HeadingXXS } from "./Typography/Headings";
import { TextTertiary } from "./Typography/Text";
import { whitespace } from "utils/whitespace";

const FlyingButtonsContainer = styled.div`
	width: 0;
	display: flex;
	z-index: 100;
	left: 0;
	top: 0;
	height: 100vh;
	position: fixed;
	padding-top: 128px;
	padding-left: 48px;

	flex-direction: column;
	a {
		margin-bottom: 16px;
	}

	@media ${mediaBreakpoint.down.md} {
		padding-top: 96px;
		//right: 120px;
		flex-direction: column;
		padding-left: 18px;
		a {
			margin-bottom: 12px;
		}

		a:nth-child(1) {
			margin-right: 8px;
		}
	}
`;

const OuterContainer = styled.div`
	padding: 64px;
	width: 100%;
	padding-left: 32px;
	padding-right: 32px;
	display: flex;

	@media (max-width: 1024px) {
		width: 100%;
		overflow: auto;
	}

	@media (max-width: 767px) {
		padding: 16px;
	}
`;
const ReviewBlockContainer = styled.div`
	position: fixed;
	bottom: 48px;
	left: 32px;
	display: flex;
	height: 100%;
	justify-content: space-between;
	& > .responsiveSideBlock {
		display: none;
	}
	& a {
		color: inherit;
	}

	&:a {
		text-decoration: none;
	}
	@media (max-width: 1024px) {
		width: 100%;
		padding-right: 32px;
		height: auto;
		z-index: 10;
		bottom: 16px;
		left: 16px;
		& > .responsiveSideBlock {
			display: flex;
		}
		/*iPad Pro and below*/

		& .ad {
			display: none;
		}
	}
`;
const LayoutWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export default function Layout({
	title = "Unbelievable",
	keywords = "self development, lms",
	description = "Belajarlah setiap hari, jadilah unbelievable!",
	children,
	landingPage = false,
	withFB = false, // FB = FlyingButtons
	withMargin = false,
	showBurger = true,
	scrollToSolid = false,
	background = "transparent",
	mainApp = false,
	showLogout = false,
	showReviewBlock = true,
	backBtn,
	userPaid = false,
	siteData = null,
	backTo,
}) {
	const { user, loading } = useContext(AuthContext);
	const { setWishlistModalOpen } = useContext(CourseContext);
	const router = useRouter();
	// mainApp is when layout has the floating side menu...

	if (!mainApp && user && user.onboarded && !showBurger) backBtn = true;

	if (mainApp) {
		showBurger = false;
	} else if (!user) {
		showBurger = true;
	}

	if (loading) {
		return <Loading />;
	}
	return (
		<LayoutWrapper>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="og:title" content={title} key="ogtitle" />
				<meta name="og:description" content={description} key="ogdesc" />
			</Head>
			{!loading && (
				<Header
					showLogout={showLogout}
					showBurger={showBurger}
					scrollToSolid={scrollToSolid}
					landingPage={landingPage}
					background={background}
					mainApp={mainApp}
					backBtn={backBtn}
					backTo={backTo}
				/>
			)}

			{withFB && (
				<FlyingButtonsContainer>
					<Link href="#hero">
						<a>
							<RoundedBtnIcon className="shadow" img={`/images/home.png`} />
						</a>
					</Link>
					<Link href={user ? `/dashboard` : `/daftar`}>
						<a>
							<RoundedBtnIcon className="shadow" img={`/images/smiley.png`} />
						</a>
					</Link>
				</FlyingButtonsContainer>
			)}
			<div
				className={`${mainApp && `d-flex position-relative`}`}
				style={{ marginTop: withMargin ? `112px` : `0`, overflowX: "hidden" }}
			>
				{mainApp && <SideMenu />}
				{mainApp && showReviewBlock && (
					<ReviewBlockContainer>
						<div className="d-flex flex-lg-column flex-lg-col-reverse">
							{!userPaid && user && router.pathname === "/dashboard" && (
								<Link href="/menjadi-member">
									<a className="my-auto">
										<UpgradeBlock
											className="mr-2 "
											small
											content={
												<>
													<TextTertiary>status akun:</TextTertiary>{" "}
													<HeadingXXS>free account.</HeadingXXS>
													<HeadingXXS className="mt-2">upgrade</HeadingXXS>
													<TextTertiary>
														untuk akses lebih maksimal!
													</TextTertiary>
												</>
											}
										/>
									</a>
								</Link>
							)}
							<ReviewBlock className="mt-0 mt-lg-auto" />
							{siteData && siteData.ad_picture && (
								<a
									href={
										siteData.ad_url && !whitespace(siteData.ad_url)
											? siteData.ad_url
											: "#"
									}
									target={
										siteData.ad_url && !whitespace(siteData.ad_url) && "_blank"
									}
									rel="noreferrer"
									className="ad"
								>
									<AdBlock className="mt-2" url={siteData.ad_picture.url} />
								</a>
							)}
						</div>

						<div className="responsiveSideBlock">
							{router.pathname === "/dashboard" && (
								<>
									<SideBlock
										onClick={() => setWishlistModalOpen(true)}
										className="mr-2"
										content={<FaHeart style={{ fontSize: "24px" }} />}
									/>
								</>
							)}
						</div>
					</ReviewBlockContainer>
				)}
				{mainApp ? (
					<OuterContainer>{children}</OuterContainer>
				) : (
					<>{children}</>
				)}
			</div>
			<Footer />
		</LayoutWrapper>
	);
}
