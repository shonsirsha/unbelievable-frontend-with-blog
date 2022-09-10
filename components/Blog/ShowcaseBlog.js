import SearchBarBlog from "components/Search/SearchBarBlog";
import { HeadingSM } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
const OuterContainer = styled.div`
	height: 480px;
	width: 100%;
	padding-top: 112px;
	padding-bottom: 64px;
	display: flex;
	background: #31a4fa;
	background-image: linear-gradient(#080f3e, #31a4fa);
	align-items: center;
`;

export default function ShowcaseBlog({ title = "Title" }) {
	return (
		<OuterContainer>
			<Container>
				<HeadingSM as="h1" className="text-white">
					{title}
				</HeadingSM>
				<TextPrimary className="text-white mb-4">
					Cari artikel berdasarkan judul, kategori, topik
				</TextPrimary>

				<SearchBarBlog
					bigText
					barWidthPercent="90"
					onChange={(e) => {}}
					placeholder="Cari artikel (judul, kategori, topik)..."
				/>
			</Container>
		</OuterContainer>
	);
}
