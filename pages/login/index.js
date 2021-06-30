import { useState } from "react";
import Link from "next/link";
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

const OuterContainer = styled.div`
	background: #fff;
	height: 90vh;
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
	width: 520px;
	background: #fff;
	padding: 32px 24px;
	border-radius: 10px;
	align-items: center;
	position: absolute;
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
	top: -75px;
	transition: 0.8s;
	&.focus {
		top: -90px;
		right: -45px;
	}

	&.focus2 {
		top: -110px;
		right: -65px;
	}
`;
export default function index() {
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});
	const [focus, setFocus] = useState("");
	const handleChange = (e) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setFocus("");
	};
	return (
		<Layout background="#171b2d">
			<OuterContainer>
				<StyledContainer>
					<FormContainer className="shadow">
						<HeadingXS>Masuk</HeadingXS>

						<Form autoComplete={false} className="w-100 mt-3">
							<FormGroup controlId="formBasicEmail">
								<FormLabel>E-mail</FormLabel>
								<StyledFormControl
									autoComplete={false}
									type="email"
									onBlur={() => setFocus("")}
									onFocus={() => setFocus("focus")}
									className={"shadow-none"}
									name="email"
									value={loginDetails.email}
									onChange={handleChange}
									placeholder="email@contoh.com"
								/>
							</FormGroup>

							<FormGroup controlId="formBasicEmail">
								<FormLabel>Password</FormLabel>
								<StyledFormControl
									type="password"
									name="password"
									onBlur={() => setFocus("")}
									onFocus={() => setFocus("focus2")}
									className={"shadow-none"}
									value={loginDetails.password}
									placeholder="Password"
									onChange={handleChange}
								/>
							</FormGroup>

							<StyledSubmitBtn
								onClick={handleSubmit}
								type="submit"
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
}
