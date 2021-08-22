import { useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "config";
import LoadingCallback from "components/Loading/LoadingCallback";
import Swal from "sweetalert2";
const Callback = () => {
	const router = useRouter();
	useEffect(() => {
		async function googleAuth() {
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
				router.push("/dashboard?r=1");
			} else {
				console.log(res);
				console.log(data);
				if (data.message.id === "Auth.form.error.email.taken") {
					Swal.fire({
						title: "Pemberitahuan",
						html: "Kamu sudah memiliki akun dengan email ini.<br/><br/> Mohon masuk kembali tanpa menggunakan Google.",
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
