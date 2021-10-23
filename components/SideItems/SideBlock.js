import styled from "styled-components";
const Container = styled.div`
	padding: 16px;
	width: ${(props) => (props.circular ? `56px` : `320px`)};
	${(props) => (props.circular ? `height: 56px;` : ``)}
	border-radius: ${(props) => (props.circular ? `100%` : `12px`)};

	&:hover {
		cursor: pointer;
	}

	@media (max-width: 1024px) {
		width: 56px;
		height: 56px;
		border-radius: 100%;
	}
`;
export default function SideBlock({
	circular = false,
	onClick,
	content,
	small,
	customBg = false,
	...props
}) {
	return (
		<Container
			circular={circular ? 1 : 0}
			className={`shadow ${!customBg && `bg-lightgray`} mb-2 ${
				props.className
			}`}
			small={small ? 1 : 0}
			onClick={onClick}
		>
			{content ? content : <>SideBlock box (work in progress...)</>}
		</Container>
	);
}
