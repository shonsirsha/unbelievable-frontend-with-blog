import { useContext, useState, useEffect } from "react";
import { parseCookies } from "utils/cookies";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import { API_URL } from "config/index";
import {
	HeadingXS,
	HeadingLG,
	HeadingXXS,
} from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import Layout from "components/Layout";
import Onboarding from "components/Onboarding/Onboarding";
import EnrolledCourseCard from "components/Course/EnrolledCourseCard";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import SideBlock from "components/SideItems/SideBlock";
import styled from "styled-components";
import PreviewModal from "components/Course/PreviewModal";
import BuyModal from "components/Course/BuyModal";
import Wishlist from "components/Wishlist/Wishlist";
import WishlistModal from "components/Wishlist/WishlistModal";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const StyledDefault = styled(DefaultCourseCard)`
	margin-right: 16px;
	margin-bottom: 16px;
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 215px;

		&:last-child {
			margin-right: 0;
		}
	}
`;
const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;

	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		display: none;
	}
`;

const ComponentsContainer = styled.div`
	bottom: 48px;
	right: 16px;
`;
const StyledHeadingLG = styled(HeadingLG)`
	font-size: 52px;
`;

const StyledHeadingXS = styled(HeadingXS)`
	font-size: 21px;
`;

const StyledEnrolled = styled(EnrolledCourseCard)`
	margin-right: 24px;
	margin-bottom: 24px;

	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 280px;

		&:last-child {
			margin-right: 0;
		}
	}
`;

const StyledFormGroup = styled(FormGroup)`
	position: absolute;
	top: 40%;
	padding: 0 32px;
	width: 100%;
`;

const StyledFormControl = styled(FormControl)`
	border: none;
	border-radius: 16px;
	padding: 16px;
	background: #f4f4f7;
	margin: 0 !important;
	transition: 0.5s;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f4f4f7 inset !important;
	}

	&:focus {
		background: #e8e8e8;
		outline: none;
	}
`;

const DOBWrapper = styled.div`
	display: flex;
	padding: 24px;
	background: #fff;
	border-radius: 16px;
	flex-direction: column;
	max-width: 640px;
	margin-left: auto;
	margin-right: auto;
`;

const StyledSubmitBtn = styled(Button)`
	margin-top: 16px;
	width: 100%;
	border-radius: 18px;
`;

const Index = ({ token, onboardings, user, courses, coursesTaken }) => {
	const router = useRouter();

	const { logout, checkUserLoggedIn, getToken } = useContext(AuthContext);
	const {
		previewModalOpen,
		setPreviewModalOpen,
		buyModalOpen,
		setBuyModalOpen,
		wishlistModalOpen,
		setWishlistModalOpen,
	} = useContext(CourseContext);

	// console.log(coursesTaken);
	// console.log(user.wishlist);

	const [allCourses] = useState(courses);
	const [dob, setDob] = useState(null);

	const handleFinishOnboarding = async () => {
		const res = await fetch(`${API_URL}/users/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ onboarded: true }),
		});
		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
				return;
			}
			toast.error("Terjadi Kesalahan Mohon Coba Lagi");
		} else {
			router.push("/dashboard");
		}
	};

	useEffect(() => {
		setWishlistModalOpen(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (router.query.r == "1") {
			checkUserLoggedIn();
			getToken();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user.dob) {
		const datex = new Date();
		const today = `${datex.getFullYear()}-${
			datex.getMonth() + 1 < 10
				? `0${datex.getMonth() + 1}`
				: datex.getMonth() + 1
		}-${datex.getDate() < 10 ? `0${datex.getDate()}` : datex.getDate()}`;

		return (
			<Layout title="Dashboard | Unbelieveable" background="#171b2d" withMargin>
				<StyledFormGroup>
					<DOBWrapper className="shadow">
						<HeadingXXS as="p" className="mb-2">
							Selesaikan Pendaftaran
						</HeadingXXS>
						<TextTertiary className="mb-3">
							Mohon masukkan tanggal lahir untuk menyelesaikan pendaftaran
						</TextTertiary>
						<div className="d-flex flex-column">
							<StyledFormControl
								type="date"
								name="dob"
								className="mr-xl-2 mb-3 shadow-none"
								onChange={(e) => {
									setDob(e.target.value);
								}}
								value={dob}
								min="1950-01-01"
								max={today}
								placeholder="Date"
							/>
							<StyledSubmitBtn
								type="submit"
								onSubmit={(e) => {
									console.log(e.target.value);
								}}
							>
								Simpan
							</StyledSubmitBtn>
						</div>
					</DOBWrapper>
				</StyledFormGroup>
			</Layout>
		);
	}

	if (!user.onboarded) {
		return (
			<>
				<Onboarding
					handleFinishOnboarding={handleFinishOnboarding}
					user={user}
					onboardings={onboardings}
				/>
				<button onClick={() => logout()}>logout</button>
			</>
		);
	}

	return (
		<Layout
			title="Dashboard | Unbelieveable"
			background="#171b2d"
			withMargin
			mainApp
		>
			<ToastContainer />

			<PreviewModal
				show={previewModalOpen}
				onHide={() => setPreviewModalOpen(false)}
			/>

			<BuyModal show={buyModalOpen} onHide={() => setBuyModalOpen(false)} />
			<WishlistModal
				show={wishlistModalOpen}
				onHide={() => setWishlistModalOpen(false)}
			/>

			<div className="d-flex w-100 flex-column">
				<HeadingXS className="text-gray mb-2">
					selamat datang kembali,
				</HeadingXS>
				<StyledHeadingLG className="text-primary1 mb-5">
					heroes!
				</StyledHeadingLG>
				<div className="d-flex flex-column">
					<StyledHeadingXS className="mb-2 ml-1">kelas populer</StyledHeadingXS>
					{user.token && (
						<div className="d-flex flex-lg-wrap flex-nowrap w-100 overflow-lg-none overflow-auto ">
							{allCourses.map((course) => (
								<StyledDefault
									key={course.id}
									small
									user={user}
									course={course}
								/>
							))}
						</div>
					)}
				</div>

				<div className="d-flex flex-column mt-4">
					<StyledHeadingXS className="mb-2 ml-1 ">kelas saya</StyledHeadingXS>
					<div className="d-flex flex-lg-wrap flex-nowrap w-100 overflow-lg-none overflow-auto pb-2">
						{coursesTaken.map((course) => (
							<>
								{course.videos.length > 0 && (
									<StyledEnrolled user={user} key={course.id} course={course} />
								)}
							</>
						))}
					</div>
				</div>
			</div>

			<RightContainer>
				<ComponentsContainer className="position-fixed">
					<SideBlock
						content={<Wishlist />}
						// content={wishlistCourses.map((c) => (
						// 	<>{c.course.title}</>
						// ))}
						className="mb-3"
					/>
					<SideBlock
						content={"Mission Box (Work in progress..)"}
						className="mb-3"
					/>
				</ComponentsContainer>
			</RightContainer>
		</Layout>
	);
};

export async function getServerSideProps({ req, _ }) {
	const { token } = parseCookies(req);

	if (token === undefined) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	} else {
		const res = await fetch(`${API_URL}/onboardings`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res2 = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res3 = await fetch(`${API_URL}/courses-not-taken`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res4 = await fetch(`${API_URL}/courses-taken`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const onboardings = await res.json();
		let user = await res2.json();
		user.token = token;
		const courses = await res3.json();
		const coursesTaken = await res4.json();
		console.log(user);
		return {
			props: {
				onboardings,
				token,
				user,
				courses,
				coursesTaken,
			},
		};
	}
}

export default Index;
