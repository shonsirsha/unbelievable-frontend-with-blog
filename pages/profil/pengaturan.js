import { useContext, useRef, useState, useEffect } from "react";
import { HeadingSM, HeadingXXS } from "components/Typography/Headings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextSecondary } from "components/Typography/Text";
import {
	FormLabel,
	FormGroup,
	Form,
	Button,
	FormControl,
	FormText,
} from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";
import { checkPassword } from "utils/checkPassword";
import AuthContext from "context/AuthContext";
import Layout from "components/Layout";
import styled from "styled-components";
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

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 12px 24px;
	width: 100%;
	max-width: 180px;
`;
const StyledFormControl = styled(FormControl)`
	border: 2px solid #e8e8e8;
	border-radius: 8px;
	padding: 24px;
	background: transparent;
	transition: 0.5s;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px transparent inset !important;
	}

	&:focus {
		background: transparent;
		outline: none;
	}
`;
const Pengaturan = () => {
	const { changePassword, user, err, success, setErr } =
		useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState({
		password: "",
		newPassword: "",
	});
	const { password, newPassword } = details;

	useEffect(() => {
		if (err === "wrong.password") {
			toast.error("Password kamu salah!");
		} else {
			toast.error(err);
		}
		setLoading(false);
		setErr(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [err]);

	useEffect(() => {
		if (success) {
			toast.success("Password berhasil diganti");
			setDetails({
				password: "",
				newPassword: "",
			});
		}
		setLoading(false);
	}, [success]);

	const handleChange = (e) => {
		setDetails({ ...details, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		if (!loading) {
			setLoading(true);
			if (!whitespace(password) && !whitespace(newPassword)) {
				if (!checkPassword(newPassword)) {
					setErr("Password baru tidak memenuhi kriteria");
				} else {
					changePassword({
						identifier: user.uuid,
						password,
						newPassword,
						confirmPassword: newPassword,
					});
				}
			} else {
				setLoading(false);
				setErr("Password baru tidak memenuhi kriteria");
			}
		}
	};

	const PasswordResetForm = (
		<>
			<TextSecondary className="text-gray2">Ganti Password</TextSecondary>
			<FormGroup>
				<StyledFormLabel className="text-gray2 mt-4 mb-3">
					Password saat ini
				</StyledFormLabel>
				<StyledFormControl
					type="password"
					name="password"
					className="mr-xl-2 mb-3 shadow-none"
					value={password}
					onChange={handleChange}
					placeholder="Password saat ini"
				/>

				<StyledFormLabel className="text-gray2 mt-4 mb-3">
					Password baru
				</StyledFormLabel>
				<StyledFormControl
					type="password"
					name="newPassword"
					className="mr-xl-2 mb-3 shadow-none"
					value={newPassword}
					onChange={handleChange}
					placeholder="Password baru"
				/>

				<FormText className="mt-2 text-muted">
					Password harus minimal 8 karakter, dengan huruf besar, huruf kecil,
					nomer, dan simbol.
				</FormText>
			</FormGroup>

			<EnrollBtn
				disabled={loading}
				onClick={handleSubmit}
				className="bg-primary1 mt-3 shadow"
			>
				<HeadingXXS>Ganti</HeadingXXS>
			</EnrollBtn>
		</>
	);

	return (
		<Layout
			title="Masukkan | Unbelieveable"
			background="#171b2d"
			withMargin
			mainApp
			showLogout
		>
			<OuterContainer className="d-flex flex-column">
				<>
					<ToastContainer />

					<HeadingSM className="mb-4">pengaturan umum</HeadingSM>
					{user && user.provider === "local" && <>{PasswordResetForm}</>}
				</>
			</OuterContainer>
		</Layout>
	);
};
export default withAuth(Pengaturan);
