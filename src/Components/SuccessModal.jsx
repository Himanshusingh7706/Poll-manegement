import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({
  show,
  message,
  subtext,
  okButton,
  onOkClick,     
}) => {
  return (
    <Modal
      show={show}
      centered
      size="sm"
      onHide={onOkClick}
      backdrop="static"
    >
      <Modal.Body className="text-center">
        <p className="text-success fs-4">{ message}</p>  
        <p>{ subtext}</p>                            
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="rounded-pill ok-button"
          variant="success"
          onClick={onOkClick}
        >
          {okButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
