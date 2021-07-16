import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "config/index";
import AuthContext from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
	const router = useRouter();
	const [enrollClassLoading, setEnrollClassLoading] = useState(false);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [selectedPreviewCourse, setSelectedPreviewCourse] = useState(null);
	const enrollClass = async (course, userId, token) => {
		setEnrollClassLoading(true);
		if (!token) {
			router.push(`/masuk`);
		} else {
			const { owned, id, slug } = course;
			if (!owned) {
				const res = await fetch(`${API_URL}/courses/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						enrolled_users: [...course.enrolled_users, { id: userId }],
					}),
				});

				const data = await res.json();

				if (!res.ok) {
					router.push(`/masuk`);

					console.log(data.message);
				} else {
					router.push(`/kelas/${slug}`);
				}
			} else {
				router.push(`/kelas/${slug}`);
			}
		}
		setEnrollClassLoading(false);
	};

	const rateClass = async (course, userId, token, rate) => {
		if (!token) {
			router.push(`/masuk`);
		} else {
			console.log("rating...");
			console.log(rate), console.log(userId);
			console.log(course);
			const { id } = course;
			console.log(id);

			const newRating = course.rating.filter((rate) => {
				return rate.user.id !== userId;
			});

			const res = await fetch(`${API_URL}/courses/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},

				body: JSON.stringify({
					rating: [...newRating, { rate, user: { id: userId } }],
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				console.log(data.message);
			} else {
				console.log("rated");
			}
		}
	};

	return (
		<CourseContext.Provider
			value={{
				enrollClass,
				enrollClassLoading,
				previewModalOpen,
				setPreviewModalOpen,
				selectedPreviewCourse,
				setSelectedPreviewCourse,
				rateClass,
			}}
		>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseContext;
