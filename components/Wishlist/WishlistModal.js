import { useContext } from "react";
import CourseContext from "context/CourseContext";
import { Modal, ModalBody } from "react-bootstrap";
import Wishlist from "./Wishlist";
import styled from "styled-components";

const StyledModal = styled(Modal)`
	padding: 0;
	.modal-content {
		padding: 16px;
	}
`;
const StyledModalBody = styled(ModalBody)`
	padding: 0;
	min-height: 200px;
`;
const WishlistModal = (props) => {
	const {} = useContext(CourseContext);

	return (
		<StyledModal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<StyledModalBody className="d-flex flex-lg-row flex-column">
				<Wishlist />
			</StyledModalBody>
		</StyledModal>
	);
};
export default WishlistModal;
