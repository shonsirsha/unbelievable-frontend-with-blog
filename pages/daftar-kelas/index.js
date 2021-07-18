import { useContext, useEffect, useState } from "react";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "config";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import NProgress from "nprogress";
import PreviewModal from "components/Course/PreviewModal";

const StyledContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	padding-top: 120px;
	padding-bottom: 56px;
`;
export default function index() {
	const { userLoading, user, checkUserLoggedIn } = useContext(AuthContext);
	const { previewModalOpen, setPreviewModalOpen } = useContext(CourseContext);

	const [coursesState, setCoursesState] = useState(null);
	const [loading, setLoading] = useState(true);
	NProgress.configure({
		minimum: 0.3,
		easing: "ease",
		speed: 800,
		showSpinner: false,
	});

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	useEffect(() => {
		if (userLoading) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [userLoading]);

	useEffect(async () => {
		setLoading(true);
		const res = await fetch(`${API_URL}/courses`);
		const courses = await res.json();
		setCoursesState(courses);
		setLoading(false);
	}, []);

	useEffect(() => {
		console.log("refetched");
		console.log(coursesState);
	}, [coursesState]);

	const cardUser = (
		<>
			{coursesState &&
				coursesState.map((course) => (
					<div key={course.id}>
						<DefaultCourseCard
							key={course.id}
							className="mr-xl-3 mr-lg-3 mr-md-3 mr-0 mb-5 "
							user={user}
							course={course}
							owned={
								user &&
								course.enrolled_users.findIndex((u) => {
									return u.id == user.id;
								}) >= 0
									? 1
									: 0
							}
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
							className="mr-xl-3 mr-lg-3 mr-md-3 mr-0 mb-5 "
							user={user}
							course={course}
							owned={false}
						/>
					</div>
				))}
		</>
	);

	const content = user ? cardUser : cardNonUser;
	if (userLoading || loading) {
		return <></>;
	}

	return (
		<Layout
			showBurger={false}
			title="Daftar Kelas | Unbelieveable"
			scrollToSolid
		>
			<PreviewModal
				show={previewModalOpen}
				onHide={() => setPreviewModalOpen(false)}
			/>
			<Showcase title="Daftar Kelas" />
			<StyledContainer>{!userLoading && <>{content}</>}</StyledContainer>
		</Layout>
	);
}
