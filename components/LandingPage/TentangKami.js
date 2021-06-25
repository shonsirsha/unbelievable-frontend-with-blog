import styled from "styled-components";
import { Image } from "react-bootstrap";
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
			<StyledHeadingXXL as="h2">tumbuh</StyledHeadingXXL>
			<StyledTextPrimary as="h2" className="text-white">
				bersama komunitas
			</StyledTextPrimary>
			<StyledHeadingMD as="h2" className="mt-1 text-blue">
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
	return <HalfHalf left={left} right={right} />;
}
