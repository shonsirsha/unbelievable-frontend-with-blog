import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import ShareOptions from "components/ShareOptions";
import { NEXT_URL } from "config";

const AuthorNameText = styled(HeadingXXS)`
	font-size: 12px;
`;

const ShortDescText = styled(TextTertiary)`
	font-size: 13px;
`;

const DateText = styled(TextTertiary)`
	font-size: 11px;
`;

const BlogTopicPill = styled.div`
	padding: 4px 10px;
	border-radius: 16px;
	background: #f2f2f2;
	font-size: 10px;
`;

const Author = ({ author: { name, profile_picture } }) => {
	return (
		<div className="d-flex align-items-center">
			<div
				className="position-relative mr-2"
				style={{
					width: "24px",
					height: "24px",
					maxWidth: "100%",
					overflow: "hidden",
					borderRadius: "100%",
				}}
			>
				<Image
					src={profile_picture.formats.thumbnail.url}
					alt={name}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<AuthorNameText as="p" className="text-black">
				{name}
			</AuthorNameText>
		</div>
	);
};

const BlogCardMain = ({
	blogPost: {
		title,
		blogAuthor,
		readTime,
		shortDesc,
		blogTopics,
		createdAt,
		thumbnail,
		slug,
	},
}) => {
	return (
		<div className="d-flex flex-column">
			<Link href={`/blog/${slug}`}>
				<a>
					<div
						className="position-relative mb-3"
						style={{
							width: "100%",
							height: "180px",
							maxWidth: "100%",
							overflow: "hidden",
							borderRadius: "24px",
						}}
					>
						<Image
							src={thumbnail.url}
							alt={title}
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<Author author={blogAuthor} />
					<HeadingXXS as="h2" className="mt-3 text-black">
						{title}
					</HeadingXXS>
					<ShortDescText className="text-gray2 mt-2">
						{shortDesc.length > 45 ? `${shortDesc.slice(0, 42)}...` : shortDesc}
					</ShortDescText>
					<div className="d-flex flex-wrap mt-1 text-gray2">
						<DateText>
							{moment(createdAt).format("D MMM")}&nbsp;·&nbsp;
						</DateText>
						<DateText>{readTime === 0 ? `1` : readTime} min read</DateText>
					</div>
				</a>
			</Link>

			<div className="d-flex flex-wrap mb-3">
				{blogTopics.map((topic) => (
					<Link href={`/blog-topik/${topic.topicId}`} key={topic.topicId}>
						<a className="text-gray2">
							<BlogTopicPill className="mr-1 mt-2" key={topic.topicId}>
								{topic.topicName}
							</BlogTopicPill>
						</a>
					</Link>
				))}
			</div>

			<ShareOptions blogPostSlug={slug} pageURL={`${NEXT_URL}/blog/${slug}`} />
		</div>
	);
};

export default BlogCardMain;
