import React from "react";
import styled from "styled-components";
import HeaderTextBig from "./HeaderTextBig";
import { TextSecondary, TextTertiary } from "components/Typography/Text";
import { HeadingXXS } from "components/Typography/Headings";
import Link from "next/link";
import Image from "next/image";

const SubHeader = styled.div`
	font-size: 12px;
`;

const CardContainer = styled.div`
	padding: 12px 10px;
	border-radius: 16px;
	background: #dbdbdb;
	display: flex;
`;

const CardHeader = styled(HeadingXXS)`
	font-size: 13px;
`;

const TagsText = styled(TextTertiary)`
	font-size: 10px;
`;

const ShortDescText = styled(HeadingXXS)`
	font-size: 12px;
`;

const Rekomendasi = ({ recommendedBlogPosts = [] }) => {
	return (
		<div className="d-flex flex-column">
			<HeaderTextBig>Rekomendasi untuk Kamu</HeaderTextBig>
			<SubHeader className="mt-2 mb-3 text-gray2">
				Cek artikel-artikel di bawah ini!
			</SubHeader>

			{recommendedBlogPosts.map((blogPost) => (
				<RekomendasiCard
					className="mb-3 align-items-center"
					key={blogPost.slug}
					blogPost={blogPost}
				/>
			))}
		</div>
	);
};

const RekomendasiCard = ({ blogPost, className = "" }) => {
	const blogTopicsString = blogPost.blogTopics.reduce((acc, curr, ix) => {
		if (ix === 0) {
			return acc.concat(curr.topicName);
		} else {
			return acc.concat(`, ${curr.topicName}`);
		}
	}, "");
	return (
		<Link href={`/blog/${blogPost.slug}`}>
			<a className="text-decoration-none text-black">
				<CardContainer className={className}>
					{blogPost.thumbnail && (
						<div
							className="position-relative mr-2"
							style={{
								width: "90px",
								height: "73px",
								flexShrink: "0",
								overflow: "hidden",
								borderRadius: "8px",
							}}
						>
							<Image
								src={blogPost.thumbnail.url}
								alt={blogPost.shortDesc}
								layout="fill"
								objectFit="cover"
							/>
						</div>
					)}

					<div className="d-flex flex-column">
						<CardHeader as="h3">{blogPost.title}</CardHeader>
						<ShortDescText as="p" className="text-gray2 mt-3 mb-1">
							{blogPost.shortDesc.length >= 36
								? `${blogPost.shortDesc.slice(0, 30)}...`
								: blogPost.shortDesc}
						</ShortDescText>
						<TagsText className="text-gray2">
							{blogTopicsString.trim()}
						</TagsText>
					</div>
				</CardContainer>
			</a>
		</Link>
	);
};

export default Rekomendasi;
