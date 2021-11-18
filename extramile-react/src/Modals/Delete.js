import { useState } from 'react';

import {
  Button,
  Modal
} from 'react-bootstrap';

function Delete(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => ({

  });
// Idea: Confirmation alert on deletion
  return (
    <>
      <Button variant='danger' onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Deleting: {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this record?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Delete;

// /* <Button action={
// ()=>{
// fetch('http://localhost:3001/users/delete', 
// {method: "post", headers:{"Content-Type":"application/json"}, body: 
// JSON.stringify([item.ID])}).then(response=>console.log(response))}} title = "Delete"/> */