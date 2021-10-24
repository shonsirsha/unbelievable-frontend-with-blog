import { useContext, useState, useEffect, useRef } from "react";
import { HeadingSM, HeadingXXS } from "components/Typography/Headings";
import {
	FormLabel,
	FormGroup,
	Form,
	Button,
	FormControl,
	FormCheck,
	Image,
} from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";
import { API_URL } from "config";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
import { whitespace } from "utils/whitespace";
import withAuth from "utils/withAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextSecondary } from "components/Typography/Text";
import moment from "moment";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";

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
	padding: 24px 16px;
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

const AvatarContainer = styled(Image)`
	object-fit: cover;
	border-radius: 100%;
`;

const FormLabelContainer = styled.div`
	width: 960px;
	max-width: 100%;

	@media ${mediaBreakpoint.down.xl} {
		width: 100%;
	}
`;

const Edit = () => {
	const { token, user, setUser } = useContext(AuthContext);

	const [userState, setUserState] = useState(user ? user : null);
	const [loading, setLoading] = useState(false);
	const [citiesLoading, setCitiesLoading] = useState(false);
	const [profilePicLoading, setProfilePicLoading] = useState(false);
	const [cities, setCities] = useState([]);
	const fileSelectorRef = useRef();
	const [indoProvinces] = useState([
		{
			id: 11,
			nama: "Aceh",
		},
		{
			id: 12,
			nama: "Sumatera Utara",
		},
		{
			id: 13,
			nama: "Sumatera Barat",
		},
		{
			id: 14,
			nama: "Riau",
		},
		{
			id: 15,
			nama: "Jambi",
		},
		{
			id: 16,
			nama: "Sumatera Selatan",
		},
		{
			id: 17,
			nama: "Bengkulu",
		},
		{
			id: 18,
			nama: "Lampung",
		},
		{
			id: 19,
			nama: "Kepulauan Bangka Belitung",
		},
		{
			id: 21,
			nama: "Kepulauan Riau",
		},
		{
			id: 31,
			nama: "DKI Jakarta",
		},
		{
			id: 32,
			nama: "Jawa Barat",
		},
		{
			id: 33,
			nama: "Jawa Tengah",
		},
		{
			id: 34,
			nama: "DI Yogyakarta",
		},
		{
			id: 35,
			nama: "Jawa Timur",
		},
		{
			id: 36,
			nama: "Banten",
		},
		{
			id: 51,
			nama: "Bali",
		},
		{
			id: 52,
			nama: "Nusa Tenggara Barat",
		},
		{
			id: 53,
			nama: "Nusa Tenggara Timur",
		},
		{
			id: 61,
			nama: "Kalimantan Barat",
		},
		{
			id: 62,
			nama: "Kalimantan Tengah",
		},
		{
			id: 63,
			nama: "Kalimantan Selatan",
		},
		{
			id: 64,
			nama: "Kalimantan Timur",
		},
		{
			id: 65,
			nama: "Kalimantan Utara",
		},
		{
			id: 71,
			nama: "Sulawesi Utara",
		},
		{
			id: 72,
			nama: "Sulawesi Tengah",
		},
		{
			id: 73,
			nama: "Sulawesi Selatan",
		},
		{
			id: 74,
			nama: "Sulawesi Tenggara",
		},
		{
			id: 75,
			nama: "Gorontalo",
		},
		{
			id: 76,
			nama: "Sulawesi Barat",
		},
		{
			id: 81,
			nama: "Maluku",
		},
		{
			id: 82,
			nama: "Maluku Utara",
		},
		{
			id: 91,
			nama: "Papua Barat",
		},
		{
			id: 94,
			nama: "Papua",
		},
	]);

	const {
		first_name,
		last_name,
		dob,
		gender,
		biodata,
		phone_number,
		country,
		province,
		city,
		education_status,
		instagram,
		twitter,
		facebook,
		youtube,
		blog,
		full_address,
	} = userState;

	const [currentProvince, setCurrentProvince] = useState(
		province
			? indoProvinces[indoProvinces.findIndex((p) => p.nama === province)]
			: ""
	);

	useEffect(() => {
		if (!userState.country) {
			setUserState({
				...userState,
				country: "Indonesia",
				province: "",
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userState, currentProvince]);

	const status = ["Profesional", "Pelajar / Mahasiswa"];

	if (!education_status) {
		setUserState({ ...userState, ["education_status"]: status[0] });
	}

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

	const handleChange = (e) => {
		setUserState({ ...userState, [e.target.name]: e.target.value });

		if (e.target.name === "country" && e.target.value !== "Indonesia") {
			setUserState({
				...userState,
				[e.target.name]: e.target.value,
				city: "",
				province: "",
			});
			setCities([]);
		} else {
			setUserState({
				...userState,
				[e.target.name]: e.target.value,
				full_address: "",
			});
		}
	};
	const validDate = (dob) => {
		return (
			moment(`${dob}`, "YYYY-MM-DD", true).isValid() &&
			new Date().setHours(0, 0, 0, 0) >=
				new Date(dob).setHours(0, 0, 0, 0).valueOf() &&
			new Date(dob).getFullYear() >= 1950
		);
	};
	const handleSave = async () => {
		if (!loading) {
			setLoading(true);

			if (!whitespace(first_name) && !whitespace(last_name) && validDate(dob)) {
				if (biodata && biodata.length >= 100) {
					toast.error("Ups... Maaf, biodatamu terlalu panjang.");
				} else {
					const res = await fetch(`${API_URL}/users/me`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(userState),
					});
					if (!res.ok) {
						if (res.status === 403 || res.status === 401) {
							toast.error("Terjadi kesalahan mohon coba lagi. (403)");
							return;
						}
						toast.error("Terjadi kesalahan mohon coba lagi.");
					} else {
						// checkUserLoggedIn();
						setUser({ ...userState, profile_picture: user.profile_picture });
						toast.success("Profilmu telah diperbarui.");
					}
				}
			} else {
				toast.error("Mohon isi semua kolom yang harus diisi dengan benar! (*)");
			}

			setLoading(false);
		}
	};

	const handleUploadProfilePic = async (picture) => {
		if (!profilePicLoading) {
			setProfilePicLoading(true);
			let formData = new FormData();
			formData.append("files", picture);
			const res = await fetch(`${API_URL}/upload/profile-picture`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			const data = await res.json();
			if (!res.ok) {
				toast.error("Terjadi kesalahan mohon coba lagi.");
			} else {
				setUser({ ...user, profile_picture: data[0] });
				toast.success("Avatar telah diganti");
			}
			setProfilePicLoading(false);
		}
	};

	useEffect(() => {
		async function getCities() {
			setCitiesLoading(true);
			const res = await fetch(
				`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${currentProvince.id}`,
				{
					method: "GET",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				if (res.status === 403 || res.status === 401) {
					toast.error("Terjadi kesalahan mohon coba lagi. (403)");
					return;
				}
				toast.error("Terjadi kesalahan mohon coba lagi.");
			} else {
				setCities(data.kota_kabupaten);
				setUserState({
					...userState,
					city: "",
				});
			}
			setCitiesLoading(false);
		}
		getCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentProvince]);

	return (
		<Layout
			title="Edit Profil | Unbelievable"
			background="#171b2d"
			withMargin
			mainApp
		>
			<ToastContainer />
			<OuterContainer className="d-flex flex-column">
				<Breadcrumb />
				<>
					<HeadingSM className="mb-2">Edit Profil</HeadingSM>
					<FormLabelContainer className="d-flex flex-column align-items-center">
						{window && (
							<div
								onClick={() => {
									if (!profilePicLoading) {
										fileSelectorRef.current.click();
									}
								}}
								role="button"
								className="position-relative"
							>
								{profilePicLoading ? (
									<Image
										src={`${window.location.origin}/images/loading.gif`}
										alt="Loading..."
										height={32}
										width={32}
									/>
								) : (
									<>
										<AvatarContainer
											src={
												user.profile_picture
													? user.profile_picture.url
													: `${window.location.origin}/images/avatar-plc.png`
											}
											width={96}
											alt="Avatar"
											height={96}
										/>
										<Image
											src={`${window.location.origin}/images/cam-icon.png`}
											alt="camera"
											style={{ right: 0, bottom: "-3px" }}
											height={28}
											width={28}
											className="position-absolute"
										/>
									</>
								)}
							</div>
						)}

						<Form.Group hidden controlId="formFile" className="mb-3">
							<Form.Control
								onChange={async (e) => {
									if (e.target.files && e.target.files[0]) {
										if (e.target.files[0].size <= 6000000) {
											await handleUploadProfilePic(e.target.files[0]);
										} else {
											toast.error(
												"File terlalu besar. Ukuran maksimal adalah 6MB."
											);
										}
									}
								}}
								ref={fileSelectorRef}
								type="file"
								accept=".png, .jpg, .jpeg"
							/>
						</Form.Group>
						<StyledFormLabel className="mt-2 text-align-center">
							Ganti Avatar
						</StyledFormLabel>
					</FormLabelContainer>
					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>
								Nama Depan <span className="text-danger">*</span>
							</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="first_name"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0"
								onChange={handleChange}
								value={first_name}
								placeholder="Nama Depan"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>
								Nama Belakang <span className="text-danger">*</span>
							</StyledFormLabel>
							<StyledFormControl
								type="text"
								className={"shadow-none"}
								name="last_name"
								value={last_name}
								onChange={handleChange}
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
									value={"f"}
									onChange={handleChange}
									checked={gender === "f"}
								/>
								<Radio
									type={"radio"}
									label={`Laki-laki`}
									onChange={handleChange}
									checked={gender === "m"}
									value={"m"}
									name="gender"
								/>
							</div>
						</FormControlContainer>
					</FormGroup>
					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>
								Tanggal Lahir <span className="text-danger">*</span>
							</StyledFormLabel>
							<StyledFormControl
								type="date"
								name="dob"
								className="mr-xl-2 shadow-none"
								onChange={handleChange}
								value={dob}
								max={today}
								placeholder="Date"
							/>
						</FormControlContainer>
					</FormGroup>
					<FormGroup className="mt-3 d-flex flex-column text-gray2">
						<FormLabelContainer className="d-flex justify-content-between">
							<StyledFormLabel>Biodata</StyledFormLabel>
							<StyledFormLabel>
								{biodata ? biodata.length : 0} / 100
							</StyledFormLabel>
						</FormLabelContainer>

						<StyledTextArea
							value={biodata}
							onChange={handleChange}
							name="biodata"
							as="textarea"
							placeholder="Masukkan biodata"
						/>
					</FormGroup>
					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column">
							<StyledFormLabel>Nomor handphone</StyledFormLabel>
							<StyledFormControl
								type="tel"
								className={"shadow-none"}
								name="phone_number"
								value={phone_number}
								onChange={handleChange}
								placeholder="Nomor handphone"
							/>
						</FormControlContainer>
					</FormGroup>
					<FormGroup className="mt-3 d-flex flex-column text-gray2">
						<StyledFormLabel>Negara</StyledFormLabel>

						<Select
							onChange={handleChange}
							name="country"
							as="select"
							aria-label="Default select example"
							defaultValue={country ? country : "Indonesia"}
						>
							{country_list.map((c, ix) => (
								<option
									defaultValue={country ? country : "Indonesia"}
									key={ix}
									value={c}
								>
									{c}
								</option>
							))}
						</Select>
					</FormGroup>
					{(country === "Indonesia" || !country) && (
						<FormGroup className="mt-3 d-flex flex-wrap text-gray2">
							<FormControlContainer className="d-flex flex-column mr-xl-4 mr-0">
								<StyledFormLabel>Provinsi</StyledFormLabel>

								<Select
									name="province"
									as="select"
									value={province}
									onChange={(e) => {
										handleChange(e);
										const provIx = indoProvinces.findIndex(
											(p) => p.nama === e.target.value
										);
										setCurrentProvince(indoProvinces[provIx]);
									}}
									defaultValue={""}
								>
									<option></option>
									{indoProvinces.map((c, ix) => (
										<option key={ix}>{c.nama}</option>
									))}
								</Select>
							</FormControlContainer>
							{citiesLoading && <TextSecondary>Memuat kota...</TextSecondary>}
							{!citiesLoading && cities && cities.length > 0 && (
								<FormControlContainer className="d-flex flex-column">
									<StyledFormLabel>Kota / Kabupaten</StyledFormLabel>

									<Select
										as="select"
										name="city"
										onChange={handleChange}
										value={city}
										efaultValue={""}
									>
										<option></option>
										{cities.map((c, ix) => (
											<option key={ix}>{c.nama}</option>
										))}
									</Select>
								</FormControlContainer>
							)}
						</FormGroup>
					)}
					{country !== "Indonesia" && (
						<FormGroup className="mt-3 d-flex flex-wrap text-gray2">
							<FormControlContainer className="d-flex flex-column mr-xl-4 mr-0">
								<StyledFormLabel>Alamat Lengkap</StyledFormLabel>

								<StyledFormControl
									type="text"
									name="full_address"
									className="shadow-none mb-3 mb-lg-3 mb-xl-0"
									onChange={handleChange}
									value={full_address}
									placeholder=""
								/>
							</FormControlContainer>
						</FormGroup>
					)}
					<FormGroup className="mt-3 mb-1 d-flex flex-wrap text-gray2">
						<FormControlContainer className="d-flex flex-column mr-xl-4 mr-0">
							<StyledFormLabel>Status</StyledFormLabel>

							<Select
								onChange={handleChange}
								as="select"
								aria-label="Default select example"
								defaultValue={status[0]}
								name="education_status"
								value={education_status ? education_status : status[0]}
							>
								{status.map((c, ix) => (
									<option defaultValue={status[0]} key={ix} value={c}>
										{c}
									</option>
								))}
							</Select>
						</FormControlContainer>
					</FormGroup>
					<HeadingXXS className="mb-2 mt-5">Your Social Media</HeadingXXS>
					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Instagram</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="instagram"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								onChange={handleChange}
								value={instagram}
								placeholder="Instagram"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Twitter</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="twitter"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								onChange={handleChange}
								value={twitter}
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
								onChange={handleChange}
								value={facebook}
								placeholder="facebook.com/user_name"
							/>
						</FormControlContainer>
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>YouTube</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="youtube"
								className="shadow-none mb-3 mb-lg-3 mb-xl-0 transparent"
								onChange={handleChange}
								value={youtube}
								placeholder="YouTube url"
							/>
						</FormControlContainer>
					</FormGroup>
					<FormGroup className="mt-3 d-flex flex-wrap w-100">
						<FormControlContainer className="d-flex flex-column mr-xl-4 ">
							<StyledFormLabel>Blog</StyledFormLabel>
							<StyledFormControl
								type="text"
								name="blog"
								className="shadow-none transparent"
								onChange={handleChange}
								value={blog}
								placeholder="blog url"
							/>
						</FormControlContainer>
					</FormGroup>
					<EnrollBtn
						disabled={loading}
						onClick={handleSave}
						className="bg-primary1 mt-5 shadow"
					>
						<HeadingXXS>Simpan</HeadingXXS>
					</EnrollBtn>
				</>
			</OuterContainer>
		</Layout>
	);
};
export default withAuth(Edit);
