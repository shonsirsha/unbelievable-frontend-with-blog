import { useContext, useState } from "react";
import { parseCookies } from "utils/cookies";
import { useRouter } from "next/router";
import Router from "next/router";
import AuthContext from "context/AuthContext";
import { API_URL } from "config/index";
import { HeadingXS, HeadingLG } from "components/Typography/Headings";
import Layout from "components/Layout";
import Onboarding from "components/Onboarding/Onboarding";
import EnrolledCourseCard from "components/Course/EnrolledCourseCard";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import SideBlock from "components/SideItems/SideBlock";
import styled from "styled-components";

const StyledDefault = styled(DefaultCourseCard)`
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 215px;
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
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 280px;
	}
`;
const index = ({ token, onboardings, user, courses, coursesTaken }) => {
	const { logout } = useContext(AuthContext);
	const [allCourses] = useState(courses);
	const router = useRouter();

	const enrollClass = async (course) => {
		const res = await fetch(`${API_URL}/courses/${course.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				enrolled_users: [...course.enrolled_users, { id: user.id }],
			}),
		});

		if (!res.ok) {
			console.log(data.message);
		} else {
			router.reload();
		}

		//todo, get course.enrolled_users[] and do [..., {id: user.id}]
	};
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
			Router.push("/dashboard");
		}
	};

	if (!user.onboarded) {
		return (
			<>
				<Onboarding
					handleFinishOnboarding={handleFinishOnboarding}
					token={token}
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
			<div className="d-flex w-100 flex-column">
				<HeadingXS className="text-gray mb-2">
					selamat datang kembali,
				</HeadingXS>
				<StyledHeadingLG className="text-primary1 mb-5">
					heroes!
				</StyledHeadingLG>
				<div className="d-flex flex-column">
					<StyledHeadingXS className="mb-2 ml-1">kelas populer</StyledHeadingXS>
					<div className="d-flex flex-lg-wrap flex-nowrap w-100 overflow-lg-none overflow-auto px-2">
						{allCourses.map((course) => (
							<StyledDefault
								small
								enrollClass={() => {
									enrollClass(course);
								}}
								className="mr-3 mb-5 "
								title={course.title}
								shortDesc={course.short_desc}
								img={course.image}
								creatorName={course.content_creator.full_name}
								rating={course.rating}
								user={user}
							/>
						))}
						{/* 
						<StyledDefault
							small
							className="mr-3 mb-5 "
							title={"Some Title"}
							shortDesc={"Some Short Desc"}
							creatorName={"Sean S.L."}
							rating={5}
							user={user}
						/>

						<StyledDefault
							small
							className="mr-3 mb-5 "
							title={"Some Title"}
							shortDesc={"Some Short Desc"}
							creatorName={"Sean S.L."}
							rating={4.5}
							user={user}
						/>

						<StyledDefault
							small
							className="mr-3 mb-5 "
							title={"Some Title"}
							shortDesc={"Some Short Desc"}
							creatorName={"Sean S.L."}
							rating={4.5}
							user={user}
						/> */}
					</div>
				</div>

				<div className="d-flex flex-column mt-0 mt-lg-4">
					<StyledHeadingXS className="mb-2 ml-1 ">kelas saya</StyledHeadingXS>

					<div className="d-flex flex-lg-wrap flex-nowrap w-100 overflow-lg-none overflow-auto px-2 pb-2">
						{coursesTaken.map((course) => (
							<StyledEnrolled
								title={course.title}
								user={user}
								className="mr-4 mb-4"
								creatorName={course.content_creator.full_name}
								img={course.image}
								totalProgress={30}
							/>
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
		const user = await res2.json();
		const courses = await res3.json();
		const coursesTaken = await res4.json();

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
