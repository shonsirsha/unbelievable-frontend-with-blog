import { useContext } from "react";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import AuthContext from "context/AuthContext";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { API_URL } from "config";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
const StyledContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	padding-top: 120px;
	padding-bottom: 56px;
`;
export default function index({ courses }) {
	const { loading, user } = useContext(AuthContext);
	if (loading) {
		return <></>;
	}

	return (
		<Layout showBurger={false} scrollToSolid>
			<Showcase title="Daftar Kelas" />
			<StyledContainer>
				{courses.map((course) => (
					<DefaultCourseCard
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
					className="mr-3 mb-5 "
					title={"Some Title"}
					shortDesc={"Some Short Desc"}
					creatorName={"Sean S.L."}
					rating={5}
					user={user}
				/>
				<DefaultCourseCard
					className="mr-3 mb-5 "
					title={"Some Title"}
					shortDesc={"Some Short Desc"}
					creatorName={"Sean S.L."}
					rating={5}
					user={user}
				/>
				<DefaultCourseCard
					className="mr-3 mb-5 "
					title={"Some Title"}
					shortDesc={"Some Short Desc"}
					creatorName={"Sean S.L."}
					rating={5}
					user={user}
				/>
				<DefaultCourseCard
					className="mr-3 mb-5 "
					title={"Some Title"}
					shortDesc={"Some Short Desc"}
					creatorName={"Sean S.L."}
					rating={5}
					user={user}
				/>
			</StyledContainer>
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
