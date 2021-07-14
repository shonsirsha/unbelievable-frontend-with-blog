import { useContext, useEffect, useState } from "react";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import AuthContext from "context/AuthContext";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "config";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import NProgress from "nprogress";

const StyledContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	padding-top: 120px;
	padding-bottom: 56px;
`;
export default function index({ courses }) {
	const { userLoading, user } = useContext(AuthContext);
	const [coursesState, setCoursesState] = useState(courses);
	NProgress.configure({
		minimum: 0.3,
		easing: "ease",
		speed: 800,
		showSpinner: false,
	});

	useEffect(() => {
		if (userLoading) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [userLoading]);

	useEffect(() => {
		if (user) {
			courses.map((course) => {
				if (course.enrolled_users.length > 0) {
					course.enrolled_users.map((i) => {
						if (i.id === user.id) {
							course.owned = true;
						} else {
							course.owned = false;
						}
					});
				}
			});
			setCoursesState(courses);
		}
	}, [user]);

	const cardUser = (
		<>
			{coursesState &&
				coursesState.map((course) => (
					<div key={course.id}>
						<DefaultCourseCard
							key={course.id}
							className="mr-3 mb-5 "
							user={user}
							course={course}
							owned={course.owned}
						/>
					</div>
				))}
		</>
	);

	const cardNonUser = (
		<>
			{coursesState &&
				coursesState.map((course) => (
					<div key={course.id}>
						<DefaultCourseCard
							key={course.id}
							className="mr-3 mb-5 "
							user={user}
							course={course}
							owned={false}
						/>
					</div>
				))}
		</>
	);

	const content = user ? cardUser : cardNonUser;

	return (
		<Layout
			showBurger={false}
			title="Daftar Kelas | Unbelieveable"
			scrollToSolid
		>
			<Showcase title="Daftar Kelas" />
			<StyledContainer>{!userLoading && <>{content}</>}</StyledContainer>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/courses`);
	const courses = await res.json();
	return {
		props: {
			courses,
		},
		revalidate: 1,
	};
}
