import { useContext } from "react";
import CourseContext from "context/CourseContext";
import AuthContext from "context/AuthContext";
import { Modal, ModalBody, Image, Button } from "react-bootstrap";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { mediaBreakpoint } from "utils/breakpoints";
import { FaHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";

const StyledModal = styled(Modal)`
	padding: 0;
	.modal-content {
		padding: 0;
	}
`;
const StyledModalBody = styled(ModalBody)`
	padding: 0;
	height: 400px;
	min-height: calc(100vh - 280px);
	iframe {
		width: 100%;
		height: 100%;
	}
`;
const BuyModal = (props) => {
	const { invoiceUrl } = useContext(CourseContext);
	// const { token, user } = useContext(AuthContext);
	if (!invoiceUrl) {
		return <></>;
	}
	return (
		<StyledModal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<StyledModalBody className="d-flex flex-lg-row flex-column">
				<iframe src={`${invoiceUrl}`}></iframe>
			</StyledModalBody>
		</StyledModal>
	);
};
export default BuyModal;
