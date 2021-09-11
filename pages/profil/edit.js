import { useContext, useRef, useState } from "react";
import {
	HeadingSM,
	HeadingXS,
	HeadingXXS,
} from "components/Typography/Headings";
import {
	FormLabel,
	FormGroup,
	Form,
	Button,
	FormControl,
	FormCheck,
} from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";
import { API_URL } from "config";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
import Swal from "sweetalert2";
import { whitespace } from "utils/whitespace";
import withAuth from "utils/withAuth";

const OuterContainer = styled.div`
	width: 100%;

	@media ${mediaBreakpoint.down.lg} {
		max-width: 100%;
	}
`;
const StyledFormLabel = styled(FormLabel)`
	font-size: 14px;
	color: #606060;
`;
const StyledTextArea = styled(Form.Control)`
	border-radius: 8px;
	height: 140px;
	max-width: 100%;
	width: 960px;

	padding: 10px;
	font-size: 14px;
	border-color: #e8e8e8;
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

	width: 480px;
	max-width: 100%;

	@media ${mediaBreakpoint.down.xl} {
		width: 100%;
	}
`;

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 12px 24px;
	width: 100%;
	max-width: 180px;
`;

const StyledFormControl = styled(FormControl)`
	border: none;
	border-radius: 6px;
	padding: 24px;
	background: #f4f4f7;
	transition: 0.5s;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #f4f4f7 inset !important;
	}
	&:focus {
		background: #e8e8e8;
		outline: none;
	}

	&.transparent {
		background: transparent;
		border: 1px solid #e8e8e8;
	}
`;

const FormControlContainer = styled.div`
	width: 480px;
	max-width: 100%;

	@media ${mediaBreakpoint.down.xl} {
		width: 100%;
	}
`;
const Radio = styled(FormCheck)`
	& input {
		width: 19px;
		height: 19px;
		margin-top: 2px;
	}
	& label {
		margin-left: 4px;
	}
`;
const Masukkan = ({ categories }) => {
	const { token } = useContext(AuthContext);
	const [categoriesId, setCategoriesId] = useState([
		categories ? categories[0].id : null,
	]);
	const [loading, setLoading] = useState(false);
	const textAreaRef = useRef();

	const datex = new Date();
	const today = `${datex.getFullYear()}-${
		datex.getMonth() + 1 < 10
			? `0${datex.getMonth() + 1}`
			: datex.getMonth() + 1
	}-${datex.getDate() < 10 ? `0${datex.getDate()}` : datex.getDate()}`;

	const country_list = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Anguilla",
		"Antigua &amp; Barbuda",
		"Argentina",
		"Armenia",
		"Aruba",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia",
		"Bosnia &amp; Herzegovina",
		"Botswana",
		"Brazil",
		"British Virgin Islands",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cambodia",
		"Cameroon",
		"Cape Verde",
		"Cayman Islands",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Congo",
		"Cook Islands",
		"Costa Rica",
		"Cote D Ivoire",
		"Croatia",
		"Cruise Ship",
		"Cuba",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Estonia",
		"Ethiopia",
		"Falkland Islands",
		"Faroe Islands",
		"Fiji",
		"Finland",
		"France",
		"French Polynesia",
		"French West Indies",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Gibraltar",
		"Greece",
		"Greenland",
		"Grenada",
		"Guam",
		"Guatemala",
		"Guernsey",
		"Guinea",
		"Guinea Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Isle of Man",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jersey",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kuwait",
		"Kyrgyz Republic",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macau",
		"Macedonia",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Montserrat",
		"Morocco",
		"Mozambique",
		"Namibia",
		"Nepal",
		"Netherlands",
		"Netherlands Antilles",
		"New Caledonia",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Norway",
		"Oman",
		"Pakistan",
		"Palestine",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Reunion",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Pierre &amp; Miquelon",
		"Samoa",
		"San Marino",
		"Satellite",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"South Africa",
		"South Korea",
		"Spain",
		"Sri Lanka",
		"St Kitts &amp; Nevis",
		"St Lucia",
		"St Vincent",
		"St. Lucia",
		"Sudan",
		"Suriname",
		"Swaziland",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor L'Este",
		"Togo",
		"Tonga",
		"Trinidad &amp; Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Turks &amp; Caicos",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"Uruguay",
		"Uzbekistan",
		"Venezuela",
		"Vietnam",
		"Virgin Islands (US)",
		"Yemen",
		"Zambia",
		"Zimbabwe",
	];

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
			title="Profil | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
		>
			<OuterContainer className="d-flex flex-column">
				<>
					<HeadingSM className="mb-2">edit profil</HeadingSM>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Nama Depan</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="first_name"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0"
								// onChange={handleChange}
								value={""}
								placeholder="Nama Depan"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Nama Depan</StyledFormLabel>
							<StyledFormControl
								type="text"
								className={"shadow-none"}
								name="last_name"
								value={""}
								// onChange={}
								placeholder="Nama Belakang"
							/>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Jenis Kelamin</StyledFormLabel>
							<div className="d-flex w-100">
								<Radio
									type={"radio"}
									className="mr-3"
									name="gender"
									label={`Perempuan`}
								/>
								<Radio type={"radio"} label={`Laki-laki`} name="gender" />
							</div>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Tanggal Lahir</StyledFormLabel>
							<StyledFormControl
								type="date"
								name="dob"
								className="mr-xl-2 shadow-none"
								// onChange={handleChange}
								// value={dob}
								max={today}
								placeholder="Date"
							/>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-column text-gray2">
						<StyledFormLabel>Biodata</StyledFormLabel>
						<StyledTextArea
							ref={textAreaRef}
							as="textarea"
							placeholder="Silahkan tulis masukkan dan pendapat Anda"
						/>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Nomor handphone</StyledFormLabel>
							<StyledFormControl
								type="text"
								className={"shadow-none"}
								name="phone"
								value={""}
								// onChange={}
								placeholder="Nomor handphone"
							/>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-column text-gray2">
						<StyledFormLabel>Negara</StyledFormLabel>

						<Select
							onChange={(e) => setCategoriesId(e.target.value)}
							as="select"
							aria-label="Default select example"
							defaultValue="Indonesia"
						>
							{country_list.map((c, ix) => (
								<option defaultValue="Indonesia" key={ix} value={c}>
									{c}
								</option>
							))}
						</Select>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap text-gray2">
						<FormControlContainer className="d-flex flex-column mr-xl-4 mr-0">
							<StyledFormLabel>Provinsi</StyledFormLabel>

							<Select
								onChange={(e) => setCategoriesId(e.target.value)}
								as="select"
								aria-label="Default select example"
								defaultValue="Indonesia"
							>
								{[].map((c, ix) => (
									<option defaultValue="Indonesia" key={ix} value={c}>
										{c}
									</option>
								))}
							</Select>
						</FormControlContainer>

						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Kota / Kabupaten</StyledFormLabel>

							<Select
								onChange={(e) => setCategoriesId(e.target.value)}
								as="select"
								aria-label="Default select example"
								defaultValue="Indonesia"
							>
								{[].map((c, ix) => (
									<option defaultValue="Indonesia" key={ix} value={c}>
										{c}
									</option>
								))}
							</Select>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap text-gray2">
						<FormControlContainer className="d-flex flex-column mr-xl-4 mr-0">
							<StyledFormLabel>Status</StyledFormLabel>

							<Select
								onChange={(e) => setCategoriesId(e.target.value)}
								as="select"
								aria-label="Default select example"
								defaultValue="Indonesia"
							>
								{[].map((c, ix) => (
									<option defaultValue="Indonesia" key={ix} value={c}>
										{c}
									</option>
								))}
							</Select>
						</FormControlContainer>
					</FormGroup>

					<HeadingXXS className="mb-2 mt-4">your social media</HeadingXXS>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Instagram</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="instagram"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								// onChange={handleChange}
								value={""}
								placeholder="Instagram"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Twitter</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="twitter"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								// onChange={handleChange}
								value={""}
								placeholder="@user_name"
							/>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Facebook</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="facebook"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								// onChange={handleChange}
								value={""}
								placeholder="facebook.com/user_name"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>YouTube</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="youtube"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								// onChange={handleChange}
								value={""}
								placeholder="YouTube url"
							/>
						</FormControlContainer>
					</FormGroup>

					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Blog</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="facebook"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								// onChange={handleChange}
								value={""}
								placeholder="blog url"
							/>
						</FormControlContainer>
					</FormGroup>

					<EnrollBtn
						disabled={loading}
						onClick={handleSubmit}
						className="bg-primary1 mt-5 shadow"
					>
						<HeadingXXS>Simpan</HeadingXXS>
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
