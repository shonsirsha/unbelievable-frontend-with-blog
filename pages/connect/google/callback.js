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
						title: "Ups...",
						html: "User dengan alamat E-mail ini tidak mendaftar melalui Google. <br/><br/> Mohon kembali masuk tanpa menggunakan Google.",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Masuk",
						icon: "info",
						timer: 10000,
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
