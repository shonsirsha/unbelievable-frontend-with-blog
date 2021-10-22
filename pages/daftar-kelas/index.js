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
	width: 100%;
	justify-content: center;
	padding-top: 120px;
	padding-bottom: 56px;
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(auto-fill, 320px);
	grid-auto-rows: 1fr;
	grid-column-gap: 32px;
	grid-row-gap: 48px;
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
			title="Daftar Kelas | Unbelievable"
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
					<div className="d-flex" key={course.id}>
						<DefaultCourseCard
							key={course.id}
							className=" "
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
