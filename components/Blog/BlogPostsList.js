import Link from "next/link";
import Image from "next/image";
import { AiFillTag } from "react-icons/ai";
import styled from "styled-components";
import {
	HeadingSM,
	HeadingXS,
	HeadingXXS,
} from "components/Typography/Headings";
import ShareOptions from "components/ShareOptions";
import { NEXT_URL } from "config";
import { TextTertiary } from "components/Typography/Text";
import { mediaBreakpoint } from "utils/breakpoints";
import { dateDiffInDays } from "utils/dateDiffInDays";
import CustomisableBanner from "./CustomisableBanner";
const TopicPill = styled.div`
	padding: 8px 24px;
	min-width: 96px;
	background: #dbdbdb;
	border-radius: 18px;

	@media ${mediaBreakpoint.down.md} {
		padding: 8px 16px;
	}
`;

const TopicText = styled(HeadingXXS)`
	font-size: 12px;
	text-align: center;

	@media ${mediaBreakpoint.down.md} {
		font-size: 11px;
	}
`;

const TitleText = styled(HeadingXS)`
	font-size: 18px;
`;

const ReadTimeText = styled(TextTertiary)`
	font-size: 11px;
`;

const ShortDescText = styled(TextTertiary)`
	font-size: 13px;
`;

const TopicPillContainer = styled.div`
	@media ${mediaBreakpoint.down.md} {
		margin-left: -12px;
	}
`;

const SortButton = styled.a`
	border-radius: 16px;
	padding: 8px 42px;
	background: #fff;
	border: 1px solid #dbdbdb;
	color: #a5a5a5;
	transition: all 200ms ease;
	&.active,
	&:hover {
		color: #606060;
		border: 1px solid #7c7c7c;
	}
`;

const ListItem = ({
	blogPost: {
		title,
		slug,
		shortDesc,
		readTime,
		blogTopics,
		thumbnail,
		created_at,
	},
	className = "",
}) => {
	return (
		<div
			className={`d-flex ${className} flex-md-row flex-column-reverse justify-content-between `}
		>
			<div className={`d-flex flex-column`}>
				<Link href={`/blog/${slug}`}>
					<a className="mb-1">
						<TitleText className="text-black" as="h2">
							{title}
						</TitleText>
					</a>
				</Link>

				<ShortDescText className="text-gray2 mb-3">{shortDesc}</ShortDescText>

				<div className="d-flex flex-column">
					<ReadTimeText className="text-gray2">
						{dateDiffInDays(new Date(created_at), new Date())} ·{" "}
						{readTime === 0 ? `1` : readTime} menit membaca
					</ReadTimeText>

					<TopicPillContainer className="d-flex flex-wrap mt-2">
						{blogTopics.map((topic, ix) => (
							<Link href={`/blog-topik/${topic.topicId}`} key={topic.topicId}>
								<a className="text-gray2">
									<TopicPill
										className={`${ix > 0 ? `ml-md-2` : `ml-md-0`} mb-3 ml-3`}
									>
										<TopicText as="p">{topic.topicName}</TopicText>
									</TopicPill>
								</a>
							</Link>
						))}
					</TopicPillContainer>
				</div>

				<ShareOptions
					twitter={false}
					linkedin={false}
					fb={false}
					blogPostSlug={slug}
					pageURL={`${NEXT_URL}/blog/${slug}`}
				/>
			</div>

			{thumbnail && (
				<Link href={`/blog/${slug}`}>
					<a>
						<div
							className="position-relative ml-md-5 ml-0 mb-3 mb-md-0 shadow-md"
							style={{
								width: "277px",
								height: "189px",
								flexShrink: "0",
								overflow: "hidden",
							}}
						>
							<Image
								src={thumbnail.url}
								alt={shortDesc}
								layout="fill"
								objectFit="cover"
							/>
						</div>
					</a>
				</Link>
			)}
		</div>
	);
};

const BlogPostsList = ({
	pageTitle = "",
	blogPosts = [],
	currentURL = "",
	sortBy = "",
	subtitle = "",
	paramSeparator = "?",
}) => {
	return (
		<div className="d-flex flex-column">
			<div className="d-flex align-items-center">
				<AiFillTag size="32" />
				<HeadingSM className="ml-2" as="h1">
					{pageTitle}
				</HeadingSM>
			</div>
			<TextTertiary className="mt-2 text-gray2" as="h3">
				{subtitle}
			</TextTertiary>

			<div className="d-flex my-5">
				<Link passHref href={`${currentURL}${paramSeparator}sortBy=trending`}>
					<SortButton className={`${sortBy === "trending" && `active`} mr-2`}>
						Trending
					</SortButton>
				</Link>

				<Link passHref href={`${currentURL}${paramSeparator}sortBy=terbaru`}>
					<SortButton className={`${sortBy === "terbaru" && `active`} mr-2`}>
						Terbaru
					</SortButton>
				</Link>

				<Link passHref href={`${currentURL}${paramSeparator}sortBy=terbaik`}>
					<SortButton className={`${sortBy === "terbaik" && `active`}`}>
						Terbaik
					</SortButton>
				</Link>
			</div>
			{blogPosts.map((blogPost, ix) => (
				<>
					{blogPosts.length > 3 ? (
						<>
							{ix === 3 ? (
								<CustomisableBanner className="mb-5" />
							) : (
								<ListItem
									key={blogPost.id}
									blogPost={blogPost}
									className={`mb-5 mt-2`}
								/>
							)}
						</>
					) : (
						<>
							{ix === blogPosts.length - 1 ? (
								<>
									<ListItem
										key={blogPost.id}
										blogPost={blogPost}
										className={`mb-5 mt-2`}
									/>
									<CustomisableBanner />
								</>
							) : (
								<ListItem
									key={blogPost.id}
									blogPost={blogPost}
									className={`mb-5 mt-2`}
								/>
							)}
						</>
					)}
				</>
			))}
		</div>
	);
};

export default BlogPostsList;
