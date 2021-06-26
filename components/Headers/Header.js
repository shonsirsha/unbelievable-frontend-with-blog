import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { mediaBreakpoint } from "utils/breakpoints";
import { HiMenuAlt4 } from "react-icons/hi";
const StyledContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	transition: 0.35s;
	z-index: 89;
	display: flex;
	padding: 48px 48px;
	flex-direction: column;
	.logo {
		width: 290px;
		height: 31px;
	}

	&.purple {
		background: #171b2d;
	}

	.logo:hover {
		cursor: pointer;
	}

	@media ${mediaBreakpoint.down.md} {
		.logo {
			height: 22.8px;
			margin-top: 16px;

			width: 210px;
		}
		padding-top: 8px;
		padding-bottom: 24px;
	}
`;

const HamburgerIcon = styled(HiMenuAlt4)`
	font-size: 48px;
	color: #fff;

	&:hover {
		cursor: pointer;
	}
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

export default function Header() {
	const router = useRouter();
	const [navbarClass, setNavbarClass] = useState("");
	const [menuShown, setMenuShown] = useState("");
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
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
	};
	const goHome = () => {
		router.push("/");
	};
	const handleClickMenu = () => {
		if (menuShown === "") {
			setMenuShown("show");
		} else {
			setMenuShown("");
		}
	};
	return (
		<StyledContainer className={navbarClass}>
			{menuShown === "show" && <Overlay onClick={handleClickMenu} />}
			<MenuContainer className={menuShown}></MenuContainer>
			<div className="d-flex justify-content-between align-items-center">
				<HamburgerIcon onClick={handleClickMenu} />
				<Image
					className="logo"
					onClick={goHome}
					src="/images/logo.png"
					alt="logo"
				/>
				<Image src="images/profile.png" alt="Profile" />
			</div>
		</StyledContainer>
	);
}
