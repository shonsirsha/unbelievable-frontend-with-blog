import { useState, useContext } from "react";
import Image from "next/image";
import styled from "styled-components";
import AppContext from "context/AppContext";
import { TextTertiary } from "components/Typography/Text";
import { HeadingXXS } from "components/Typography/Headings";
import decodeHTMLEntities from "utils/decodeHTMLEntities";
import { mediaBreakpoint } from "utils/breakpoints";
import moment from "moment";
import { BsYoutube } from "react-icons/bs";

const VideosContainer = styled.div`
	display: flex;
	max-height: 480px;
	width: 100%;
	border-radius: 4px;
	background: #222222;
	& iframe {
		width: 70%;
		height: 420px;
	}

	@media ${mediaBreakpoint.down.md} {
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

const IndividualVideo = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const YoutubeEmbed = () => {
	const [autoPlay, setAutoplay] = useState(false);

	const { ytPreviewedId, ytVideos, setYtPreviewedId } = useContext(AppContext);

	if (!ytVideos.length) return <></>;
	if (ytVideos.length)
		return (
			<div className="d-flex flex-column">
				<div className="d-flex">
					<BsYoutube size={18} />
					<HeadingXXS as="p" className="ml-2 mb-3">
						Unbelievable.id Official YouTube Channel
					</HeadingXXS>
				</div>

				<VideosContainer className="p-3 flex-md-row flex-column">
					<iframe
						src={`https://www.youtube.com/embed/${ytPreviewedId}?autoplay=${
							autoPlay ? `1` : `0`
						}&origin=https://unbelievable.id&rel=0`}
						title="YouTube Video Player for Unbelievable.id"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						style={{ border: 0, borderRadius: 8 }}
						className="mr-3 mt-2 shadow-lg"
					/>

					<VideosListContainer>
						{ytVideos.map((video) => (
							<IndividualVideo
								onClick={() => {
									setAutoplay(true);
									setYtPreviewedId(video.snippet.resourceId.videoId);
								}}
								className="d-flex flex-column mr-4"
								key={video.id}
							>
								<div
									className="position-relative mr-2 mt-lg-0 mt-3"
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
							</IndividualVideo>
						))}
					</VideosListContainer>
				</VideosContainer>
			</div>
		);
};

export default YoutubeEmbed;
