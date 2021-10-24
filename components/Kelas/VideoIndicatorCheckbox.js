import styled from "styled-components";
import { MdCheck } from "react-icons/md";

const CheckBoxWrapper = styled.div`
	display: flex;
	input[type="checkbox"] {
		width: 20px !important;
		height: 20px !important;
		appearance: none;
		position: static;
		outline: none;
		box-shadow: none;
		background: #dbdbdb;
	}

	input[type="checkbox"]:checked {
		background: #0ac7ce;
	}

	& svg {
		width: 21px;
    height: 21px;
}
	}
`;

const VideoIndicatorCheckbox = ({ finished = false }) => {
	return (
		<CheckBoxWrapper className="mr-2 position-relative">
			{finished && <MdCheck className="text-white position-absolute" />}
			<input type="checkbox" checked={finished} />
		</CheckBoxWrapper>
	);
};

export default VideoIndicatorCheckbox;
