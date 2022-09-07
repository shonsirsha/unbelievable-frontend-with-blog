import { HeadingXXS } from "components/Typography/Headings";
import React from "react";
import styled from "styled-components";

const StyledText = styled(HeadingXXS)`
	font-size: 16px;
`;

const HeaderTextBig = ({ children, className = "" }) => {
	return (
		<StyledText className={className} as="h2">
			{children}
		</StyledText>
	);
};

export default HeaderTextBig;
