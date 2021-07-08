import { HeadingXXS } from "components/Typography/Headings";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
const OuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 0 64px;
	margin-right: auto;
`;
const StyledHeadingXXS = styled(HeadingXXS)`
	font-family: MontserratRegular;
	font-size: 19px;
	padding-bottom: 8px;
	padding-top: 15px;
	${(props) => props.active && `border-bottom: 2px solid #171B2D;`}
	color: ${(props) => (props.active ? `#171B2D;` : `#8E8F91;`)}
    transition: 0.2s;
	&:hover {
		cursor: pointer;
		text-decoration: none;
		color: #171b2d;
	}
`;
export default function SideMenu() {
	const router = useRouter();
	const routes = [
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
		<OuterContainer>
			{routes.map((r) => (
				<Link href={r.url}>
					<StyledHeadingXXS
						active={r.url === router.pathname}
						className="text-black"
						as="a"
					>
						{r.text}
					</StyledHeadingXXS>
				</Link>
			))}
		</OuterContainer>
	);
}
