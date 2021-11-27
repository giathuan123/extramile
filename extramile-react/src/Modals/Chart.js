import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Chart(props) {
  const [show, setShow] = useState(false);

  function handleShow() {
    // setFullscreen(true);
    setShow(true);
  }
  return (
    <>
      <Button className='btn-sm' onClick={handleShow}>
        Show Full Screen
      </Button>

      <Modal show={show} fullscreen={true} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Chart;