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
} from "react-bootstrap";
import { mediaBreakpoint } from "utils/breakpoints";
import { NEXT_URL } from "config";
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
	const { changePassword, user, err, success } = useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState({
		password: "",
		newPassword: "",
	});
	const { password, newPassword } = details;
	const textAreaRef = useRef();

	useEffect(() => {
		if (err === "wrong.password") {
			toast.error("Password kamu salah!");
		} else {
			toast.error(err);
		}
		setLoading(false);
	}, [err]);

	useEffect(() => {
		if (success) {
			toast.success("Password berhasil diganti");
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
				changePassword({
					identifier: user.email,
					password,
					newPassword,
					confirmPassword: newPassword,
				});
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
			title="Masukkan | Unbelieveable"
			background="#171b2d"
			withMargin
			mainApp
			showReviewBlock={false}
		>
			<OuterContainer className="d-flex flex-column">
				<>
					<ToastContainer />

					<HeadingSM className="mb-5">pengaturan umum</HeadingSM>
					<TextSecondary className="text-gray2 mt-1">
						Ganti Password
					</TextSecondary>
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
					</FormGroup>

					<EnrollBtn
						disabled={loading}
						onClick={handleSubmit}
						className="bg-primary1"
					>
						<HeadingXXS>Ganti</HeadingXXS>
					</EnrollBtn>
				</>
			</OuterContainer>
		</Layout>
	);
};
export default withAuth(Pengaturan);
