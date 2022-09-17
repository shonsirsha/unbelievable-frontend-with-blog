import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { TextTertiary } from "components/Typography/Text";
import { HeadingXXS } from "components/Typography/Headings";
import decodeHTMLEntities from "utils/decodeHTMLEntities";
import { mediaBreakpoint } from "utils/breakpoints";
import moment from "moment";

const VideosContainer = styled.div`
	display: flex;
	max-height: 480px;
	width: 100%;
	border-radius: 8px;
	background: #222222;
	& iframe {
		width: 70%;
		height: 420px;
	}

	@media ${mediaBreakpoint.down.lg} {
		max-height: unset;

		& iframe {
			width: 100%;
			height: 320px;
		}
	}
`;

const VideosListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	overflow-y: scroll;
	@media ${mediaBreakpoint.down.md} {
		margin-top: 24px;
		max-height: 320px;
		width: 100%;
	}
`;

const VideoTitleText = styled(HeadingXXS)`
	font-size: 13px;
`;

const YoutubeEmbed = () => {
	const PLAYLIST_ID = "UUSDvKdIQOwTfcyOimSi9oYA";
	const ORDER = "date";
	const MAX_RESULTS = 10;
	const KEY = process.env.NEXT_PUBLIC_YT_API_KEY;

	const [videos, setVideos] = useState([]);

	const [previewedId, setPreviewedId] = useState("");
	const [autoPlay, setAutoplay] = useState(false);
	useEffect(() => {
		const fetchYtVideos = async () => {
			const ytVideosRes = await fetch(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${KEY}&order=${ORDER}`
			);

			if (ytVideosRes.ok) {
				const ytVideos = await ytVideosRes.json();
				setVideos(ytVideos ? ytVideos.items : []);
				setPreviewedId(
					ytVideos && ytVideos.items
						? ytVideos.items[0].snippet.resourceId.videoId
						: ""
				);
			} else {
				console.error("Error in fetching youtube videos");
			}
		};
		void fetchYtVideos();
	}, []);

	if (!videos.length) return <></>;
	if (videos.length)
		return (
			<VideosContainer className="p-3 flex-md-row flex-column">
				<iframe
					src={`https://www.youtube.com/embed/${previewedId}?autoplay=${
						autoPlay ? `1` : `0`
					}&origin=https://unbelievable.id&rel=0`}
					title="YouTube Video Player for Unbelievable.id"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					style={{ border: 0, borderRadius: 8 }}
					className="mr-3 mt-2 shadow-lg"
				/>

				<VideosListContainer>
					{videos.map((video) => (
						<div
							onClick={() => {
								setAutoplay(true);
								setPreviewedId(video.snippet.resourceId.videoId);
							}}
							className="d-flex flex-column mr-4"
							key={video.id}
						>
							<div
								className="position-relative mr-2"
								style={{
									width: "240px",
									height: "120px",
									flexShrink: "0",
									overflow: "hidden",
									borderRadius: "4px",
								}}
							>
								<Image
									src={video.snippet.thumbnails.medium.url}
									alt={video.snippet.title}
									layout="fill"
									objectFit="cover"
								/>
							</div>

							<VideoTitleText as="p" className="text-white mt-2">
								{decodeHTMLEntities(video.snippet.title)}
							</VideoTitleText>
							<TextTertiary className="mt-1 mb-4 text-lightgray">
								{moment(video.snippet.publishedAt).format("DD MMM")}
							</TextTertiary>
						</div>
					))}
				</VideosListContainer>
			</VideosContainer>
		);
};

export default YoutubeEmbed;
