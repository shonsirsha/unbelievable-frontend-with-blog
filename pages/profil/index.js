import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import { parseCookies } from "utils/cookies";
import { HeadingXL, HeadingMD } from "components/Typography/Headings";
import { TextTertiary, TextPrimary } from "components/Typography/Text";
import { Image } from "react-bootstrap";
import { FaVideo } from "react-icons/fa";
import { MdEdit, MdFeedback, MdSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { API_URL, MUX_READY } from "config";
import { profileDisplay } from "utils/secsToMin";

const OptionButton = styled.div`
	background: #f6f6f6;
	padding: 16px 24px;
	border-radius: 8px;
	margin-left: 8px;
	margin-top: 16px;
	width: 100%;
	border: none;
	margin-right: 8px;

	svg {
		font-size: 28px;
		margin-top: 4px;
	}

	@media ${mediaBreakpoint.down.lg} {
		margin-right: 0;
	}
`;

const ButtonsContainer = styled.div`
	margin-left: -24px;
	margin-top: 32px;

	a {
		width: 50%;
		padding-right: -16px;
		padding-left: 16px;
	}

	a {
		color: inherit;
	}
	a:hover {
		text-decoration: none;
	}

	@media ${mediaBreakpoint.down.lg} {
		a {
			width: 100%;
			margin-left: 0;
		}
	}
`;

const Profil = ({
	courseCount,
	courses,
	totalDurationWatched,
	noToken = false,
}) => {
	const { user, userLoading, checkUserLoggedIn, logout } =
		useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (noToken) {
			checkUserLoggedIn();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noToken]);

	useEffect(() => {
		if (noToken && user && !userLoading) {
			router.reload();
		} else if (!user && !userLoading) {
			router.push("/masuk");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLoading]);

	if (noToken) {
		return <></>;
	}
	return (
		<Layout
			title="Profil | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
		>
			<div className="d-flex flex-column w-100">
				<div className="d-flex flex-md-row flex-column w-100 align-items-center ">
					<HeadingXL as="p" className="text-primary1 text-md-left text-center">
						Halo,
						<br />
						{user && user.first_name}!
					</HeadingXL>
					<Image
						src="/images/green.png"
						alt="Character"
						className="mx-md-5 mx-0"
						width={167}
						height={147}
					/>
					<div className="d-flex flex-column align-items-center mr-md-5 mr-0 mt-md-0 mt-4">
						<HeadingMD as="p" className="text-primary1">
							{courseCount}
						</HeadingMD>
						<TextTertiary className="text-primary1 text-center">
							Kelas Berjalan
						</TextTertiary>
					</div>
					<div className="d-flex flex-column align-items-center mt-md-0 mt-4">
						<HeadingMD as="p" className="text-primary1">
							{MUX_READY ? profileDisplay(totalDurationWatched) : "-"}
						</HeadingMD>
						<TextTertiary className="text-primary1 text-center">
							Total <br />
							Waktu Belajar
						</TextTertiary>
					</div>
				</div>
				<ButtonsContainer className="d-flex flex-wrap">
					<Link href="/profil/edit">
						<a className="d-flex">
							<OptionButton
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<MdEdit className="mr-0 mr-md-4" />
								<TextPrimary className="text-primary1">Edit Profil</TextPrimary>
							</OptionButton>
						</a>
					</Link>
					<Link href="/profil/komitmen">
						<a className="d-flex">
							<OptionButton
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<IoDocumentText className="mr-0 mr-md-4" />
								<TextPrimary className="text-primary1">
									lihat komitmen saya
								</TextPrimary>
							</OptionButton>
						</a>
					</Link>

					<Link href="/profil/feedback">
						<a className="d-flex">
							<OptionButton
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<MdFeedback className="mr-0 mr-md-4" />
								<TextPrimary className="text-primary1">
									Tulis Masukkan
								</TextPrimary>
							</OptionButton>
						</a>
					</Link>

					<Link href="/profil/video-tutorial">
						<a className="d-flex">
							<OptionButton
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<FaVideo className="mr-0 mr-md-4" />
								<TextPrimary className="text-primary1">
									Lihat Video Tutorial
								</TextPrimary>
							</OptionButton>
						</a>
					</Link>

					<Link href="/profil/pengaturan">
						<a className="d-flex">
							<OptionButton
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<MdSettings className="mr-0 mr-md-4" />
								<TextPrimary className="text-primary1">
									Pengaturan Umum
								</TextPrimary>
							</OptionButton>
						</a>
					</Link>
					<Link href="#">
						<a className="d-flex">
							<OptionButton
								onClick={logout}
								as="button"
								className="d-flex flex-md-row flex-column align-items-center shadow-sm"
							>
								<FiLogOut className="mr-0 mr-md-4" />

								<TextPrimary className="text-primary1">Log Out</TextPrimary>
							</OptionButton>
						</a>
					</Link>
				</ButtonsContainer>
			</div>
		</Layout>
	);
};
export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);

	if (!token) {
		// return {
		// 	redirect: {
		// 		permanent: false,
		// 		destination: "/masuk",
		// 	},
		// 	props: {},
		// };

		return {
			props: {
				noToken: true,
			},
		};
	}

	const res = await fetch(`${API_URL}/courses-taken`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const courses = await res.json();
	let all_videos_finished_duration_seconds = 0;
	if (courses.length > 0) {
		all_videos_finished_duration_seconds =
			courses.length > 1
				? courses.reduce(
						(acc, b) => acc + b.all_videos_finished_duration_seconds,
						0
				  )
				: courses[0].all_videos_finished_duration_seconds;
	}

	return {
		props: {
			courseCount: courses.length,
			courses,
			totalDurationWatched:
				courses.length > 0 ? all_videos_finished_duration_seconds : 0,
		},
	};
}
export default Profil;
