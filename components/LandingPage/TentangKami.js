import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
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

const StyledCol = styled(Col)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
export default function TentangKami() {
	return (
		<div className="bg-primary1">
			<Container>
				<Row>
					<Col lg={6} md={12}>
						<StyledHeadingXXL>tumbuh</StyledHeadingXXL>
						<StyledTextPrimary className="mt-1 text-white">
							bersama komunitas
						</StyledTextPrimary>
						<StyledHeadingMD className="mt-2 text-blue">
							unbelieveable
						</StyledHeadingMD>
						<StyledImg src="/images/cat.jpeg" alt="image" />
					</Col>
					<StyledCol lg={6} md={12}>
						<TextPrimary className="text-white">
							UNBELIEVABLE merupakan sebuah komunitas yang ingin bersama
							meningkatkan kualitas hidup setiap individu di dunia dengan cara
							yang paling efektif
						</TextPrimary>

						<TextPrimary className="mt-4 text-white">
							Belajarlah bersama karakter spesial Unbelievable agar belajar
							lebih menyenangkan dan efektif!
						</TextPrimary>

						<TextPrimary className="mt-4 text-white">
							Setiap hari kamu akan merasakan perubahannya, bayangkan perubahan
							yang terjadi dalam waktu 1 tahun!
						</TextPrimary>
					</StyledCol>
				</Row>
			</Container>
		</div>
	);
}
