import React from "react";
import Breadcrumbs from "nextjs-breadcrumbs";
import styled from "styled-components";

const BreadcrumbContainer = styled.div`
	& ol {
		display: flex;
		padding: 0;
	}

	& li {
		list-style-type: none;
	}

	& li:after {
		margin: 0 8px;
		content: "/";
	}

	& li:last-child:after {
		content: "";
	}
`;

const Breadcrumb = () => {
	return (
		<BreadcrumbContainer className="bread">
			<Breadcrumbs
				omitRootLabel
				replaceCharacterList={[
					{ from: "feedback", to: "Tulis masukkan" },
					{ from: "pengaturan", to: "Pengaturan umum" },
				]}
			/>
		</BreadcrumbContainer>
	);
};

export default Breadcrumb;
