import { useContext } from "react";
import { HeadingSM } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import { FormLabel, FormGroup, Form } from "react-bootstrap";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
const OuterContainer = styled.div`
	max-width: 60%;
`;
const StyledFormLabel = styled(FormLabel)`
	font-size: 14px;
`;
const StyledTextArea = styled(Form.Control)`
	border-radius: 8px;
	height: 180px;
	width: 100%;
	padding: 10px;
	font-size: 14px;
`;
export default function Masukkan() {
	const { logout } = useContext(AuthContext);

	return (
		<Layout
			title="Masukkan | Unbelieveable"
			background="#171b2d"
			withMargin
			mainApp
			showReviewBlock={false}
		>
			<OuterContainer className="d-flex flex-column">
				<HeadingSM className="mb-2">tulis masukkan</HeadingSM>

				<TextPrimary className="mt-5 specialgray">
					Terima kasih, Heroes! Karena kamu akan membuat platform ini menjadi
					lebih baik lagi dengan memberikan masukkan dan saran kepada kami agar
					lebih baik lagi ke depannya!
				</TextPrimary>

				<TextPrimary className="mt-3 specialgray">
					Masukkan apa yang mau Anda berikan?
				</TextPrimary>

				<FormGroup className="mt-4 text-gray2">
					<StyledFormLabel>Kategori</StyledFormLabel>

					<Form.Select aria-label="Default select example"></Form.Select>
					{/* <StyledFormControl
						type="email"
						onBlur={() => setFocus("")}
						onFocus={() => setFocus("focus")}
						className={"shadow-none"}
						name="email"
						value={email}
						onChange={handleChange}
						placeholder="email@contoh.com"
					/> */}
				</FormGroup>
				<FormGroup className="mt-4 text-gray2">
					<StyledFormLabel>Masukkan</StyledFormLabel>
					{/* <StyledFormControl
						type="email"
						onBlur={() => setFocus("")}
						onFocus={() => setFocus("focus")}
						className={"shadow-none"}
						name="email"
						value={email}
						onChange={handleChange}
						placeholder="email@contoh.com"
					/> */}
					<StyledTextArea
						as="textarea"
						placeholder="Silahkan tulis masukkan dan pendapat Anda"
					/>
				</FormGroup>
			</OuterContainer>
		</Layout>
	);
}
``;
