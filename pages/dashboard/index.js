import { useContext, useState } from "react";
import { parseCookies } from "utils/cookies";
import { Container, Row, Col } from "react-bootstrap";
import Router from "next/router";
import AuthContext from "context/AuthContext";
import { API_URL } from "config/index";
import Layout from "components/Layout";
import Onboarding from "components/Onboarding/Onboarding";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import SideBlock from "components/SideItems/SideBlock";
import ReviewBlock from "components/SideItems/ReviewBlock";
import styled from "styled-components";

const OuterContainer = styled.div`
	padding: 64px;
	width: 100%;
	padding-left: 128px;
	paddin-right: 16px;
	display: flex;
`;
const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;
`;
const ComponentsContainer = styled.div`
	bottom: 48px;
	right: 16px;
`;
const index = ({ token, onboardings, user, courses }) => {
	const { logout } = useContext(AuthContext);
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
			<OuterContainer>
				<div className="d-flex w-100">
					<div className="d-flex flex-wrap w-100">
						{allCourses.map((course) => (
							<DefaultCourseCard
								small
								className="mr-3 mb-5 "
								title={course.title}
								shortDesc={course.short_desc}
								img={course.image}
								creatorName={course.content_creator.full_name}
								rating={course.rating}
								user={user}
							/>
						))}

						<DefaultCourseCard
							small
							className="mr-3 mb-5 "
							title={"Some Title"}
							shortDesc={"Some Short Desc"}
							creatorName={"Sean S.L."}
							rating={5}
							user={user}
						/>

						<DefaultCourseCard
							small
							className="mr-3 mb-5 "
							title={"Some Title"}
							shortDesc={"Some Short Desc"}
							creatorName={"Sean S.L."}
							rating={4.5}
							user={user}
						/>
					</div>
				</div>
				<RightContainer>
					<ComponentsContainer className="position-fixed">
						<SideBlock className="mb-3" />
						<SideBlock className="mb-3" />
						<ReviewBlock />
					</ComponentsContainer>
				</RightContainer>
			</OuterContainer>
			{/* <button className="mb-5" onClick={() => logout()}>
				logout
			</button> */}
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

		const res3 = await fetch(`${API_URL}/courses`, {
			method: "GET",
		});

		const onboardings = await res.json();
		const user = await res2.json();
		const courses = await res3.json();

		return {
			props: {
				onboardings,
				token,
				user,
				courses,
			},
		};
	}
}

export default index;
