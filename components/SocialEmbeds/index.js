import React from "react";
import InstaEmbed from "./InstaEmbed";
import YoutubeEmbed from "./YoutubeEmbed";

const SocialEmbed = () => {
	return (
		<div className="d-flex flex-column w-100">
			<hr className="w-100 my-4" />
			<InstaEmbed />
			<div className="my-3" />
			<YoutubeEmbed />
		</div>
	);
};

export default SocialEmbed;
