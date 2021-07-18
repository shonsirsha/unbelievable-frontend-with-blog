import Layout from "components/Layout";
import Showcase from "components/Showcase";
import { Container, Row, Col } from "react-bootstrap";
import { TextTertiary, TextPrimary } from "components/Typography/Text";
import { API_URL } from "config";
import styled from "styled-components";
import { MdHeadsetMic } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import Link from "next/link";
import SearchBar from "components/Search/SearchBar";
const TitleText = styled(TextPrimary)`
	font-size: 22px;
`;
const StyledContainer = styled(Container)`
	width: 100%;
	padding-top: 64px;
	a:hover {
		text-decoration: none;
	}
	padding-bottom: 56px;
`;
const TopicContainer = styled.div`
	padding: 16px;
	background: transparent;
	border: 1px solid #e8e8e8;
	border-radius: 8px;
	display: flex;
	justify-content: center;
`;
const Headset = styled(MdHeadsetMic)`
	font-size: 24px;
`;
const Mail = styled(BsEnvelope)`
	font-size: 24px;
`;
const StyledRow = styled(Row)`
	margin-left: 0;
	margin-right: 0;
`;
export default function index({ categories }) {
	return (
		<Layout showBurger={false} title="Pertanyaan | Unbelieveable" scrollToSolid>
			<Showcase title="Pertanyaan" />
			<StyledContainer>
				<StyledRow className="w-100 mb-5">
					<Col xl={12} className="d-flex justify-content-center">
						<SearchBar placeholder="Cari..." />
					</Col>
				</StyledRow>
				<StyledRow className="w-100 mb-5">
					<Col xl={12}>
						<TitleText as="h1" className="text-center text-gray2">
							Topik Bantuan
						</TitleText>
					</Col>
				</StyledRow>
				<StyledRow className="w-100">
					{categories.map((category, ix) => (
						<Col key={ix} className="mb-4" xl={4} md={6} sm={12}>
							<Link href={`/pertanyaan/topik/${category.slug}`}>
								<a>
									<TopicContainer>
										<TextTertiary className="text-gray2">
											{category.name}
										</TextTertiary>
									</TopicContainer>
								</a>
							</Link>
						</Col>
					))}
				</StyledRow>
				<StyledRow className="w-100 mt-4">
					<Col xl={12}>
						<TitleText className="text-center text-gray2">
							Atau hubungi kami
						</TitleText>
					</Col>

					<Col xl={12} className="mt-5">
						<div className="d-flex align-items-center justify-content-center flex-lg-row flex-md-row flex-column">
							<div className="d-flex mr-lg-4 mr-md-4 mr-0 mb-lg-0 mb-md-0 mb-3">
								<Headset className="mr-2" />
								<TextTertiary className="text-gray2">
									Hubungi Admin
								</TextTertiary>
							</div>
							<div className="d-flex">
								<Mail className="mr-2" />
								<TextTertiary className="text-gray2">Email Kami</TextTertiary>
							</div>
						</div>
					</Col>
				</StyledRow>
			</StyledContainer>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/question-categories`);
	const categories = await res.json();
	return {
		props: {
			categories,
		},
		revalidate: 1,
	};
}
