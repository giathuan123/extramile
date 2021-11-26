import { useState, useRef } from 'react';
import { Modal, Button } from "react-bootstrap";
import { EditRecordForm } from '../Forms';

function EditRecord(props) {
  const [show, setShow] = useState(false);

  const formRef = useRef();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditRecordForm data={props.data} formRef={formRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={handleEdit}>
            Update Record
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditRecord;