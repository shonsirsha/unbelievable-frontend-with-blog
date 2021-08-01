import { useContext } from "react";
import CourseContext from "context/CourseContext";
import { Modal, ModalBody } from "react-bootstrap";
import styled from "styled-components";

const StyledModal = styled(Modal)`
	padding: 0;
	.modal-content {
		padding: 0;
	}
`;
const StyledModalBody = styled(ModalBody)`
	padding: 0;
	height: 400px;
	min-height: calc(100vh - 80px);
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
