import styled from "styled-components";
import { Row, Col, Image } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
import HalfHalf from "components/HalfHalf/HalfHalf";
const StyledHeadingXXL = styled(HeadingXXL)`
	color: #a5a5a5;
`;
const StyledTextPrimary = styled(TextPrimary)`
	font-size: 30px;
`;
const StyledHeadingMD = styled(HeadingMD)`
	text-transform: uppercase;
`;
const StyledImg = styled(Image)`
	width: 80%;
	margin-top: 48px;
	border-radius: 8px;
`;

export default function TentangKami() {
	const left = (
		<>
			<StyledHeadingXXL>tumbuh</StyledHeadingXXL>;
			<StyledTextPrimary className="mt-1 text-white">
				bersama komunitas
			</StyledTextPrimary>
			<StyledHeadingMD className="mt-2 text-blue">
				Unbelieveable
			</StyledHeadingMD>
			<StyledImg src="/images/cat.jpeg" alt="image" />
		</>
	);

	const right = (
		<>
			<TextPrimary className="text-white">
				UNBELIEVABLE merupakan sebuah komunitas yang ingin bersama meningkatkan
				kualitas hidup setiap individu di dunia dengan cara yang paling efektif
			</TextPrimary>
			<TextPrimary className="mt-4 text-white">
				Belajarlah bersama karakter spesial Unbelievable agar belajar lebih
				menyenangkan dan efektif!
			</TextPrimary>
			<TextPrimary className="mt-4 text-white">
				Setiap hari kamu akan merasakan perubahannya, bayangkan perubahan yang
				terjadi dalam waktu 1 tahun!
			</TextPrimary>
		</>
	);
	return (
		<HalfHalf left={left} right={right} />
		// <OuterContainer className="bg-primary1">
		// 	<Container>
		// 		{/* <StyledRow>
		// 			<Col lg={6} md={12}>
		// 				<StyledHeadingXXL>tumbuh</StyledHeadingXXL>
		// 				<StyledTextPrimary className="mt-1 text-white">
		// 					bersama komunitas
		// 				</StyledTextPrimary>
		// 				<StyledHeadingMD className="mt-2 text-blue">
		// 					Unbelieveable
		// 				</StyledHeadingMD>
		// 				<StyledImg src="/images/cat.jpeg" alt="image" />
		// 			</Col>
		// 			<StyledCol lg={6} md={12}>
		// 				<TextPrimary className="text-white">
		// 					UNBELIEVABLE merupakan sebuah komunitas yang ingin bersama
		// 					meningkatkan kualitas hidup setiap individu di dunia dengan cara
		// 					yang paling efektif
		// 				</TextPrimary>

		// 				<TextPrimary className="mt-4 text-white">
		// 					Belajarlah bersama karakter spesial Unbelievable agar belajar
		// 					lebih menyenangkan dan efektif!
		// 				</TextPrimary>

		// 				<TextPrimary className="mt-4 text-white">
		// 					Setiap hari kamu akan merasakan perubahannya, bayangkan perubahan
		// 					yang terjadi dalam waktu 1 tahun!
		// 				</TextPrimary>
		// 			</StyledCol>
		// 		</StyledRow> */}
		// 	</Container>
		// </OuterContainer>
	);
}

{
	/* <StyledRow>
	<Col lg={6} md={12}>
		<HeadingMD className="mt-1 text-white">dengan</HeadingMD>
		<HeadingXXL className="mt-2 text-blue">TERBAIK</HeadingXXL>
		<HeadingMD className="mt-1 text-white">di bidangnya</HeadingMD>
	</Col>
	<StyledCol lg={6} md={12}>
		<div className="d-flex flex-lg-row flex-column">
			<div className="d-flex flex-column align-items-center mr-lg-5 mr-0">
				<Image src="/images/plcholder.png" width={160} />
				<TextSecondary className="mt-5 text-white text-justify">
					Eric Christopher Simowibowo, mentor course How to be confident 21
					days, berlatar pendidikan di universitas ternama dan pengalaman di
					bidang graphology selama 12 tahun
				</TextSecondary>
			</div>
			<div className="d-flex flex-column align-items-center">
				<Image src="/images/plcholder.png" width={160} />
				<TextSecondary className="mt-5 text-white text-justify">
					William Christopher Simowibowo, Enteprenur muda yang berpengalaman di
					bidang kebugaran dan kesehatan Telah disertifikasi di negara Eropa dan
					sudah mengajar banyak siswa kurang lebih 5 tahun
				</TextSecondary>
			</div>
		</div>
	</StyledCol>
</StyledRow>; */
}
