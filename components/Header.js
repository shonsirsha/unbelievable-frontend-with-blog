import { Image } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
const StyledContainer = styled.div`
	position: absolute;
	padding-top: 32px;
	width: 100%;
	z-index: 5;
	display: flex;
	flex-direction: column;
	img {
		margin-top: 32px;
		width: 320px;
	}
	&:hover {
		cursor: pointer;
	}
`;

const StyledLink = styled.a`
	margin: 0 32px;

	&:hover {
		text-decoration: none;
	}
`;

export default function Header() {
	const router = useRouter();
	const goHome = () => {
		router.push("/");
	};
	return (
		<StyledContainer>
			<div className="d-flex justify-content-center">
				<Image onClick={goHome} src="/images/logo.png" alt="logo" />
			</div>

			<div className="d-none mt-5 d-lg-flex justify-content-center">
				<div className="mt-3 d-flex">
					<Link href="/">
						<StyledLink className="text-white">Daftar Kelas</StyledLink>
					</Link>
					<Link href="/">
						<StyledLink className="text-white">Daftar Kelas</StyledLink>
					</Link>{" "}
					<Link href="/">
						<StyledLink className="text-white">Daftar Kelas</StyledLink>
					</Link>{" "}
					<Link href="/">
						<StyledLink className="text-white">Daftar Kelas</StyledLink>
					</Link>
				</div>
			</div>
		</StyledContainer>
	);
}
