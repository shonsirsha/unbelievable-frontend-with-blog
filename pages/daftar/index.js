import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";
import moment from "moment";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	Container,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Button,
	FormText,
	Image,
} from "react-bootstrap";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import mustBeUnauthed from "utils/mustBeUnauthed";
import { mediaBreakpoint } from "utils/breakpoints";
import { checkPassword } from "utils/checkPassword";
import { API_URL } from "config";
import { whitespace } from "utils/whitespace";
const OuterContainer = styled.div`
	background: #fff;
	height: 100vh;

	display: flex;
	@media ${mediaBreakpoint.down.lg} {
	}
	@media ${mediaBreakpoint.down.md} {
		height: auto;
		min-height: 100vh;
		padding-bottom: 64px;
	}
`;

const StyledContainer = styled(Container)`
	height: 100%;
	display: flex;
	justify-content: center;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 520px;
	width: 100%;
	background: #fff;
	padding: 32px 24px;
	border-radius: 10px;
	align-items: center;
	position: absolute;

	a.nostyle {
		color: inherit;
	}
	a:hover {
		text-decoration: none;
	}

	@media ${mediaBreakpoint.down.lg} {
		max-width: 90%;
	}

	@media ${mediaBreakpoint.down.md} {
		position: static;
	}
`;
const StyledFormControl = styled(FormControl)`
	border: none;
	border-radius: 16px;
	padding: 16px;
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
`;

const StyledSubmitBtn = styled(Button)`
	margin-top: 16px;
	width: 100%;
	border-radius: 18px;
`;
const GreenCharacter = styled(Image)`
	position: absolute;
	right: -50px;
	top: -50px;
	width: 124px;
	height: 109px;
	transition: 0.8s;
	&.focus {
		top: -70px;
		right: -45px;
	}

	&.focus2 {
		top: -80px;
		right: -65px;
	}

	@media ${mediaBreakpoint.down.lg} {
		right: 0;
		top: 0;
		width: 64px;
		height: 56.33px;

		&.focus {
			top: -10px;
			right: 15px;
		}

		&.focus2 {
			top: -20px;
			right: 5px;
		}
	}
`;

const Eye = styled.div`
	display: flex;
	width: 24px;
	height: 24px;
	position: absolute;
	right: 16px;
	top: 8px;
	background: transparent;
	align-items: center;
	&:hover {
		cursor: pointer;
	}

	& svg {
		font-size: 32px;
	}
`;

const Index = () => {
	const router = useRouter();
	const r_code = router.query.register_code ? router.query.register_code : "";
	const r_c_to_be_checked = sessionStorage.getItem("unb_reg_code") || r_code;
	useEffect(() => {
		if (window && r_code !== "") {
			sessionStorage.setItem("unb_reg_code", r_code);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [signUpDetails, setSignUpDetails] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		dob: "",
	});
	const [focus, setFocus] = useState("");
	const [asText, setAsText] = useState(false);
	const { register, err, authLoading } = useContext(AuthContext);

	useEffect(() => {
		if (err === "Email is already taken.") {
			toast.error("Email telah digunakan");
		} else if (err === "Please provide valid email address.") {
			toast.error("Email tidak valid");
		} else {
			toast.error(err);
		}
	}, [err]);

	const handleChange = (e) => {
		setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
	};
	const { email, password, first_name, last_name, dob } = signUpDetails;
	const validateRegisterData = () => {
		if (
			whitespace(first_name) ||
			whitespace(last_name) ||
			whitespace(dob) ||
			!moment(`${dob}`, "YYYY-MM-DD", true).isValid()
		) {
			return false;
		} else {
			if (
				new Date(dob).getFullYear() >= 1950 &&
				new Date().setHours(0, 0, 0, 0) >=
					new Date(dob).setHours(0, 0, 0, 0).valueOf()
			) {
				return true;
				// today is bigger than user's birthday (valid)
			}
			return false;
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!authLoading) {
			let registerData = {
				email,
				password,
				first_name,
				last_name,
				dob,
				r_c_to_be_checked,
			};

			// reg code to be checked on backend if exists

			setFocus("");
			if (!checkPassword(password)) {
				toast.error("Password tidak memenuhi kriteria");
			} else {
				const validData = validateRegisterData();
				if (validData) {
					register(registerData);
					sessionStorage.removeItem("unb_reg_code");
				} else {
					toast.error("Mohon isi semua kolom dengan benar");
				}
			}
		}
	};
	const datex = new Date();
	const today = `${datex.getFullYear()}-${
		datex.getMonth() + 1 < 10
			? `0${datex.getMonth() + 1}`
			: datex.getMonth() + 1
	}-${datex.getDate() < 10 ? `0${datex.getDate()}` : datex.getDate()}`;
	return (
		<Layout background="#171b2d" withMargin>
			<OuterContainer>
				<StyledContainer className="align-items-center">
					<FormContainer className="shadow">
						<HeadingXS>Daftar</HeadingXS>
						<ToastContainer />

						<Form className="w-100 mt-3">
							<FormGroup>
								<FormLabel>Nama Lengkap</FormLabel>
								<div className="d-flex flex-xl-row flex-column">
									<StyledFormControl
										type="text"
										onBlur={() => setFocus("")}
										onFocus={() => setFocus("focus")}
										name="first_name"
										className="mr-xl-2 mb-3 shadow-none"
										onChange={handleChange}
										value={first_name}
										placeholder="Nama Depan"
									/>
									<StyledFormControl
										type="text"
										onBlur={() => setFocus("")}
										onFocus={() => setFocus("focus2")}
										className={"shadow-none"}
										name="last_name"
										value={last_name}
										onChange={handleChange}
										placeholder="Nama Belakang"
									/>
								</div>
							</FormGroup>

							<FormGroup>
								<FormLabel>Tanggal Lahir</FormLabel>
								<div className="d-flex flex-xl-row flex-column">
									<StyledFormControl
										type="date"
										onBlur={() => setFocus("")}
										onFocus={() => setFocus("focus")}
										name="dob"
										className="mr-xl-2 mb-3 shadow-none"
										onChange={handleChange}
										value={dob}
										max={today}
										placeholder="Date"
									/>
								</div>
							</FormGroup>

							<FormGroup>
								<FormLabel>E-mail</FormLabel>
								<StyledFormControl
									type="email"
									onBlur={() => setFocus("")}
									onFocus={() => setFocus("focus")}
									className="mr-xl-2 mb-3 shadow-none"
									name="email"
									value={email}
									onChange={handleChange}
									placeholder="email@contoh.com"
								/>
							</FormGroup>

							<FormGroup className="mt-2">
								<FormLabel>Password</FormLabel>
								<div className="position-relative">
									<StyledFormControl
										type={`${asText ? `text` : `password`}`}
										name="password"
										onBlur={() => setFocus("")}
										onFocus={() => setFocus("focus2")}
										className={"shadow-none"}
										value={password}
										placeholder="Password"
										onChange={handleChange}
									/>
									<Eye onClick={() => setAsText(!asText)}>
										{asText ? <BsEye /> : <BsEyeSlash />}
									</Eye>
								</div>
								<FormText className="mt-2 text-muted">
									Password harus minimal 8 karakter, dengan huruf besar, huruf
									kecil, nomer, dan simbol.
								</FormText>
							</FormGroup>

							<StyledSubmitBtn
								onClick={handleSubmit}
								type="submit"
								disabled={authLoading}
								variant="primary"
							>
								<TextSecondary>Daftar</TextSecondary>
							</StyledSubmitBtn>
						</Form>
						{/* <GreenCharacter
							className={`${focus}`}
							src="/images/green.png"
							alt="Green"
						/> */}
						<div className="d-flex mt-3 align-items-center w-100">
							<hr width="100%" />
							<HeadingXXS className="mx-3" as="p">
								Atau
							</HeadingXXS>
							<hr width="100%" />
						</div>

						<Link
							href={`${API_URL}/connect/google${
								r_c_to_be_checked && `?register_code=${r_c_to_be_checked}`
							}`}
						>
							<a
								className="shadow mt-3 d-flex w-100 justify-content-center nostyle"
								style={{ borderRadius: "16px", padding: "14px" }}
							>
								<Image
									width={26}
									height={26}
									src="/images/google-icon.svg"
									alt="Google"
								/>
								<TextSecondary className="ml-3">
									Lanjutkan dengan Google
								</TextSecondary>
							</a>
						</Link>

						<TextSecondary className="mt-3">
							Sudah punya akun?{" "}
							<Link href="/masuk">
								<a>Masuk</a>
							</Link>{" "}
						</TextSecondary>
					</FormContainer>
				</StyledContainer>
			</OuterContainer>
		</Layout>
	);
};

export default mustBeUnauthed(Index);
