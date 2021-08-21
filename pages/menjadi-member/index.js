import Layout from "components/Layout";
import Showcase from "components/Showcase";
import { Container } from "react-bootstrap";
import { TextPrimary, TextTertiary } from "components/Typography/Text";
import styled from "styled-components";
import Link from "next/link";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
import { BsCheck } from "react-icons/bs";

const StyledContainer = styled(Container)`
	width: 100%;
	padding-top: 64px;
	a:hover {
		text-decoration: none;
	}
	a {
		text-deocration: none;
		color: inherit;
	}
	padding-bottom: 56px;
`;
const PriceBox = styled.div`
	border-radius: 8px;
	padding: 16px;
	text-align: center;
`;

const StyledHeadingXS = styled(HeadingXS)`
	font-size: 10px;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
`;

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 14px;
`;

const StyledTextPrimary = styled(TextPrimary)`
	@media ${mediaBreakpoint.down.md} {
		font-size: 14px;
	}
`;

const ClassTypeBox = styled.div`
	display: flex;
	min-height: 320px;
	flex-direction: column;
	border-radius: 16px;
	width: 240px;
	height: 580px;
	.header {
		padding: 24px;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.body {
		padding: 24px;
		padding-top: 32px;
	}

	.separator {
		height: 1px;
		background: #606060;
		width: 110%;
		align-self: center;
		margin-top: 64px;
		margin-bottom: 16px;
	}
`;
const CheckMark = styled(BsCheck)`
	font-size: 24px;
	flex-shrink: 0;
	margin-right: 8px;
`;
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 14px;
`;
export default function index() {
	return (
		<Layout
			showBurger={false}
			title="Menjadi Member | Unbelieveable"
			scrollToSolid
		>
			<Showcase title="Menjadi Member" />
			<StyledContainer>
				<HeadingXS className="text-center text-blue">
					Jadilah luar biasa!
				</HeadingXS>
				<StyledTextPrimary className="text-center text-specialgray mt-2 mb-3">
					Unbelievable membuat setiap kelas dirancang khusus untuk penyampaian
					yang terbaik agar tercapai hasil yang maksimal! carilah kelas yang
					paling kalian minati, dan jadilah member Unbelievable dengan harga
					yang sangat murah
				</StyledTextPrimary>

				<div className="d-flex mt-5 justify-content-center flex-wrap">
					<ClassTypeBox className="shadow mb-md-0 mb-5 mr-md-5 mr-xs-0">
						<div className="d-flex flex-column bg-lightgray header">
							<HeadingXS className="text-center">
								FREE <br />
								membership
							</HeadingXS>
						</div>
						<div className="d-flex flex-column body">
							<PriceBox className="bg-blue">
								<StyledHeadingXXS className="text-white">
									GRATIS
								</StyledHeadingXXS>
							</PriceBox>
							<div className="separator"></div>
							<div className="feature-list d-flex flex-column w-100">
								<div className="d-flex">
									<CheckMark />
									<StyledTextTertiary>
										Free preview 1 video materi setiap kelas
									</StyledTextTertiary>
								</div>
							</div>
						</div>
					</ClassTypeBox>
					<Link href="/daftar-kelas">
						<a>
							<ClassTypeBox className="shadow">
								<div className="d-flex flex-column bg-lightgray header position-relative">
									<StyledHeadingXS as="p" className="text-center">
										rekomendasi
									</StyledHeadingXS>
									<HeadingXS as="p" className="text-center mt-1">
										beli <br />
										per-kelas
									</HeadingXS>
								</div>
								<div className="d-flex flex-column body">
									<PriceBox className="bg-blue">
										<StyledHeadingXXS as="p" className="text-white">
											IDR 399,000 / kelas
										</StyledHeadingXXS>
									</PriceBox>
									<div className="separator"></div>
									<div className="feature-list d-flex flex-column w-100">
										<div className="d-flex">
											<CheckMark />
											<StyledTextTertiary>
												Full akses materi kelas yang kamu minati
											</StyledTextTertiary>
										</div>
										<div className="d-flex mt-3">
											<CheckMark />
											<StyledTextTertiary>PDF Workbook</StyledTextTertiary>
										</div>
									</div>
								</div>
							</ClassTypeBox>
						</a>
					</Link>
				</div>
			</StyledContainer>
		</Layout>
	);
}
