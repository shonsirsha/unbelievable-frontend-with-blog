import styled from "styled-components";
import { GrUpgrade } from "react-icons/gr";
const Container = styled.div`
	padding: 16px;
	width: ${(props) => (props.small ? `240px` : `320px`)};
	${(props) => (props.circular ? `height: 56px;` : ``)}
	border-radius: ${(props) => (props.circular ? `100%` : `12px`)};
	background: #99bbf8;
	position: absolute;
	top: 220px;
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
export default function Upgradeblock({
	circular = false,
	onClick,
	content,
	small,
	...props
}) {
	return (
		<Container
			circular={circular ? 1 : 0}
			className={`shadow mb-2 ${props.className}`}
			small={small ? 1 : 0}
			onClick={onClick}
		>
			<div className="bigscreen">
				{content ? content : <>UpgradeBlock (work in progress...)</>}
			</div>
			<div className="responsive">
				<GrUpgrade />
			</div>
		</Container>
	);
}
