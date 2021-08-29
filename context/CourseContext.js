import { createContext, useState } from "react";
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

	const [missionsCtx, setMissionsCtx] = useState([]);
	const [missionsCompleted, setMissionsCompleted] = useState(false);
	const [persistedMissionIds, setPersistedMissionIds] = useState([]);
	const [missionIdsDoneFromAPI, setMissionIdsDoneFromAPI] = useState([]);

	const [wishlistCourses, setWishlistCourses] = useState([]);

	const [missionSaveLoading, setMissionSaveLoading] = useState(false);
	const checkIfInvoiceValid = async (courseId, token) => {
		setEnrollClassLoading(true);

		if (!token) {
			router.push(`/masuk`);
			return;
		}
		const res = await fetch(`${API_URL}/waiting-payments/singular/me`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				courseId: courseId,
			}),
		});

		if (res.ok) {
			const invoiceValid = await res.json();
			if (invoiceValid.valid) {
				setInvoiceUrl(invoiceValid.invoice_url);
			}
			setEnrollClassLoading(false);

			return invoiceValid.valid;
		} else {
			setEnrollClassLoading(false);

			alert("Maaf, telah terjadi kesalahan. Mohon coba lagi. (conf)");
		}
	};

	const getInvoiceUrl = async (course, user, token) => {
		if (window) {
			setEnrollClassLoading(true);
			if (!token) {
				router.push(`/masuk`);
				return;
			}

			const { slug, course_price, title } = course;
			const { email } = user;
			const external_id = `${slug}-${Date.now() * 2}`;
			// `/xendit` endpoint does:
			//1 . Call xendit API to create a new invoice_url
			//2. Create a new entry of waiting_payment with the corresponding: user, course, external_id, and invoice_url
			const res = await fetch(`${API_URL}/xendit`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					external_id,
					courseId: course.id,
					amount: course_price ? course_price.price : 0,
					payer_email: email,
					description: `Beli Kelas: ${title}`,
					redirect_url: `${window.location.origin}/redir/${slug}`,
				}),
			});

			console.log(external_id);

			const inv = await res.json();
			if (res.ok) {
				setInvoiceUrl(inv.invoice_url);
			} else {
				console.log(res);
				alert("Maaf, telah terjadi kesalahan. Mohon coba lagi. (NO_PRC)");
			}
			setEnrollClassLoading(false);
		}
	};

	const enrollClass = async (course, token) => {
		setEnrollClassLoading(true);
		if (!token) {
			router.push(`/masuk`);
			return;
		} else {
			const { enrolled, slug, uuid } = course;
			if (!enrolled) {
				console.log(token);

				const res = await fetch(`${API_URL}/courses/enroll/${uuid}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
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

	const removeWishlist = async (course, token) => {
		const res = await fetch(
			`${API_URL}/courses/remove-wishlist/${course.course.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.ok) {
			setWishlistCourses(
				wishlistCourses.filter((c) => c.course.uuid !== course.course.uuid)
			);
			return true;
		} else {
			return false;
		}
	};

	const addWishlist = async (course, token) => {
		if (!token) {
			router.push("/masuk");
			return;
		}
		let alreadyInWishlist = false;

		if (wishlistCourses) {
			alreadyInWishlist = wishlistCourses.some((c) => {
				return course.course.uuid === c.course.uuid;
			});
		}

		const res = await fetch(`${API_URL}/courses/wishlist/${course.course.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			if (!alreadyInWishlist) {
				setWishlistCourses([...wishlistCourses, course]);
			}
			return true;
		} else {
			if (alreadyInWishlist) {
				return true;
			}
			return false;
		}
	};

	const rateClass = async (course, token, rate) => {
		if (!token) {
			router.push(`/masuk`);
			return;
		}
		console.log("rating...");

		const { uuid } = course;

		const res = await fetch(`${API_URL}/courses/rate/${uuid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},

			body: JSON.stringify({
				rate,
			}),
		});

		// const data = await res.json();

		if (!res.ok) {
			console.log("failed...");
			// console.log(data.message);
		} else {
			console.log("rated");
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
				checkIfInvoiceValid,
				setMissionsCtx,
				setMissionsCompleted,
				setPersistedMissionIds,
				setMissionIdsDoneFromAPI,
				setMissionSaveLoading,
				setWishlistCourses,
				removeWishlist,
				addWishlist,
				missionIdsDoneFromAPI,
				persistedMissionIds,
				missionsCompleted,
				missionsCtx,
				invoiceUrl,
				enrollClassLoading,
				previewModalOpen,
				selectedPreviewCourse,
				buyModalOpen,
				missionSaveLoading,
				wishlistCourses,
			}}
		>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseContext;
