import { useState, useEffect, useContext } from "react";
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
	FormText,
	Button,
	Image,
} from "react-bootstrap";
import { HeadingXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Text";
import { mediaBreakpoint } from "utils/breakpoints";
import { checkPassword } from "utils/checkPassword";
import { parseCookies } from "utils/cookies";
import { useRouter } from "next/router";

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

export default function ResetPassword({ sc }) {
	const [passwords, setPasswords] = useState({
		password: "",
		passwordConfirmation: "",
	});
	const router = useRouter();
	const { authLoading, resetPassword, err, success } = useContext(AuthContext);
	useEffect(() => {
		if (err === "Auth.form.error.code.provide") {
			toast.error(
				"URL ini telah kedaluwarsa. Mohon gunakan URL yang ter-baru."
			);
			setTimeout(() => {
				router.push("/masuk");
			}, 4500);
		} else {
			toast.error(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [err]);
	useEffect(() => {
		if (success) {
			toast.success("Password berhasil diganti!");
			setPasswords({
				password: "",
				passwordConfirmation: "",
			});
		}
	}, [success]);
	const { password, passwordConfirmation } = passwords;

	const handleChange = (e) => {
		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!authLoading) {
			if (password === passwordConfirmation) {
				if (checkPassword(password)) {
					await resetPassword({ code: sc, password });
				} else {
					toast.error("Password tidak memenuhi kriteria");
				}
			} else {
				toast.error("Password tidak sama");
			}
		}
	};

	return (
		<Layout background="#171b2d" withMargin>
			<ToastContainer />

			<OuterContainer>
				<StyledContainer>
					<FormContainer className="shadow">
						<HeadingXS>Ganti Password</HeadingXS>

						<Form className="w-100 mt-3">
							<FormGroup>
								<FormLabel>Password</FormLabel>
								<StyledFormControl
									type="password"
									className={"shadow-none"}
									name="password"
									value={password}
									onChange={handleChange}
									placeholder="Password"
								/>
							</FormGroup>

							<FormGroup>
								<FormLabel>Konfirmasi Password</FormLabel>
								<StyledFormControl
									type="password"
									className={"shadow-none"}
									name="passwordConfirmation"
									value={passwordConfirmation}
									onChange={handleChange}
									placeholder="Konfirmasi Password"
								/>
							</FormGroup>

							<FormText className="mt-2 text-muted">
								Password harus minimal 8 karakter, dengan huruf besar, huruf
								kecil, nomer, dan simbol.
							</FormText>

							<StyledSubmitBtn
								onClick={async (e) => await handleSubmit(e)}
								type="submit"
								disabled={authLoading}
								variant="primary"
							>
								<TextSecondary>Ganti Password</TextSecondary>
							</StyledSubmitBtn>
						</Form>
					</FormContainer>
				</StyledContainer>
			</OuterContainer>
		</Layout>
	);
}
export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const { sc } = ctx.query;
	if (token) {
		return {
			redirect: {
				permanent: false,
				destination: "/dashboard",
			},
			props: {},
		};
	}
	if (!sc) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	}
	return {
		props: {
			sc,
		},
	};
}
