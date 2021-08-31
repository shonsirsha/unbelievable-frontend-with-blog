import { useContext, useEffect, useState } from "react";
import { parseCookies } from "utils/cookies";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "config";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import PreviewModal from "components/Course/PreviewModal";
import BuyModal from "components/Course/BuyModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	padding-top: 120px;
	padding-bottom: 56px;
`;

export default function Index({ courses }) {
	const { user, checkUserLoggedIn } = useContext(AuthContext);

	const {
		previewModalOpen,
		setPreviewModalOpen,
		buyModalOpen,
		setBuyModalOpen,
		setWishlistCourses,
	} = useContext(CourseContext);

	useEffect(() => {
		checkUserLoggedIn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (user) {
			setWishlistCourses(user.wishlist);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<Layout
			showBurger={false}
			title="Daftar Kelas | Unbelieveable"
			scrollToSolid
		>
			<ToastContainer />
			<PreviewModal
				show={previewModalOpen}
				onHide={() => setPreviewModalOpen(false)}
			/>
			<BuyModal show={buyModalOpen} onHide={() => setBuyModalOpen(false)} />
			<Showcase title="Daftar Kelas" />
			<StyledContainer>
				{courses.map((course) => (
					<div key={course.id}>
						<DefaultCourseCard
							key={course.id}
							className="mr-xl-3 mr-lg-3 mr-md-3 mr-0 mb-5 "
							user={user}
							course={course}
							enrolled={course.enrolled}
						/>
					</div>
				))}
			</StyledContainer>
		</Layout>
	);
}

export async function getServerSideProps({ req, _ }) {
	const { token } = parseCookies(req);
	let courses = [];
	if (token === undefined) {
		const res = await fetch(`${API_URL}/courses`);
		courses = await res.json();
	} else {
		const res = await fetch(`${API_URL}/courses`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		courses = await res.json();
	}
	return {
		props: {
			courses,
		},
	};
}
