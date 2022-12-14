import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import Loading from "components/Loading/Loading";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Text";
import { HeadingXS } from "components/Typography/Headings";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
const MyCard = styled.div`
	background: #fff;
	display: flex;
	padding: 14px;
	border-radius: 10px;
	padding-top: 8px;
	padding-bottom: 8px;
	width: 100%;

	svg {
		font-size: 24px;
	}

	svg:hover {
		cursor: pointer;
	}
`;
const CourseImage = styled.div`
	background: ${(props) => (props.img ? `url(${props.img})` : `black`)};
	background-position: center;
	background-size: cover;
	width: 48px;
	height: 48px;
	flex-shrink: 0;
	border-radius: 4px;
`;
const StyledTextSecondary = styled(TextSecondary)`

    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px;
}
`;
const Wishlist = () => {
	const { setWishlistCourses, wishlistCourses, removeWishlist } =
		useContext(CourseContext);
	const { token, user, checkUserLoggedIn, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	checkUserLoggedIn();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	useEffect(() => {
		if (user) {
			// console.log(user.wishlist);
			// setWishlistCourses(user.wishlist);
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const removeWishlistClicked = async (course) => {
		setLoading(true);
		setUser({
			...user,
			wishlist: user.wishlist.filter(
				(c) => c.course.uuid !== course.course.uuid
			),
		});
		const removed = await removeWishlist(course, token, user, setUser);
		if (!removed) {
			toast.error("Terjadi kesalahan. Mohon coba lagi.");
		} else {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="d-flex justify-content-center m-auto">
				<Loading fixed={false} transform={false} />
			</div>
		);
	}
	console.log(user.wishlist);
	return (
		<div className="d-flex flex-column p-1 w-100">
			<HeadingXS as="p" className="text-primary1 mb-3 mt-2">
				Wishlist Kelas
			</HeadingXS>
			{user.wishlist && user.wishlist.length > 0 ? (
				<>
					{user.wishlist.map((c) => (
						<MyCard
							key={c.course.id}
							className="shadow d-flex align-items-center justify-content-between mb-3"
						>
							<CourseImage
								img={c.course.poster ? c.course.poster.url : c.course.image}
							/>
							<Link href={`/kelas/${c.course.slug}`}>
								<a style={{ width: "70%" }}>
									<StyledTextSecondary className="text-gray2">
										{c.course.title}
									</StyledTextSecondary>
								</a>
							</Link>
							<MdRemoveCircle
								onClick={async () => {
									setLoading(true);
									await removeWishlistClicked(c);
									setLoading(false);
								}}
							/>
						</MyCard>
					))}
				</>
			) : (
				<TextSecondary>Tidak ada wishlist</TextSecondary>
			)}
		</div>
	);
};

export default Wishlist;
