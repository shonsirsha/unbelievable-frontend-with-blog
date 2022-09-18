import Button from "react-bootstrap/Button";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import AppContext from "context/AppContext";
import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledContainer = styled.div`
	padding: 18px 24px;
	width: 100%;
	align-items: center;
	display: flex;
	background: ${(props) => props.background};
`;

const Title = styled(HeadingXXS)`
	color: ${(props) => props.color};
`;

const Content = styled(TextSecondary)`
	color: ${(props) => props.color};
	white-space: pre-line;
	font-size: 14px;
	line-height: 1.7;
`;

const BannerButton = styled(Button)`
	height: 40px;
	border: none;
	background: ${(props) => props.background} !important;
`;

const ButtonText = styled(HeadingXXS)`
	color: ${(props) => props.color};
	font-size: 12px;
	padding: 2px 8px;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
`;
const CustomisableBanner = ({ className = "" }) => {
	const { bannerData } = useContext(AppContext);
	const background = bannerData ? bannerData.background_color : "";
	const title = bannerData ? bannerData.title : "";
	const button_text = bannerData ? bannerData.button_text : "";
	const color = bannerData ? bannerData.text_color : "";
	const content = bannerData ? bannerData.content : "";
	const button_color = bannerData ? bannerData.button_color : "";
	const button_text_color = bannerData ? bannerData.button_text_color : "";
	const link_to = bannerData ? bannerData.button_link_to : "";
	const image = bannerData ? bannerData.image : null;
	const show = bannerData ? bannerData.show : null;

	if (!bannerData || !show) return <></>;
	return (
		<StyledContainer
			background={background}
			className={`${className} flex-lg-row flex-column`}
		>
			{image && (
				<ImageContainer width={image.width} height={image.height}>
					<Image src={image.url} alt="Logo" layout="fill" />
				</ImageContainer>
			)}

			<div className="d-flex flex-column mx-3 my-lg-0 my-4">
				<Title color={color}>{title}</Title>
				<Content className="mt-3" color={color}>
					{content}
				</Content>
			</div>
			<a href={link_to} target="_blank" rel="noreferrer noopener">
				<BannerButton background={button_color}>
					<ButtonText color={button_text_color}>{button_text}</ButtonText>
				</BannerButton>
			</a>
		</StyledContainer>
	);
};

export default CustomisableBanner;
