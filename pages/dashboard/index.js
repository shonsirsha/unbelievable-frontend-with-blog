import { useContext, useState, useEffect, Fragment } from "react";
import { parseCookies } from "utils/cookies";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";
import CourseContext from "context/CourseContext";
import { API_URL } from "config/index";
import {
	HeadingXS,
	HeadingLG,
	HeadingXXS,
} from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import Layout from "components/Layout";
import Onboarding from "components/Onboarding/Onboarding";
import EnrolledCourseCard from "components/Course/EnrolledCourseCard";
import DefaultCourseCard from "components/Course/DefaultCourseCard";
import SideBlock from "components/SideItems/SideBlock";
import styled from "styled-components";
import PreviewModal from "components/Course/PreviewModal";
import BuyModal from "components/Course/BuyModal";
import WishlistModal from "components/Wishlist/WishlistModal";
import {
	Form,
	FormGroup,
	FormControl,
	FormLabel,
	Button,
} from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { nanoid } from "nanoid";
import { validatePhoneNumber } from "utils/validatePhoneNumber";

const StyledDefault = styled(DefaultCourseCard)`
	margin-right: 16px;
	margin-bottom: 16px;
	flex-shrink: 0;
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 215px;

		&:last-child {
			margin-right: 0;
		}
	}
`;
const RightContainer = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		display: none;
	}
`;

const ComponentsContainer = styled.div`
	bottom: 48px;
	right: 16px;
`;
const StyledHeadingLG = styled(HeadingLG)`
	font-size: 52px;
`;

const StyledHeadingXS = styled(HeadingXS)`
	font-size: 21px;
`;

const StyledEnrolled = styled(EnrolledCourseCard)`
	margin-right: 24px;
	margin-bottom: 24px;
	flex-shrink: 0;
	@media (max-width: 1024px) {
		/*iPad Pro and below*/
		min-width: 280px;

		&:last-child {
			margin-right: 0;
		}
	}
`;

const StyledFormGroup = styled(FormGroup)`
	position: static;
	width: 100%;
	padding: 64px 0;
`;

const DefaultCardsContainer = styled.div`
	padding: 16px 6px;
	padding-right: 240px;

	@media (max-width: 1024px) {
		padding: 16px 6px;
	}
`;

const EnrolledCardsContainer = styled.div`
	max-width: 90vw;

	padding: 16px 6px;
	padding-right: 120px;

	@media (max-width: 1024px) {
		padding: 16px 6px;
		max-width: 100%;
	}
`;

const StyledFormControl = styled(FormControl)`
	border: none;
	border-radius: 6px;
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

const DOBWrapper = styled.div`
	display: flex;
	padding: 24px;
	background: #fff;
	border-radius: 16px;
	flex-direction: column;
	max-width: 640px;
	margin-left: auto;
	margin-right: auto;
`;

const StyledSubmitBtn = styled(Button)`
	margin-top: 16px;
	width: 100%;
	border-radius: 18px;
`;

const Index = ({
	token,
	onboardings,
	user,
	courses,
	coursesTaken,
	siteData,
}) => {
	const router = useRouter();
	const { checkUserLoggedIn, getToken } = useContext(AuthContext);
	const {
		previewModalOpen,
		setPreviewModalOpen,
		buyModalOpen,
		setBuyModalOpen,
		wishlistModalOpen,
		setWishlistModalOpen,
	} = useContext(CourseContext);

	const [allCourses] = useState(courses);
	// const [dob, setDob] = useState(moment().toDate());
	// const [phoneNumber, setPhoneNumber] = useState("");
	const [completeSignUp, setCompleteSignUp] = useState({
		dob: "",
		phone_number: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setCompleteSignUp({ ...completeSignUp, [e.target.name]: e.target.value });
	};
	const { dob, phoneNumber } = completeSignUp;

	const handleFinishOnboarding = async () => {
		const res = await fetch(`${API_URL}/users/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ onboarded: true }),
		});
		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
				return;
			}
			toast.error("Terjadi Kesalahan Mohon Coba Lagi");
		} else {
			router.push("/dashboard?r=1");
		}
	};

	const onSubmit = async () => {
		if (!loading) {
			setLoading(true);
			if (
				validatePhoneNumber(phoneNumber) &&
				moment(dob).isValid() &&
				new Date().setHours(0, 0, 0, 0) >=
					new Date(dob).setHours(0, 0, 0, 0).valueOf() &&
				new Date(dob).getFullYear() >= 1930
			) {
				const res = await fetch(`${API_URL}/users/me`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ dob: dob, phone_number: phoneNumber }),
				});
				if (!res.ok) {
					if (res.status === 403 || res.status === 401) {
						toast.error("Terjadi Kesalahan Mohon Coba Lagi (403)");
						return;
					}
					toast.error("Terjadi Kesalahan Mohon Coba Lagi");
				} else {
					toast.success("Tersimpan!");
					router.push("/dashboard");
					// setTimeout(() => {
					// 	router.push("/dashboard");
					// }, 200);
				}
			} else {
				toast.error("Mohon pastikan data anda sudah benar");
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		setWishlistModalOpen(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (router.query.r == "1") {
			checkUserLoggedIn();
			getToken();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	const userPaid = coursesTaken.some((user) => {
		return user.paid;
	});

	if (!user.dob || !user.phone_number) {
		return (
			<Layout
				title="Dashboard | Unbelievable"
				background="#171b2d"
				siteData={siteData}
				withMargin
			>
				<ToastContainer />

				<StyledFormGroup>
					<DOBWrapper className="shadow">
						<HeadingXXS as="p" className="mb-2">
							Selesaikan Pendaftaran
						</HeadingXXS>
						{/* <TextTertiary className="mb-3">
							Mohon masukkan tanggal lahir untuk menyelesaikan pendaftaran
						</TextTertiary> */}

						<Form className="w-100 mt-3">
							<FormGroup>
								<FormLabel>No Handphone</FormLabel>
								<StyledFormControl
									type="tel"
									pattern="[0-9]{15}"
									className="mr-xl-2 mb-3 shadow-none"
									name="phoneNumber"
									value={phoneNumber}
									onChange={handleChange}
									placeholder="No Handphone"
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel>Tanggal Lahir</FormLabel>
								<div className="d-flex flex-column">
									<ReactDatePicker
										name={"dob"}
										maxDate={moment().toDate()}
										minDate={moment("01-01-1930").toDate()}
										dateFormat="dd-MM-yyyy"
										selected={
											moment(dob).isValid()
												? moment(dob).toDate()
												: moment().toDate()
										}
										onChange={(date) => {
											setCompleteSignUp({
												...completeSignUp,
												["dob"]: date,
											});
										}}
									/>
								</div>
							</FormGroup>

							<StyledSubmitBtn
								disabled={loading}
								type="submit"
								onClick={onSubmit}
							>
								Simpan
							</StyledSubmitBtn>
						</Form>
					</DOBWrapper>
				</StyledFormGroup>
			</Layout>
		);
	}

	if (!user.onboarded) {
		return (
			<>
				<Onboarding
					handleFinishOnboarding={handleFinishOnboarding}
					user={user}
					onboardings={onboardings}
				/>
			</>
		);
	}

	return (
		<Layout
			title="Dashboard | Unbelievable"
			background="#171b2d"
			withMargin
			userPaid={userPaid}
			mainApp
			siteData={siteData}
		>
			<ToastContainer />

			<PreviewModal
				show={previewModalOpen}
				onHide={() => setPreviewModalOpen(false)}
			/>

			<BuyModal show={buyModalOpen} onHide={() => setBuyModalOpen(false)} />
			<WishlistModal
				show={wishlistModalOpen}
				onHide={() => setWishlistModalOpen(false)}
			/>

			<div className="d-flex w-100 flex-column">
				<HeadingXS className="text-gray mb-2">
					Selamat Datang Kembali,
				</HeadingXS>
				<StyledHeadingLG className="text-primary1 mb-5">
					Heroes!
				</StyledHeadingLG>
				<div className="d-flex flex-column w-100">
					<StyledHeadingXS className="mb-2 ml-1">Kelas Populer</StyledHeadingXS>
					{user.token && (
						<DefaultCardsContainer className="d-flex flex-nowrap w-100 overflow-auto ">
							{allCourses &&
								allCourses.length > 0 &&
								allCourses.map((course) => (
									<Fragment key={nanoid()}>
										{course.grouped_videos &&
											course.grouped_videos.videos.length > 0 && (
												<StyledDefault key={course.id} small course={course} />
											)}
									</Fragment>
								))}
						</DefaultCardsContainer>
					)}
				</div>

				<div className="d-flex flex-column mt-4">
					<StyledHeadingXS className="mb-2 ml-1 ">Kelas Saya</StyledHeadingXS>
					<EnrolledCardsContainer className="d-flex flex-nowrap py-4 w-100 overflow-lg-none overflow-auto pb-2">
						{coursesTaken.map((course) => (
							<Fragment key={nanoid()}>
								{course.grouped_videos &&
									course.grouped_videos.videos.length > 0 && (
										<StyledEnrolled
											user={user}
											key={nanoid()}
											course={course}
										/>
									)}
							</Fragment>
						))}
					</EnrolledCardsContainer>
				</div>
			</div>

			<RightContainer>
				<ComponentsContainer className="position-fixed display-flex">
					<SideBlock
						onClick={() => {
							setWishlistModalOpen(true);
						}}
						circular
						content={<FaHeart style={{ fontSize: "24px" }} />}
						className="mb-3"
					/>

					{/* <SideBlock
						content={"Mission Box (Work in progress..)"}
						className="mb-3"
					/> */}
				</ComponentsContainer>
			</RightContainer>
		</Layout>
	);
};

export async function getServerSideProps({ req, _ }) {
	const { token } = parseCookies(req);

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/masuk",
			},
			props: {},
		};
	} else {
		const res = await fetch(`${API_URL}/onboardings`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res2 = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res3 = await fetch(`${API_URL}/courses-not-taken`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res4 = await fetch(`${API_URL}/courses-taken`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const resSiteData = await fetch(`${API_URL}/sitedata`, {
			method: "GET",
		});

		const onboardings = await res.json();
		let user = await res2.json();
		user.token = token;
		let courses = await res3.json();
		if (courses && courses.length > 0) {
			courses = courses.sort(
				(a, b) => b.num_of_participants - a.num_of_participants
			);
		}
		const coursesTaken = await res4.json();
		const siteData = await resSiteData.json();

		return {
			props: {
				onboardings,
				token,
				user,
				courses,
				coursesTaken,
				siteData,
			},
		};
	}
}

export default Index;
