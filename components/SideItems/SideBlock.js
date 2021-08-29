import styled from "styled-components";
const Container = styled.div`
	padding: 16px;
	width: 320px;
	border-radius: 12px;
	@media (max-width: 1024px) {
		width: 56px;
		height: 56px;
		border-radius: 100%;
	}
`;
export default function SideBlock({ onClick, content, ...props }) {
	return (
		<Container
			className={`shadow bg-lightgray mb-2 ${props.className}`}
			onClick={onClick}
		>
			{content ? content : <>SideBlock box (work in progress...)</>}
		</Container>
	);
}
