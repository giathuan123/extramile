import { useState } from 'react';

import {
  Button,
  Modal
} from 'react-bootstrap';

function Delete(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Handle delete request here and then close modal
  const handleDelete = (item) => {
  fetch('http://localhost:3001/users/delete', 
  {method: "post", headers:{"Content-Type":"application/json"}, 
    body: JSON.stringify([item])}).then(response=>console.log(response))
  };// Idea: Confirmation alert on deletion
  return (
    <>
      <Button variant='danger' onClick={handleShow} style={{marginLeft: '5px'}}>
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
          <Button variant='danger' onClick={()=>handleDelete(props.id)}>
            Delete
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Cancel
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
