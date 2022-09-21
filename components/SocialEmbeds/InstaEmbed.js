import { useContext } from "react";
import AppContext from "context/AppContext";
import InstaImage from "./InstaImage";
import { Row, Col } from "react-bootstrap";
import { HeadingXXS } from "components/Typography/Headings";
import { BsInstagram } from "react-icons/bs";
const InstaEmbed = () => {
	const { igPosts } = useContext(AppContext);

	if (!igPosts.length) return <></>;
	return (
		<div>
			<div className="d-flex">
				<BsInstagram />
				<HeadingXXS as="p" className="ml-2 mb-3">
					Unbelievable.id Instagram Page
				</HeadingXXS>
			</div>

			<Row>
				{igPosts.length &&
					igPosts.map((post) => (
						<>
							<Col lg={4} md={4} sm={4} xs={6} className="mb-4">
								<InstaImage
									src={
										post.media_type.toUpperCase() === "IMAGE"
											? `/api/image-fetcher?url=${encodeURIComponent(
													post.media_url
											  )}`
											: `/api/image-fetcher?url=${encodeURIComponent(
													post.thumbnail_url
											  )}`
									}
									permalink={post.permalink}
									isVideo={post.media_type.toUpperCase() === "VIDEO"}
								/>
							</Col>
						</>
					))}
			</Row>
		</div>
	);
};

export default InstaEmbed;
