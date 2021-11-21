import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { CreateRecordForm } from '../Forms';

function AddRecord() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleAdd = () => {
    
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
          <CreateRecordForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='info' onClick={handleAdd}>
            Add Record
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddRecord;