import { useContext, useState } from "react";
import { parseCookies } from "utils/cookies";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import { API_URL } from "config/index";
import { HeadingXS, HeadingLG } from "components/Typography/Headings";
import Layout from "components/Layout";
import Onboarding from "components/Onboarding/Onboarding";
import EnrolledCourseCard from "components/Course/EnrolledCourseCard";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import SideBlock from "components/SideItems/SideBlock";
import styled from "styled-components";
import PreviewModal from "components/Course/PreviewModal";
import BuyModal from "components/Course/BuyModal";

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

const index = ({ token, onboardings, user, courses, coursesTaken }) => {
	const router = useRouter();

	const { logout } = useContext(AuthContext);
	const {
		previewModalOpen,
		setPreviewModalOpen,
		buyModalOpen,
		setBuyModalOpen,
	} = useContext(CourseContext);

	const [allCourses] = useState(courses);

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
									<StyledEnrolled
										user={user}
										key={course.id}
										course={course}
										totalProgress={30}
									/>
								)}
							</>
						))}
					</div>
				</div>
			</div>

			<RightContainer>
				<ComponentsContainer className="position-fixed">
					<SideBlock
						content={"Wishlist Box (Work in progress..)"}
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
		console.log(coursesTaken);

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

export default index;
