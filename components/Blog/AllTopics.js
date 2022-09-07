import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";

const HeaderText = styled(HeadingXXS)`
	font-size: 12px;
`;

const TopicTile = styled.div`
	padding: 4px 8px;
	border: 1px solid #cecccc;
	border-radius: 4px;
`;

const TopicText = styled(TextTertiary)`
	font-size: 12px;
`;

const AllTopics = ({ allTopics = [] }) => {
	return (
		<div className="d-flex flex-column">
			<HeaderText as="h2">DISCOVER MORE OF WHAT MATTERS TO YOU</HeaderText>
			<div className="d-flex flex-wrap mt-2">
				{allTopics.map((topic) => (
					<Link href={`/blog-topik/${topic.topicId}`} key={topic.topicId}>
						<a>
							<TopicTile className="mr-2 mb-2">
								<TopicText as="h3" className="text-gray2">
									{topic.topicName}
								</TopicText>
							</TopicTile>
						</a>
					</Link>
				))}
			</div>
		</div>
	);
};

export default AllTopics;
