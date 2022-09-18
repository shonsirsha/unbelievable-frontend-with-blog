import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { BsPlay, BsPlayCircle } from "react-icons/bs";

const ImageContainer = styled.div`
	position: relative;
	width: 240px;
	height: 240px;
	flex-shrink: 0;
	border-radius: 8px;
	overflow: hidden;

	@media (min-width: 991px) and (max-width: 1090px) {
		/*1024px to 1090px*/
		width: 210px;
		height: 210px;
	}

	@media ${mediaBreakpoint.down.lg} {
		width: 245px;
		height: 245px;
	}

	@media ${mediaBreakpoint.down.md} {
		width: 160px;
		height: 160px;
	}
`;
const InstaImage = ({ src = "", permalink = "", isVideo = false }) => {
	return (
		<a href={permalink} target="_blank" rel="noreferrer noopener">
			<ImageContainer className="shadow-md">
				{isVideo && (
					<BsPlayCircle
						className="text-white position-absolute"
						style={{
							zIndex: 1,
							fontSize: 32,
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							margin: "auto",
						}}
					/>
				)}

				<Image layout="fill" objectFit="cover" alt={"alt"} src={src} />
			</ImageContainer>
		</a>
	);
};

export default InstaImage;
