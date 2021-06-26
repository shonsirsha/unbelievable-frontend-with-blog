import styled from "styled-components";
import HalfHalf from "components/HalfHalf/HalfHalf";
import { TextPrimary, TextSecondary } from "components/Typography/Text";
import {
	HeadingLG,
	HeadingXXL,
	HeadingXS,
	HeadingSM,
} from "components/Typography/Headings";
const StyledTextSecondary = styled(TextSecondary)`
	max-width: 260px;
	text-align: justify;
`;
const StyledHeadingXXL = styled(HeadingXXL)`
	font-size: 96px;
	margin-right: ${(props) => (props.nth === 0 ? `80` : `64`)}px;
`;
const StyledHeadingXS = styled(HeadingXS)`
	font-size: 18px;
`;
export default function CaraKerja() {
	const caraKerja = [
		{
			title: "Berubah setiap hari dengan Kelas Khusus UNBELIEVABLE",
			body: "Kelas unbelievable dirancang sangat menyenangkan seperti bermain game, setiap hari belajar hanya 10-20 menit dan rasakan perubahannya!",
		},
		{
			title: "Bersama komunitas khusus Unbelievable",
			body: "Kamu akan bertemu dengan para pahlawan lainnya untuk saling mendukung menjadi pribadi yang lebih baik lagi!",
		},
		{
			title: "Bergabunglah bersama para pahlawan!",
			body: "Setiap bulan kamu akan mendapatkan sebuah perubahan baru, baik itu menjadi percaya diri, badan fit, menjadi orang tua yang baik. Bayangkan hal yang bisa kamu dapatkan dalam waktu 1 tahun?",
		},
	];
	const left = (
		<>
			<HeadingLG as="h2">bagaimana</HeadingLG>
			<HeadingSM as="h2" className="mt-1 text-blue">
				cara kerjanya?
			</HeadingSM>
		</>
	);

	const right = (
		<>
			<div className="d-flex flex-column">
				{caraKerja.map((item, ix) => (
					<div key={ix} className="mb-3 d-flex align-items-center">
						<StyledHeadingXXL nth={ix} className="text-lightblue" as="p">
							{ix + 1}
						</StyledHeadingXXL>
						<div className=" d-flex flex-column">
							<StyledHeadingXS as="h3" className="mb-1">
								{item.title}
							</StyledHeadingXS>
							<StyledTextSecondary>{item.body}</StyledTextSecondary>
						</div>
					</div>
				))}
			</div>
		</>
	);
	return <HalfHalf left={left} right={right} light />;
}
