import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "config";
import LoadingCallback from "components/Loading/LoadingCallback";
import Swal from "sweetalert2";
import AuthContext from "context/AuthContext";
const Callback = () => {
	const router = useRouter();
	const { user, token, checkUserLoggedIn } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [redir, setRedir] = useState(false);
	useEffect(() => {
		if (token && user && !user.code_verified) {
			async function saveRegisterCodeToDB(code) {
				const res = await fetch(`${API_URL}/users/me`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ unverified_register_code: code }),
				});
				if (!res.ok) {
					if (res.status === 403 || res.status === 401) {
						toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
						return;
					}
					toast.error("Terjadi Kesalahan Mohon Coba Lagi");
				}
			}
			async function setUserRegisterCodeToDB(code) {
				const res = await fetch(`${API_URL}/users/apply-code`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ r_c_to_be_checked: code }),
				});
				if (!res.ok) {
					if (res.status === 403 || res.status === 401) {
						toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
						return;
					}
					toast.error("Terjadi Kesalahan Mohon Coba Lagi");
				} else {
					setRedir(true);
				}
			}
			if (
				!user.register_link &&
				(!user.unverified_register_code || user.unverified_register_code === "")
			) {
				const reg_code = sessionStorage.getItem("unb_reg_code");
				if (reg_code) {
					console.log(reg_code);
					// saving to DB immediately - just in case user closes the tab
					saveRegisterCodeToDB(reg_code).then(() => {
						sessionStorage.removeItem("unb_reg_code");
						//attempting to set reg_code in db
						setUserRegisterCodeToDB(reg_code);
					});
				} else {
					//if !reg_code,
					// no code in DB nor in session storage -
					// safe to assume that user has no special register code

					console.log("no reg link");
					setUserRegisterCodeToDB(""); // will basically set code_verified to true w/ no register link
				}
			} else if (
				!user.register_link &&
				(user.unverified_register_code || user.unverified_register_code !== "")
			) {
				// if user has no register link but
				// used an unverfied register code
				// hmm sus amOgUs...
				setUserRegisterCodeToDB(user.unverified_register_code);
			}
		} else if (user && user.code_verified) {
			if (sessionStorage.getItem("unb_reg_code")) {
				sessionStorage.removeItem("unb_reg_code");
			}
			setRedir(true);
		}
	}, [token, user]);
	useEffect(() => {
		if (!loading && redir) {
			router.push("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, redir]);
	useEffect(() => {
		async function googleAuth() {
			console.log("ASDSA");

			const res = await fetch(`${NEXT_URL}/api/google-auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token_details: router.asPath.replace("/connect/google/callback?", ""),
				}),
			});
			const data = await res.json();

			if (res.ok) {
				checkUserLoggedIn();
				setLoading(false);

				// console.log(userState);
			} else {
				if (data.message === "No access_token.") {
					router.push("/masuk");
					return;
				}
				if (data.message.id === "Auth.form.error.email.taken") {
					Swal.fire({
						title: "Pemberitahuan",
						html: "Akun ini tidak terdaftar melalui Google.<br/><br/> Mohon masuk kembali tanpa menggunakan Google.",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Oke",
						icon: "info",
						timer: 10000,
						timerProgressBar: true,
					}).then((result) => {
						if (result.isConfirmed || result.dismiss) {
							router.push("/masuk");
						}
					});
				} else {
					Swal.fire({
						title: "Ups...",
						html: "Mohon maaf, telah terjadi kesalahan dalam proses masuk. Mohon ulangi lagi.",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Ulang",
						icon: "warning",
						timer: 5000,
						timerProgressBar: true,
					}).then((result) => {
						if (result.isConfirmed || result.dismiss) {
							router.push("/masuk");
						}
					});
				}
			}
		}
		googleAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <LoadingCallback />;
};

export default Callback;
