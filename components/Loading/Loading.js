import { Image } from "react-bootstrap";
import styled from "styled-components";

const StyledImage = styled(Image)`
	position: ${(props) => (props.fixed ? `fixed` : `static`)};
	top: 50%;
	left: 50%;
	${(props) => props.transform && `transform: translate(-50%, -50%);`}
	right: 50%;
	width: 48px;
	height: 48px;
`;
export default function Loading({ transform = true, fixed = true, ...props }) {
	const { className } = props;
	return (
		<StyledImage
			className={className}
			transform={transform ? 1 : 0}
			fixed={fixed ? 1 : 0}
			src="/images/loading.gif"
			alt="Loading..."
		/>
	);
}
