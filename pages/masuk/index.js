import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
import {
	Container,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Button,
	Image,
} from "react-bootstrap";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import mustBeUnauthed from "utils/mustBeUnauthed";
import { mediaBreakpoint } from "utils/breakpoints";
import { API_URL } from "config";
import { validateEmail } from "utils/validateEmail";

const OuterContainer = styled.div`
	background: #fff;
	height: 80vh;

	@media ${mediaBreakpoint.down.md} {
		height: auto;
		min-height: 80vh;
		padding-bottom: 64px;
	}
`;

const StyledContainer = styled(Container)`
	height: 100%;
	display: flex;
	align-items: center;
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

	a:hover {
		text-decoration: none;
	}

	a.nostyle {
		color: inherit;
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

const LoginView = ({ setShowLogin }) => {
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});
	const [focus, setFocus] = useState("");

	const { email, password } = loginDetails;

	const handleChange = (e) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};

	const { login, authLoading, checkIfProviderLocal } = useContext(AuthContext);

	const handleSubmit = (e) => {
		if (!authLoading) {
			e.preventDefault();
			login({ email, password });
		}
	};

	return (
		<>
			<HeadingXS>Masuk</HeadingXS>

			<Form className="w-100 mt-3">
				<FormGroup>
					<FormLabel>E-mail</FormLabel>
					<StyledFormControl
						type="email"
						onBlur={() => setFocus("")}
						onFocus={() => setFocus("focus")}
						className={"shadow-none"}
						name="email"
						value={email}
						onChange={handleChange}
						placeholder="email@contoh.com"
					/>
				</FormGroup>

				<FormGroup>
					<FormLabel>Password</FormLabel>
					<StyledFormControl
						type="password"
						name="password"
						onBlur={() => setFocus("")}
						onFocus={() => setFocus("focus2")}
						className={"shadow-none"}
						value={password}
						placeholder="Password"
						onChange={handleChange}
					/>
				</FormGroup>

				<TextSecondary className="mt-3" onClick={() => setShowLogin(false)}>
					<Link href="#">
						<a>Lupa Password</a>
					</Link>
				</TextSecondary>

				<StyledSubmitBtn
					onClick={handleSubmit}
					type="submit"
					disabled={authLoading}
					variant="primary"
				>
					<TextSecondary>Masuk</TextSecondary>
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

			<Link href={`${API_URL}/connect/google`}>
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
				Belum punya akun?{" "}
				<Link href="/daftar">
					<a>Daftar</a>
				</Link>{" "}
				sekarang!
			</TextSecondary>
		</>
	);
};

const ForgotPasswordView = ({ setShowLogin }) => {
	const [email, setEmail] = useState("");

	const [emailSent, setEmailSent] = useState(false);

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const { authLoading, checkIfProviderLocal, forgotPassword } =
		useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!authLoading) {
			if (validateEmail(email)) {
				const emailLocal = await checkIfProviderLocal({ email });
				if (!emailLocal) {
					toast.error("E-mail tidak terdaftar");
				} else {
					const sent = await forgotPassword({ email });
					if (!sent) {
						toast.error(
							"Terjadi kesalahan dalam mengirim URL. Mohon coba lagi."
						);
					} else {
						setEmailSent(true);
					}
				}
			} else {
				toast.error("E-mail tidak valid");
			}
		}
	};

	const ForgotForm = (
		<>
			<HeadingXS>Lupa Password</HeadingXS>

			<Form className="w-100 mt-3">
				<FormGroup>
					<FormLabel>E-mail</FormLabel>
					<StyledFormControl
						type="email"
						className={"shadow-none"}
						name="email"
						value={email}
						onChange={handleChange}
						placeholder="email@contoh.com"
					/>
				</FormGroup>

				<StyledSubmitBtn
					onClick={async (e) => await handleSubmit(e)}
					type="submit"
					disabled={authLoading}
					variant="primary"
				>
					<TextSecondary>Kirim link reset Password</TextSecondary>
				</StyledSubmitBtn>
				<TextSecondary className="mt-3" onClick={() => setShowLogin(true)}>
					<Link href="#">
						<a>Masuk</a>
					</Link>
				</TextSecondary>
			</Form>
		</>
	);

	const Sent = (
		<>
			<HeadingXS>Link terkirim</HeadingXS>
			<TextSecondary className="mt-3">
				Jika kamu tidak melihat email reset password dari kami, coba periksa di
				tempat lain (folder sampah, spam, sosial, atau lainnya).
			</TextSecondary>
			<TextSecondary className="mt-3 text-left">
				<Link href="/">
					<a>Kembali ke halaman awal</a>
				</Link>
			</TextSecondary>
		</>
	);
	return <>{emailSent ? <>{Sent}</> : <>{ForgotForm}</>}</>;
};

const Index = () => {
	const [showLogin, setShowLogin] = useState(true);
	const { err } = useContext(AuthContext);
	useEffect(() => {
		if (err === "Auth.form.error.invalid") {
			toast.error("E-mail atau password salah");
		} else if (err == "Auth.form.error.email.provide") {
			toast.error("E-mail tidak boleh kosong");
		} else if (err == "Auth.form.error.password.provide") {
			toast.error("Password tidak boleh kosong");
		} else {
			toast.error(err);
		}
	}, [err]);
	return (
		<Layout background="#171b2d" withMargin>
			<ToastContainer />

			<OuterContainer>
				<StyledContainer>
					<FormContainer className="shadow">
						{showLogin ? (
							<LoginView setShowLogin={setShowLogin} />
						) : (
							<ForgotPasswordView setShowLogin={setShowLogin} />
						)}
					</FormContainer>
				</StyledContainer>
			</OuterContainer>
		</Layout>
	);
};

export default mustBeUnauthed(Index);
