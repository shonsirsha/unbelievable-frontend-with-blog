import React, { useState, useContext } from "react";
import AuthContext from "context/AuthContext";
import {
	BsTwitter,
	BsFacebook,
	BsLinkedin,
	BsLink45Deg,
	BsWhatsapp,
	BsBookmarkPlus,
} from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover } from "react-tiny-popover";
import styled from "styled-components";
import { API_URL } from "config";
import Loading from "components/Loading/Loading";

const OuterContainer = styled.div`
	& svg:hover {
		cursor: pointer;
	}
`;

const PopoverContainer = styled.div`
	min-width: 80px;
	padding: 8px;
	border-radius: 8px;
	background: #0160ef;
`;

const ShareOptions = ({
	twitter = true,
	fb = true,
	linkedin = true,
	link = true,
	whatsapp = true,
	bookmark = true,
	blogPostSlug = "",
}) => {
	const { token } = useContext(AuthContext);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [bookmarkLoading, setBookmarkLoading] = useState(false);

	return (
		<OuterContainer className="d-flex flex-wrap">
			<ToastContainer />
			{twitter && (
				<a
					target="_blank"
					rel="noopener noreferrer"
					style={{ lineHeight: "0" }}
					href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
				>
					<BsTwitter
						style={{ fontSize: "19px", color: "#737373" }}
						className="mr-3"
					/>
				</a>
			)}

			{fb && (
				<a
					target="_blank"
					rel="noopener noreferrer"
					style={{ lineHeight: "0" }}
					href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
				>
					<BsFacebook
						style={{ fontSize: "19px", color: "#737373" }}
						className="mr-3"
					/>
				</a>
			)}
			{linkedin && (
				<a
					target="_blank"
					rel="noopener noreferrer"
					style={{ lineHeight: "0" }}
					href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
				>
					<BsLinkedin
						style={{ fontSize: "19px", color: "#737373" }}
						className="mr-3"
					/>
				</a>
			)}
			{link && (
				<BsLink45Deg
					onClick={(e) => {
						e.stopPropagation();
						navigator.clipboard.writeText(window.location.href);
						setIsPopoverOpen(true);

						setTimeout(() => {
							setIsPopoverOpen(false);
						}, 800);
					}}
					style={{ fontSize: "22px", color: "#737373", marginRight: "11px" }}
				/>
			)}
			<Popover
				isOpen={isPopoverOpen}
				onClickOutside={() => setIsPopoverOpen(false)}
				padding={4}
				reposition={true}
				positions={["bottom"]} // preferred positions by priority
				content={() => (
					// you can also provide a render function that injects some useful stuff!
					<PopoverContainer
						onClick={(e) => {
							e.stopPropagation();
						}}
						className="shadow text-white text-center"
					>
						URL artikel telah disalin
					</PopoverContainer>
				)}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
						setIsPopoverOpen(!isPopoverOpen);
					}}
				></div>
			</Popover>
			{whatsapp && window && (
				<a
					target="_blank"
					rel="noopener noreferrer"
					style={{ lineHeight: "0" }}
					href={`https://api.whatsapp.com/send?text=${window.location.href}`}
				>
					<BsWhatsapp
						style={{ fontSize: "19px", color: "#737373" }}
						className="mr-3"
					/>
				</a>
			)}
			{bookmark && token && (
				<>
					{bookmarkLoading ? (
						<div style={{ marginLeft: "8px", marginTop: "10px" }}>
							<Loading fixed={false} height="24" width="24" />
						</div>
					) : (
						<BsBookmarkPlus
							onClick={async () => {
								setBookmarkLoading(true);
								const res = await fetch(`${API_URL}/blog-posts/bookmark`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${token}`,
									},
									body: JSON.stringify({ slug: blogPostSlug }),
								});

								if (res.ok) {
									toast.success("Artikel telah dibookmark");
								} else {
									toast.error(
										"Ups, kesalahan terjadi saat mem-bookmark artikel"
									);
								}
								setBookmarkLoading(false);
							}}
							style={{ fontSize: "19px", color: "#737373" }}
						/>
					)}
				</>
			)}
		</OuterContainer>
	);
};

export default ShareOptions;
