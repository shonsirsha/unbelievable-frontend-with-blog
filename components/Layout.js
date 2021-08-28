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
import SideBlock from "./SideItems/SideBlock";
import ReviewBlock from "./SideItems/ReviewBlock";
import { FaHeart } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { useRouter } from "next/router";
import Loading from "./Loading/Loading";
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
		padding-right: 48px;
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
	justify-content: space-between;
	& > .responsiveSideBlock {
		display: none;
	}
	@media (max-width: 1024px) {
		width: 100%;
		padding-right: 32px;
		z-index: 10;
		bottom: 16px;
		left: 16px;
		& > .responsiveSideBlock {
			display: flex;
		}
		/*iPad Pro and below*/
	}
`;
const LayoutWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export default function Layout({
	title = "Unbelieveable",
	keywords = "self development, lms",
	description = "Belajarlah setiap hari, jadilah unbelieveable!",
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
}) {
	let backBtn = false;

	const { user, loading } = useContext(AuthContext);
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
			</Head>
			{!loading && (
				<Header
					showLogout={showLogout}
					showBurger={showBurger}
					scrollToSolid={scrollToSolid}
					landingPage={landingPage}
					background={background}
					user={user}
					mainApp={mainApp}
					backBtn={backBtn}
				/>
			)}

			{withFB && (
				<FlyingButtonsContainer>
					<Link href="#hero">
						<a>
							<RoundedBtnIcon className="shadow" img={`/images/home.png`} />
						</a>
					</Link>
					<Link href="/">
						<a>
							<RoundedBtnIcon className="shadow" img={`/images/smiley.png`} />
						</a>
					</Link>
				</FlyingButtonsContainer>
			)}
			<div
				className={`${mainApp && `d-flex position-relative`}`}
				style={{ marginTop: withMargin ? `112px` : `0` }}
			>
				{mainApp && <SideMenu />}
				{mainApp && showReviewBlock && (
					<ReviewBlockContainer>
						<ReviewBlock />
						<div className="responsiveSideBlock">
							{router.pathname === "/dashboard" && (
								<>
									<SideBlock
										className="mr-2"
										content={<FaHeart style={{ fontSize: "24px" }} />}
									/>
									<SideBlock
										content={<BiTask style={{ fontSize: "24px" }} />}
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
