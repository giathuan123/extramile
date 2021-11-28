import { useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { CreateRecordForm } from '../Forms';

function AddRecord() {
  const [show, setShow] = useState(false);

  const formRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleAdd = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
    handleClose();
  }

  return (
    <>
      <Button className='btn-sm' variant='primary' onClick={handleShow}>
        Add a record
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a New Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRecordForm formRef={formRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={handleAdd}>
            Add Record
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddRecord;