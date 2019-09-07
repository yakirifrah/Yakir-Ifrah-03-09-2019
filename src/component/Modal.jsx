import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export const ContainerModal = ({ title, msg }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong className="mr-auto">{title}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
