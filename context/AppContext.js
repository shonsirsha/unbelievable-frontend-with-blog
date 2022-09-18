import { createContext, useState, useEffect } from "react";
import { API_URL } from "config/index";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [siteData, setSiteData] = useState(null);
	const [socialEmbedData, setSocialEmbedData] = useState(null);
	const [igPosts, setIgPosts] = useState([]);

	const [ytPreviewedId, setYtPreviewedId] = useState("");
	const [ytVideos, setYtVideos] = useState([]);

	const [bannerData, setBannerData] = useState(null);

	useEffect(() => {
		async function fetchSiteData() {
			const resSiteData = await fetch(`${API_URL}/sitedata`, {
				method: "GET",
			});

			if (resSiteData.ok) {
				const siteD = await resSiteData.json();
				setSiteData(siteD);
			}

			//siteData will be useful for site-wide data
			//that don't change frequently.

			// For example, some of the content in the footer.
			// This means, it requires user's hard refresh
			// to see the changes if any was made.
		}
		const fetchSocialEmbedData = async () => {
			const res = await fetch(`${API_URL}/social-embeds`, {
				method: "GET",
			});

			if (res.ok) {
				const data = await res.json();
				setSocialEmbedData(data);
			}
		};

		void fetchSiteData();
		void fetchSocialEmbedData();
	}, []);

	useEffect(() => {
		if (socialEmbedData) {
			const access_token = socialEmbedData.ig_access_token.token;
			const PLAYLIST_ID = socialEmbedData.youtube_playlist_id;
			const ORDER = "date";
			const MAX_RESULTS = 10;
			const KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
			const fetchInstaFeed = async () => {
				const res = await fetch(
					`https://graph.instagram.com/me/media?fields=permalink,media_type,thumbnail_url,media_url&limit=6&access_token=${access_token}`
				);

				if (res.ok) {
					const data = await res.json();
					setIgPosts(data.data);
				} else {
					console.error("Error in fetching IG feed");
				}
			};

			const fetchYtVideos = async () => {
				const ytVideosRes = await fetch(
					`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${KEY}&order=${ORDER}`
				);

				if (ytVideosRes.ok) {
					const ytVideos = await ytVideosRes.json();
					setYtVideos(ytVideos ? ytVideos.items : []);
					setYtPreviewedId(
						ytVideos && ytVideos.items
							? ytVideos.items[0].snippet.resourceId.videoId
							: ""
					);
				} else {
					console.error("Error in fetching youtube videos");
				}
			};
			void fetchYtVideos();

			void fetchInstaFeed();
		}
	}, [socialEmbedData]);

	useEffect(() => {
		const fetchBannerData = async () => {
			const res = await fetch(`${API_URL}/customisable-banner`, {
				method: "GET",
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data.background_color);
				setBannerData(data);
			} else {
				console.error("Error in fetching banner data");
			}
		};

		void fetchBannerData();
	}, []);
	return (
		<AppContext.Provider
			value={{
				siteData,
				setSiteData,
				socialEmbedData,
				igPosts,
				ytVideos,
				ytPreviewedId,
				bannerData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
