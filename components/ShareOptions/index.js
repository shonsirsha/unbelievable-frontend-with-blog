import React from "react";
import {
	BsTwitter,
	BsFacebook,
	BsLinkedin,
	BsLink45Deg,
	BsWhatsapp,
	BsBookmarkPlus,
} from "react-icons/bs";
import styled from "styled-components";

const OuterContainer = styled.div`
	& svg:hover {
		cursor: pointer;
	}
`;

const ShareOptions = ({
	twitter = true,
	fb = true,
	linkedin = true,
	link = true,
	whatsapp = true,
	bookmark = true,
}) => {
	return (
		<OuterContainer className="d-flex flex-wrap">
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
					style={{ fontSize: "22px", color: "#737373", marginRight: "11px" }}
				/>
			)}
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
			{bookmark && (
				<BsBookmarkPlus style={{ fontSize: "19px", color: "#737373" }} />
			)}
		</OuterContainer>
	);
};

export default ShareOptions;
