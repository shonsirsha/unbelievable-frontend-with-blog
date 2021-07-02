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

const OuterContainer = styled.div`
	background: #fff;
	height: 100vh;
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
const index = () => {
	const [signUpDetails, setSignUpDetails] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
	});
	const [focus, setFocus] = useState("");

	const { register, err } = useContext(AuthContext);

	useEffect(() => {
		toast.error(err);
	}, [err]);

	const handleChange = (e) => {
		setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
	};
	const { email, password, first_name, last_name } = signUpDetails;
	const handleSubmit = (e) => {
		e.preventDefault();
		setFocus("");
		register({
			email,
			password,
			first_name,
			last_name,
		});
	};
	return (
		<Layout background="#171b2d" withMargin>
			<OuterContainer>
				<StyledContainer>
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
										className={"shadow-none"}
										name="first_name"
										className="mr-xl-2 mb-3"
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
								variant="primary"
							>
								<TextSecondary>Daftar</TextSecondary>
							</StyledSubmitBtn>

							<TextSecondary className="mt-3">
								Sudah punya akun?{" "}
								<Link href="/masuk">
									<a>Masuk</a>
								</Link>{" "}
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
