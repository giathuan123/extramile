import { useState, useRef } from 'react';
import { Modal, Button } from "react-bootstrap";
import { EditRecordForm } from '../Forms';

function EditRecord(props) {
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  const formRef = useRef();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    /*if (formRef.current) {
      formRef.current.handleSubmit();
    }*/
    if(inputRef.current){
      inputRef.current.handleFormSubmit();
    }
    console.log(inputRef.current);
  
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
          <EditRecordForm data={props.data} ref={inputRef}  />
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
