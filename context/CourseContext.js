import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "config/index";
import AuthContext from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
	const router = useRouter();
	const [enrollClassLoading, setEnrollClassLoading] = useState(false);

	const enrollClass = async (course, userId, token) => {
		setEnrollClassLoading(true);

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
				console.log(data.message);
			} else {
				router.push(`/kelas/${slug}`);
			}
		} else {
			router.push(`/kelas/${slug}`);
		}

		setEnrollClassLoading(false);
	};

	return (
		<CourseContext.Provider
			value={{
				enrollClass,
				enrollClassLoading,
			}}
		>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseContext;
