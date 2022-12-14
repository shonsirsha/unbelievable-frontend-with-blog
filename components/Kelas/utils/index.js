import Swal from "sweetalert2";
import Router from "next/router";
import { API_URL } from "config";

export const isVideoFinished = (videosState, video) => {
	const currentVideoIx = videosState.findIndex((v) => v.id === video.id);
	return videosState[currentVideoIx].all_missions_completed;
};

const goToTheNextDay = (
	videosState,
	video,
	video_day,
	video_desc,
	boughtDayDiff,
	setRenderedDescContext,
	slug
) => {
	const previousOfClickedVideoIx =
		videosState.findIndex((v) => v.id === video.id) - 1;

	if (videosState[previousOfClickedVideoIx].all_missions_completed) {
		if (boughtDayDiff >= video_day || isVideoFinished(videosState, video)) {
			goToVideo(video, slug);
			setRenderedDescContext(<>{video_desc}</>);
		} else {
			Swal.fire({
				title: "Pertahankan semangatmu HEROES!",
				text: "Kita menganjurkan untuk ikut 1 video / hari biar kamu focus. Apa kamu tetap mau lanjut?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#171b2d",
				cancelButtonColor: "#d52f89",
				confirmButtonText: "Lanjut",
				cancelButtonText: "Tidak",
			}).then((result) => {
				if (result.isConfirmed) {
					goToVideo(video, slug);
				}
			});
		}
	} else {
		Swal.fire({
			title: "Eits, tunggu dulu HEROES!",
			text: "Sebelum lanjut, aku mau ingetin kamu buat selesaikan misi hari ini. Misi akan keluar kalau sudah selesai menonton video hari ini sampai beres. Kamu tinggal kerjakan misi di bagian kiri bawah, klik, dan simpan misinya ya. ",
			icon: "error",
			confirmButtonColor: "#171b2d",
			confirmButtonText: "OKE!",
		});
	}
};

const goToVideo = (video, slug) => {
	Router.push(
		`${
			video.bunny_video.upload_id
				? `/kelas/${slug}?c=${video.bunny_video.upload_id}`
				: `/`
		}`
	);
};

const isGoingNext = (currentDay, targetDay, videosState) => {
	if (currentDay === targetDay) return;

	const current = videosState.findIndex((vid) => vid.id === currentDay);
	const target = videosState.findIndex((vid) => vid.id === targetDay);
	if (target > current) {
		return true;
	}
	return false;
	//false means user goes to previous day
};

const onClickBuyButton = async (
	currentCourse,
	token,
	userServer,
	checkIfInvoiceValid,
	getInvoiceUrl,
	setBuyModalOpen
) => {
	const invoiceIsValid = await checkIfInvoiceValid(currentCourse.id, token); // exists and not expiring soon/expired yet
	if (!invoiceIsValid) {
		// console.log("getting new url (call to xendit)...");
		await getInvoiceUrl(currentCourse, userServer, token);
	}
	setBuyModalOpen(true);
};

//this func needs to be refactored further
export const handleClickVideoDay = (
	currentCourse,
	video,
	video_desc,
	video_day,
	paid,
	videosState,
	slug,
	boughtDayDiff,
	setRenderedDescContext,
	userServer,
	checkIfInvoiceValid,
	getInvoiceUrl,
	setBuyModalOpen,
	token
) => {
	if (paid) {
		if (currentCourse.currentVideo.id !== video.id) {
			const goNextDay = isGoingNext(
				currentCourse.currentVideo.id,
				video.id,
				videosState
			);
			if (goNextDay) {
				goToTheNextDay(
					videosState,
					video,
					video_day,
					video_desc,
					boughtDayDiff,
					setRenderedDescContext,
					slug
				);
			} else {
				goToVideo(video, slug);
			}
		}
	} else {
		if (currentCourse.currentVideo.id !== video.id) {
			Swal.fire({
				title: "Wah sayang sekali HEROES..",
				text: "Untuk pengalaman lebih maksimal.. Beli kelasnya untuk melanjutkan ya!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#171b2d",
				cancelButtonColor: "#d52f89",
				confirmButtonText: "Beli Kelas",
				cancelButtonText: "Tutup",
				preConfirm: async (email) => {
					await onClickBuyButton(
						currentCourse,
						token,
						userServer,
						checkIfInvoiceValid,
						getInvoiceUrl,
						setBuyModalOpen
					);
				},
			}).then(async (_) => {});
		}
	}
};

export async function handleMissionsSave(
	currentCourse,
	token,
	missionsCtx,
	missionIdsToAPI,
	setVideosState,
	setMissionsCompleted,
	setMissionSaveLoading,
	videosState
) {
	console.log("saving mission(s)...");

	const res = await fetch(
		`${API_URL}/courses/do-mission/${currentCourse.uuid}/${currentCourse.currentVideo.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},

			body: JSON.stringify({
				missionIds: missionIdsToAPI,
			}),
		}
	);

	// const data = await res.json();
	if (!res.ok) {
		console.log("failed...");
	} else {
		console.log("mission done");
		setMissionSaveLoading(false);

		if (missionsCtx.length === missionIdsToAPI.length) {
			setVideosState(
				[...videosState].map((vidObj) => {
					if (vidObj.id === currentCourse.currentVideo.id) {
						return {
							...vidObj,
							all_missions_completed: true,
						};
					} else return vidObj;
				})
			);
			setMissionsCompleted(true);
			Swal.fire({
				title: "WAH SELAMAT HEROES!",
				text: "Berbanggalah kamu uda berhasil selesaikan misi hari ini! Dan kamu tetap berusaha walaupun misinya sulit.",
				icon: "success",
				confirmButtonColor: "#171b2d",
				confirmButtonText: "YES! Akhirnya selesai!",
			}).then((result) => {
				if (result.isConfirmed || result.dismiss) {
					if (window) {
						setTimeout(() => {
							window.scrollTo(0, 0);
						}, 500);
					}
				}
			});
		}
	}
}

export const finishesVideo = async (
	finishedWatching,
	currentCourse,
	token,
	videoId,
	setFinishedWatching,
	setMissionsCtx
) => {
	console.log("finishing...");

	if (!finishedWatching) {
		const res = await fetch(
			`${API_URL}/courses/finish/${currentCourse.uuid}/${videoId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!res.ok) {
			console.log("failed...");
		} else {
			setFinishedWatching(true);
			console.log("finished video");
			await fetchCurrentVideoMissions(
				currentCourse,
				token,
				videoId,
				setMissionsCtx
			);
		}
	} else {
		console.log("No further actions (done anyway)");
	}
};

export const fetchCurrentVideoMissions = async (
	currentCourse,
	token,
	videoId,
	setMissionsCtx
) => {
	const res = await fetch(
		`${API_URL}/courses/current-mission/${currentCourse.uuid}/${videoId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const fetchedMissions = await res.json();

	if (!res.ok) {
		console.log("failed fetching missions...");
	} else {
		console.log("missions fetched");
		setMissionsCtx(fetchedMissions);
	}
};
