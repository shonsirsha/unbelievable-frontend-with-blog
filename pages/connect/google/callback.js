import { useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "config";
import LoadingCallback from "components/Loading/LoadingCallback";
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

			if (res.ok) {
				router.push("/dashboard?r=1");
			} else {
				router.push("/masuk");
			}
		}
		googleAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <LoadingCallback />;
};

export default Callback;
