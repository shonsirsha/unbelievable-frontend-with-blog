import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "config/index";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
	const router = useRouter();
	const [enrollClassLoading, setEnrollClassLoading] = useState(false);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [buyModalOpen, setBuyModalOpen] = useState(false);

	const [selectedPreviewCourse, setSelectedPreviewCourse] = useState(null);
	const [invoiceUrl, setInvoiceUrl] = useState(null);

	const getInvoiceUrl = async (course, user, token) => {
		setEnrollClassLoading(true);
		//call to xendit API via Strapi
		if (!token) {
			router.push(`/masuk`);
		}

		const { slug, price, title } = course;
		const { id, email } = user;

		const res = await fetch(`${API_URL}/xendit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				external_id: `${slug}-${Date.now() * 2}`,
				amount: price,
				payer_email: email,
				description: `Beli Kelas: ${title}`,
			}),
		});

		const inv = await res.json();
		if (res.ok) {
			setInvoiceUrl(inv.invoice_url);
		} else {
			alert("Terjadi kesalahan. Mohon ulangi lagi.");
		}

		setEnrollClassLoading(false);
	};

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

				// const data = await res.json();

				if (!res.ok) {
					router.push(`/masuk`);

					// console.log(data.message);
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

			const { id } = course;

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
				console.log("failed...");
				// console.log(data.message);
			} else {
				console.log("rated");
			}
		}
	};

	return (
		<CourseContext.Provider
			value={{
				enrollClass,
				setPreviewModalOpen,
				setSelectedPreviewCourse,
				rateClass,
				setBuyModalOpen,
				getInvoiceUrl,
				setInvoiceUrl,
				invoiceUrl,
				enrollClassLoading,
				previewModalOpen,
				selectedPreviewCourse,
				buyModalOpen,
			}}
		>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseContext;
