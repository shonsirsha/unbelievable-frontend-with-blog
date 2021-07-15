import { Modal, Button, ModalBody } from "react-bootstrap";
import { HeadingXS } from "components/Typography/Headings";
import styled from "styled-components";
const StyledModal = styled(Modal)`
	padding: 0;
	.modal-content {
		border-radius: 16px;
	}
`;
const StyledModalBody = styled(ModalBody)`
	padding: 32px;
	border-radius: 16px;
`;
const PreviewModal = (props) => {
	return (
		<StyledModal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<StyledModalBody className="d-flex flex-lg-row bg-primary1 flex-column">
				<div className="d-flex flex-column w-100">
					<HeadingXS className="text-white">
						How To be Confident short course
					</HeadingXS>
				</div>
			</StyledModalBody>
		</StyledModal>
	);
};
export default PreviewModal;
