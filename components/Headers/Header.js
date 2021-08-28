import { useEffect, useState, useContext } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { mediaBreakpoint } from "utils/breakpoints";
import { HiMenuAlt4 } from "react-icons/hi";
import { TextPrimary, TextTertiary } from "components/Typography/Text";
import { HeadingXXS } from "components/Typography/Headings";
import { MdChevronLeft } from "react-icons/md";

const StyledContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	transition: 0.35s;
	z-index: 101;
	display: flex;
	padding: 32px 48px;
	flex-direction: column;
	background: ${(props) => props.background};

	&.purple {
		background: #171b2d;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 16px;
	}
`;

const HamburgerIcon = styled(HiMenuAlt4)`
	font-size: 48px;
	color: #fff;

	&:hover {
		cursor: pointer;
	}
`;

const SpecialHamburger = styled(HamburgerIcon)`
	display: none;

	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		display: block;
	}
`;

const StyledTextPrimary = styled(TextPrimary)`
	font-size: 21px;
	padding-bottom: 8px;
	${(props) => props.active && `border-bottom: 2px solid black;`}
`;

const MenuContainer = styled.div`
    height: 100vh;
    top: 0;
    left: -370px;
    position: absolute;
	min-width: 370px;
	z-index: 2;
	transition: 0.35s;

	background:#fff;
	&.show{
		left: 0;
	}

	@media ${mediaBreakpoint.down.md} {
		min-width: 80vw;
		left: -80vw;
	}
	padding: 32px;
    padding-right: 0;
	a{
		margin-bottom: 30px;
		color: #171B2D;
		text-decoration:none;
	}

	.hamburger{
		color: #171B2D;
		margin-bottom: 52px;
	}
}
`;

const Overlay = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 2;

	background: #000000b0;
`;
const ProfileImage = styled(Image)`
	&:hover {
		cursor: pointer;
	}
`;
const Logo = styled(Image)`
	width: 290px;
	height: 31px;
	position: absolute;
	left: ${(props) => (props.showburger || props.backbtn ? `50%;` : `48px;`)}
	${(props) =>
		(props.showburger || props.backbtn) && `transform: translateX(-50%);`}

	&:hover {
		cursor: pointer;
	}
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		left: 50%;
		transform: translateX(-50%);
	}

	@media ${mediaBreakpoint.down.lg} {
		margin-left: 0;
			
	}
	@media ${mediaBreakpoint.down.md} {
		height: 22.8px;
		width: 210px;
	
	}
`;
const Back = styled(MdChevronLeft)`
	font-size: 48px;
	color: #fff;
`;

const LogoutContainer = styled.div`
	background: #5f6475;
	padding: 16px 24px;

	border-radius: 8px;
	margin-left: 16px;
	@media ${mediaBreakpoint.down.md} {
		padding: 0;
		background: transparent;
	}
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
export default function Header({
	landingPage,
	background,
	user = null,
	showBurger,
	scrollToSolid,
	mainApp,
	showLogout,
	backBtn,
}) {
	const router = useRouter();
	const [navbarClass, setNavbarClass] = useState("");
	const [menuShown, setMenuShown] = useState("");
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		if (landingPage && window) {
			window.addEventListener("scroll", handleScroll);
		}

		if (scrollToSolid && window) {
			window.addEventListener("scroll", handleScroll2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleScroll = () => {
		if (document.querySelector("#hero")) {
			const heroHeight = document.querySelector("#hero").clientHeight;
			if (typeof window !== undefined) {
				if (window.pageYOffset < 10) {
					setNavbarClass("");
				} else {
					if (
						(window.pageYOffset >= heroHeight - 736 &&
							window.pageYOffset <= heroHeight) ||
						window.pageYOffset > heroHeight
					) {
						setNavbarClass("purple");
					} else {
						setNavbarClass("");
					}
				}
			}
		}
	};

	const handleScroll2 = () => {
		if (typeof window !== undefined) {
			if (window.pageYOffset < 10) {
				setNavbarClass("");
			} else {
				if (window.pageYOffset >= parseInt(112 + 32) - 120) {
					setNavbarClass("purple");
				} else {
					setNavbarClass("");
				}
			}
		}
	};

	const handleClickLogo = () => {
		router.push("/");
	};
	const handleClickBack = () => {
		router.push("/dashboard");
	};
	const handleClickMenu = () => {
		if (menuShown === "") {
			setMenuShown("show");
		} else {
			setMenuShown("");
		}
	};

	const mainAppLinks = [
		{
			url: "/dashboard",
			text: "dashboard",
		},
		{
			url: "/profil",
			text: "profil",
		},
		{
			url: "/daftar-kelas",
			text: "kelas",
		},
		{
			url: "/pertanyaan",
			text: "pertanyaan",
		},
	];

	return (
		<StyledContainer
			background={background}
			landingpage={landingPage}
			className={`${navbarClass} ${navbarClass !== "" && `shadow-lg`}`}
		>
			{menuShown === "show" && <Overlay onClick={handleClickMenu} />}
			<MenuContainer className={menuShown}>
				<div className="d-flex flex-column align-items-start">
					<HamburgerIcon className="hamburger" onClick={handleClickMenu} />

					{mainApp ? (
						<>
							{mainAppLinks.map((r, ix) => (
								<Link key={ix} href={r.url}>
									<a>
										<StyledTextPrimary
											active={
												r.url === router.pathname ||
												router.pathname.includes(r.url)
											}
											className="text-black text-capitalize"
										>
											{r.text}
										</StyledTextPrimary>
									</a>
								</Link>
							))}
						</>
					) : (
						<>
							<Link href="/#hero">
								<a onClick={handleClickMenu}>
									<StyledTextPrimary
										active={router.asPath === "/" || router.asPath === "/#hero"}
									>
										Home
									</StyledTextPrimary>
								</a>
							</Link>
							<Link href="/#about">
								<a onClick={handleClickMenu}>
									<StyledTextPrimary active={router.asPath === "/#about"}>
										Tentang Kami
									</StyledTextPrimary>
								</a>
							</Link>
							<Link href="/daftar-kelas">
								<a onClick={handleClickMenu}>
									<StyledTextPrimary
										active={router.pathname === "/daftar-kelas"}
									>
										Daftar Kelas
									</StyledTextPrimary>
								</a>
							</Link>
							<Link href="/menjadi-member">
								<a onClick={handleClickMenu}>
									<StyledTextPrimary
										active={router.pathname === "/menjadi-member"}
									>
										Menjadi Member
									</StyledTextPrimary>
								</a>
							</Link>
							<Link href="/pertanyaan">
								<a onClick={handleClickMenu}>
									<StyledTextPrimary active={router.pathname === "/pertanyaan"}>
										Pertanyaan
									</StyledTextPrimary>
								</a>
							</Link>
						</>
					)}
				</div>
			</MenuContainer>
			<div className="d-flex align-items-center">
				{!backBtn ? (
					<HamburgerIcon
						className={`${!showBurger && `d-none`}`}
						onClick={handleClickMenu}
					/>
				) : (
					<Back role="button" onClick={handleClickBack} />
				)}
				{mainApp && <SpecialHamburger onClick={handleClickMenu} />}
				<Logo
					className={`logo`}
					mainapp={mainApp ? 1 : 0}
					showburger={showBurger ? 1 : 0}
					backbtn={backBtn ? 1 : 0}
					user={user ? 1 : 0}
					onClick={handleClickLogo}
					src="/images/logo.png"
					alt="logo"
				/>
				<div className="ml-auto d-flex align-items-center">
					{window && !user && (
						<ProfileImage
							onClick={() => {
								router.push("/masuk");
							}}
							src={`${window.location.origin}/images/profile.png`}
							alt="Profile"
							width={43}
							height={43}
						/>
					)}
					{window && user && !showLogout && (
						<ProfileImage
							onClick={() => {
								if (user) {
									router.push("/dashboard");
								} else {
									router.push("/masuk");
								}
							}}
							src={`${window.location.origin}/images/profile-main.png`}
							alt="Profile"
							width={24}
							height={24}
						/>
					)}
					{showLogout ? (
						<LogoutContainer className="d-flex ml-4 flex-column align-items-lg-end align-items-center">
							<div className="d-flex mb-1 align-items-center">
								<ProfileImage
									onClick={() => {
										if (user) {
											router.push("/dashboard");
										} else {
											router.push("/masuk");
										}
									}}
									src={`${window.location.origin}/images/profile-main.png`}
									alt="Profile"
									width={24}
									height={24}
								/>
								<HeadingXXS
									as="p"
									className="ml-2 text-white d-lg-block d-none "
								>
									{user && `${user.first_name} ${user.last_name}`}
								</HeadingXXS>
							</div>
							<Link href="#">
								<a onClick={logout} className="ml-auto">
									<StyledTextTertiary className="text-white ">
										Log out
									</StyledTextTertiary>
								</a>
							</Link>
						</LogoutContainer>
					) : (
						<>
							<HeadingXXS
								as="p"
								className="text-white ml-2 d-lg-block d-none mb-1"
							>
								{user && `${user.first_name} ${user.last_name}`}
							</HeadingXXS>
						</>
					)}
				</div>
			</div>
		</StyledContainer>
	);
}
