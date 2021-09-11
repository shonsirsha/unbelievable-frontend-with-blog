import { useContext, useRef, useState } from "react";
import { HeadingSM, HeadingXXS } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Text";
import { FormLabel, FormGroup, Form, Button } from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";
import { API_URL } from "config";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
import Swal from "sweetalert2";
import { whitespace } from "utils/whitespace";
import withAuth from "utils/withAuth";

const OuterContainer = styled.div`
	max-width: 60%;
	@media ${mediaBreakpoint.down.lg} {
		max-width: 100%;
	}
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

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f4f4f7 inset !important;
	}
	&:focus {
		outline: none;
	}
`;
const Select = styled(Form)`
	appearance: none;
	padding: 16px;
	border-radius: 8px;
	border: none;
	background: #f6f6f6;
	background-image: url("/images/dropdown-caret.svg");
	background-repeat: no-repeat;
	background-position-x: 98%;
	background-position-y: 21px;
	font-size: 14px;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f4f4f7 inset !important;
	}
	&:focus {
		outline: none;
	}
`;

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 12px 24px;
	width: 100%;
	max-width: 180px;
`;

const Masukkan = ({ categories }) => {
	const { token } = useContext(AuthContext);
	const [categoriesId, setCategoriesId] = useState([
		categories ? categories[0].id : null,
	]);
	const [loading, setLoading] = useState(false);
	const textAreaRef = useRef();

	const handleSubmit = async () => {
		if (!loading) {
			setLoading(true);
			if (!whitespace(textAreaRef.current.value)) {
				const res = await fetch(`${API_URL}/feedbacks`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						feedback_text: textAreaRef.current.value,
						category: {
							id: parseInt(categoriesId) ? parseInt(categoriesId) : -1,
						},
					}),
				});

				if (res.ok) {
					textAreaRef.current.value = "";
					Swal.fire({
						title: "Masukkan Terkirim!",
						text: "Terima kasih karena kamu akan membuat platform ini menjadi lebih baik lagi",
						icon: "success",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Tutup",
					});
					setLoading(false);
				} else {
					setLoading(false);
					Swal.fire({
						title: "Ups...",
						text: "Mohon maaf telah terjadi kesalahan dalam mengirim masukan. Mohon coba lagi dan hubungi admin jika kesalahan ini tetap terjadi. Terima kasih.",
						icon: "error",
						confirmButtonColor: "#171b2d",
						confirmButtonText: "Tutup",
					});
				}
			} else {
				setLoading(false);
				Swal.fire({
					title: "Pemberitahuan",
					text: "Kolom teks masukkan tidak dapat kosong",
					icon: "warning",
					confirmButtonColor: "#171b2d",
					confirmButtonText: "Tutup",
				});
			}
		}
	};

	return (
		<Layout
			title="Masukkan | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
			showReviewBlock={false}
		>
			<OuterContainer className="d-flex flex-column">
				<>
					<HeadingSM className="mb-2">tulis masukkan</HeadingSM>
					<TextPrimary className="mt-3 mt-lg-5 specialgray">
						Terima kasih, Heroes! Karena kamu akan membuat platform ini menjadi
						lebih baik lagi dengan memberikan masukkan dan saran kepada kami
						agar lebih baik lagi ke depannya!
					</TextPrimary>
					<TextPrimary className="mt-3 specialgray">
						Masukkan apa yang mau Anda berikan?
					</TextPrimary>
					{categories.length > 0 && (
						<FormGroup className="d-flex flex-column mt-4 text-gray2">
							<StyledFormLabel>Kategori</StyledFormLabel>

							<Select
								onChange={(e) => setCategoriesId(e.target.value)}
								as="select"
								aria-label="Default select example"
							>
								{categories.map((c) => (
									<option key={c.id} value={c.id}>
										{c.name}
									</option>
								))}
							</Select>
						</FormGroup>
					)}

					<FormGroup className="mt-4 text-gray2">
						<StyledFormLabel>Masukkan</StyledFormLabel>

						<StyledTextArea
							ref={textAreaRef}
							as="textarea"
							placeholder="Silahkan tulis masukkan dan pendapat Anda"
						/>
					</FormGroup>
					<EnrollBtn
						disabled={loading}
						onClick={handleSubmit}
						className="bg-primary1 mt-2"
					>
						<HeadingXXS>Submit</HeadingXXS>
					</EnrollBtn>
				</>
			</OuterContainer>
		</Layout>
	);
};
export default withAuth(Masukkan);
export async function getStaticProps() {
	const res = await fetch(`${API_URL}/feedback-categories`);
	const categories = await res.json();
	return {
		props: {
			categories,
		},
		revalidate: 1,
	};
}
