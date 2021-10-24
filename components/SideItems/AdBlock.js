import styled from "styled-components";
const Container = styled.div`
	padding: 16px;
	width: 240px;
	border-radius: ${(props) => (props.circular ? `100%` : `12px`)};
	background: url(${(props) => props.url});
	height: 112px;
	&:hover {
		cursor: pointer;
	}
	& .responsive {
		display: none;
	}

	& .responsive svg {
		font-size: 24px;
	}
	@media (max-width: 1024px) {
		width: 56px;
		height: 56px;
		border-radius: 100%;

		& .bigscreen {
			display: none;
		}

		& .responsive {
			display: flex;
		}
	}
`;
export default function AdBlock({ url, ...props }) {
	return (
		<Container
			url={url}
			className={`shadow mb-2 ${props.className}`}
		></Container>
	);
}
