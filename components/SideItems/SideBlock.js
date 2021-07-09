import styled from "styled-components";
const Container = styled.div`
	padding: 16px;
	width: 320px;
	border-radius: 12px;
`;
export default function SideBlock({ content, ...props }) {
	return (
		<Container className={`shadow bg-lightgray mb-2 ${props.className}`}>
			{content ? content : <>SideBlock box (work in progress...)</>}
		</Container>
	);
}
