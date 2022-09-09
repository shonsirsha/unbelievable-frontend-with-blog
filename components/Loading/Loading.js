import { Image } from "react-bootstrap";
import styled from "styled-components";

const StyledImage = styled(Image)`
	position: ${(props) => (props.fixed ? `fixed` : `static`)};
	top: 50%;
	left: 50%;
	${(props) => props.transform && `transform: translate(-50%, -50%);`}
	right: 50%;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
`;
export default function Loading({
	transform = true,
	fixed = true,
	height = "48",
	width = "48",
	...props
}) {
	const { className } = props;
	return (
		<StyledImage
			className={className}
			transform={transform ? 1 : 0}
			fixed={fixed ? 1 : 0}
			height={height}
			width={width}
			src="/images/loading.gif"
			alt="Loading..."
		/>
	);
}
