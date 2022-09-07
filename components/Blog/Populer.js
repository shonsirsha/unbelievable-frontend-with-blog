import React from "react";
import styled from "styled-components";
import HeaderTextBig from "./HeaderTextBig";
import { TextTertiary } from "components/Typography/Text";
import { HeadingXXS, HeadingMD } from "components/Typography/Headings";
import Link from "next/link";

const CardHeader = styled(HeadingXXS)`
	font-size: 13px;
`;

const TagsText = styled(TextTertiary)`
	font-size: 10px;
`;

const IndexText = styled(HeadingMD)`
	color: #989898;
`;

const Populer = ({ popularBlogPosts = [] }) => {
	return (
		<div className="d-flex flex-column">
			<HeaderTextBig className="mb-4">Artikel Populer</HeaderTextBig>

			{popularBlogPosts.map((blogPost, ix) => (
				<PopulerCard
					ix={ix}
					className="mb-3 align-items-center"
					key={blogPost.slug}
					blogPost={blogPost}
				/>
			))}
		</div>
	);
};

const PopulerCard = ({ blogPost, ix, className = "" }) => {
	return (
		<Link href={`/blog/${blogPost.slug}`}>
			<a className="text-decoration-none text-black">
				<div className={`${className} d-flex`}>
					<IndexText as="p" className="mr-3">
						0{ix + 1}
					</IndexText>
					<div className="d-flex flex-column">
						<CardHeader as="h3">{blogPost.title}</CardHeader>
						<TagsText className="text-gray2">
							{blogPost.shortDesc.length >= 36
								? `${blogPost.shortDesc.slice(0, 35)}...`
								: blogPost.shortDesc}
						</TagsText>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default Populer;
