import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
const StyledContainer = styled.div`
	position: fixed;
	top: 0;
	padding-top: 24px;
	width: 100%;
	transition: 0.35s;
	z-index: 5;
	display: flex;
	padding-bottom: 48px;
	flex-direction: column;
	img {
		margin-top: 24px;
		width: 290px;
	}
	&:hover {
		cursor: pointer;
	}

	&.purple {
		background: #171b2d;
	}
`;

// const StyledLink = styled.a`
// 	margin: 0 32px;
// 	transition: 0.45s;

// 	&:hover {
// 		text-decoration: none;
// 	}

// 	&.hide {
// 		color: transparent !important;
// 	}
// `;

export default function Header() {
	const router = useRouter();
	const [navbarClass, setNavbarClass] = useState("");
	// const [showMenuLinks, setShowMenuLinks] = useState(true);
	// const [menuLinkClass, setMenuLinksClass] = useState("");
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		const heroHeight = document.querySelector("#hero").clientHeight;
		if (typeof window !== undefined) {
			if (
				(window.pageYOffset >= heroHeight - 736 &&
					window.pageYOffset <= heroHeight) ||
				window.pageYOffset > heroHeight
			) {
				setNavbarClass("purple");
			} else {
				setNavbarClass("");
			}

			if (window.pageYOffset > heroHeight - 183) {
				// setMenuLinksClass("hide");
				// setTimeout(() => {
				// 	setShowMenuLinks(false);
				// }, 300);
			} else {
				// setMenuLinksClass("");
			}
		}
	};
	const goHome = () => {
		router.push("/");
	};
	return (
		<StyledContainer className={navbarClass}>
			<div className="d-flex justify-content-center">
				<Image onClick={goHome} src="/images/logo.png" alt="logo" />
			</div>
			{/* {showMenuLinks && (
				<div className="d-none mt-5 d-lg-flex justify-content-center">
					<div className="mt-3 d-flex">
						<Link href="/">
							<StyledLink className={`text-white ${menuLinkClass}`}>
								Daftar Kelas
							</StyledLink>
						</Link>
						<Link href="/">
							<StyledLink className={`text-white ${menuLinkClass}`}>
								Daftar Kelas
							</StyledLink>
						</Link>{" "}
						<Link href="/">
							<StyledLink className={`text-white ${menuLinkClass}`}>
								Daftar Kelas
							</StyledLink>
						</Link>{" "}
						<Link href="/">
							<StyledLink className={`text-white ${menuLinkClass}`}>
								Daftar Kelas
							</StyledLink>
						</Link>
					</div>
				</div>
			)} */}
		</StyledContainer>
	);
}
