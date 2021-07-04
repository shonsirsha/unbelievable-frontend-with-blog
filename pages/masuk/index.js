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
import { HeadingXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import mustBeUnauthed from "utils/mustBeUnauthed";
import { mediaBreakpoint } from "utils/breakpoints";

const OuterContainer = styled.div`
	background: #fff;
	height: 80vh;
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

	@media ${mediaBreakpoint.down.lg} {
		max-width: 90%;
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
const index = () => {
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});
	const [focus, setFocus] = useState("");

	const { login, err, authLoading } = useContext(AuthContext);

	useEffect(() => {
		if (err === "Identifier or password invalid.") {
			toast.error("E-mail atau password salah");
		} else {
			toast.error(err);
		}
	}, [err]);

	const handleChange = (e) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};
	const { email, password } = loginDetails;
	const handleSubmit = (e) => {
		e.preventDefault();
		setFocus("");
		login({ email, password });
	};
	return (
		<Layout background="#171b2d" withMargin>
			<OuterContainer>
				<StyledContainer>
					<FormContainer className="shadow">
						<HeadingXS>Masuk</HeadingXS>
						<ToastContainer />

						<Form autoComplete={false} className="w-100 mt-3">
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

							<StyledSubmitBtn
								onClick={handleSubmit}
								type="submit"
								disabled={authLoading}
								variant="primary"
							>
								<TextSecondary>Masuk</TextSecondary>
							</StyledSubmitBtn>

							<TextSecondary className="mt-3">
								Belum punya akun?{" "}
								<Link href="/daftar">
									<a>Daftar</a>
								</Link>{" "}
								sekarang!
							</TextSecondary>
						</Form>
						<GreenCharacter
							className={`${focus}`}
							src="/images/green.png"
							alt="Green"
						/>
					</FormContainer>
				</StyledContainer>
			</OuterContainer>
		</Layout>
	);
};

export default mustBeUnauthed(index);
