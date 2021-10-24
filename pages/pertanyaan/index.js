import { useState, useEffect } from "react";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import {
	TextTertiary,
	TextSecondary,
	TextPrimary,
} from "components/Typography/Text";
import { API_URL } from "config";
import styled from "styled-components";
import { MdHeadsetMic } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { Image } from "react-bootstrap";
import SearchBar from "components/Search/SearchBar";
import { whitespace } from "utils/whitespace";
import { HeadingXXS } from "components/Typography/Headings";
import Linkify from "react-linkify";

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
const StyledAccordion = styled(Accordion)`
	& button {
		background: none;
		border: none;
		width: 100%;
	}
	.accordion-body {
		padding-top: 32px;
	}
	.accordion-header {
		margin: 0;
	}
	& .accordion-body {
		padding-left: 48px;
		padding-right: 24px;
		padding-bottom: 24px;
	}
	border: 2px solid #e8e8e8;
	padding: 16px;
	padding-top: 10px;
	padding-bottom: 12px;
	border-radius: 10px;
`;
export default function Index({ questions, siteData }) {
	const [questionsState, setQuestionsState] = useState(questions);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		if (!whitespace(keyword)) {
			const filteredCategories = questions.filter((que) =>
				que.title.toLowerCase().includes(keyword.toLowerCase())
			);
			setQuestionsState(filteredCategories);
		} else {
			setQuestionsState(questions);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	return (
		<Layout showBurger={false} title="Pertanyaan | Unbelievable" scrollToSolid>
			<Showcase title="Pertanyaan" />

			<StyledContainer>
				<StyledRow className="w-100 mb-5">
					<Col xl={12} className="d-flex justify-content-center">
						<SearchBar
							onChange={(e) => setKeyword(e.target.value)}
							placeholder="Cari..."
						/>
					</Col>
				</StyledRow>

				<StyledRow className="w-100">
					{questionsState.map((q, ix) => (
						<Col key={q.title} className="mb-4" md={6} sm={12}>
							<StyledAccordion flush>
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										<div className="d-flex align-items-center">
											<>
												<Image
													src={`/images/qmark.png`}
													alt="Question Mark"
													width={27}
													height={27}
													className="mr-3"
												/>
												<HeadingXXS as="p" className="text-gray2">
													{q.title}
												</HeadingXXS>

												{/* <Image
													src={`/images/dropdown-caret.svg`}
													alt="Question Mark"
													width={27}
													height={27}
													className="ml-auto"
												/> */}
											</>
										</div>
									</Accordion.Header>
									<Accordion.Body>
										<TextSecondary style={{ whiteSpace: "pre-line" }}>
											<Linkify
												componentDecorator={(
													decoratedHref,
													decoratedText,
													key
												) => (
													<a target="blank" href={decoratedHref} key={key}>
														{decoratedText}
													</a>
												)}
											>
												{q.content}
											</Linkify>
										</TextSecondary>
									</Accordion.Body>
								</Accordion.Item>
							</StyledAccordion>
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
							<a
								rel="noopener noreferrer"
								target="_blank"
								href={`https://api.whatsapp.com/send?phone=${siteData.whatsapp_number}`}
							>
								<div className="d-flex mr-lg-4 mr-md-4 mr-0 mb-lg-0 mb-md-0 mb-3">
									<Headset className="mr-2" />
									<TextTertiary className="text-gray2">
										Hubungi Admin
									</TextTertiary>
								</div>
							</a>
							<a href={`mailto:${siteData.email}`}>
								<div className="d-flex">
									<Mail className="mr-2" />
									<TextTertiary className="text-gray2">Email Kami</TextTertiary>
								</div>
							</a>
						</div>
					</Col>
				</StyledRow>
			</StyledContainer>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/questions`);
	const resSiteData = await fetch(`${API_URL}/sitedata`);

	const questions = await res.json();
	const siteData = await resSiteData.json();

	return {
		props: {
			questions,
			siteData,
		},
		revalidate: 1,
	};
}
