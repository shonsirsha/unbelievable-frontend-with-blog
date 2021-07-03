import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { mediaBreakpoint } from "utils/breakpoints";
import { HiMenuAlt4 } from "react-icons/hi";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXS } from "components/Typography/Headings";
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

const StyledTextPrimary = styled(TextPrimary)`
	font-size: 21px;
`;

const MenuContainer = styled.div`
    height: 100vh;
    top: 0;
    left: -370px;
    position: absolute;
	min-width: 370px;
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
	${(props) => props.user && props.landing && `margin-left: 156px`};
	&:hover {
		cursor: pointer;
	}
	@media ${mediaBreakpoint.down.lg} {
		margin-left: 0;
	}
	@media ${mediaBreakpoint.down.md} {
		height: 22.8px;
		width: 210px;
	}
`;
export default function Header({
	landingPage,
	background,
	user = null,
	scrollToSolid,
}) {
	const router = useRouter();
	const [navbarClass, setNavbarClass] = useState("");
	const [menuShown, setMenuShown] = useState("");
	useEffect(() => {
		if (landingPage) {
			window.addEventListener("scroll", handleScroll);
		}

		if (scrollToSolid) {
			window.addEventListener("scroll", handleScroll2);
		}
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
		if (user) {
			router.push("/dashboard");
		} else {
			router.push("/");
		}
	};
	const handleClickMenu = () => {
		if (menuShown === "") {
			setMenuShown("show");
		} else {
			setMenuShown("");
		}
	};
	return (
		<StyledContainer
			background={background}
			landingpage={landingPage}
			className={`${navbarClass} ${navbarClass !== "" && `shadow-lg`}`}
		>
			{menuShown === "show" && <Overlay onClick={handleClickMenu} />}
			<MenuContainer className={menuShown}>
				<div className="d-flex flex-column">
					<HamburgerIcon className="hamburger" onClick={handleClickMenu} />

					<Link href="/">
						<a onClick={handleClickMenu}>
							<StyledTextPrimary>Home</StyledTextPrimary>
						</a>
					</Link>
					<Link href="/#about">
						<a onClick={handleClickMenu}>
							<StyledTextPrimary>Tentang Kami</StyledTextPrimary>
						</a>
					</Link>
					<Link href="/">
						<a onClick={handleClickMenu}>
							<StyledTextPrimary>Daftar Kelas</StyledTextPrimary>
						</a>
					</Link>
					<Link href="/">
						<a onClick={handleClickMenu}>
							<StyledTextPrimary>Menjadi Member</StyledTextPrimary>
						</a>
					</Link>
					<Link href="/">
						<a onClick={handleClickMenu}>
							<StyledTextPrimary>Pertanyaan</StyledTextPrimary>
						</a>
					</Link>
				</div>
			</MenuContainer>
			<div className="d-flex justify-content-between align-items-center">
				{landingPage && <HamburgerIcon onClick={handleClickMenu} />}

				<Logo
					className={`logo`}
					landing={landingPage}
					user={user ? true : false}
					onClick={handleClickLogo}
					src="/images/logo.png"
					alt="logo"
				/>
				<div className="d-flex align-items-center">
					<ProfileImage
						onClick={() => {
							if (user) {
								router.push("/dashboard");
							} else {
								router.push("/masuk");
							}
						}}
						src="images/profile.png"
						alt="Profile"
						width={43}
						height={43}
					/>
					<HeadingXXS as="p" className="text-white ml-3 d-lg-block d-none">
						{user && `${user.first_name} ${user.last_name}`}
					</HeadingXXS>
				</div>
			</div>
		</StyledContainer>
	);
}
