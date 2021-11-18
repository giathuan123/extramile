import './Pages.css';

import React, {useState} from 'react';
import {CreateRecordForm, SearchForm} from '../Forms';
import CardResults from '../components/Card';

import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

function Search() {
  const [data, setData] = useState([])
    
  return (
    <>
      {/* <ModalContainer triggerText={'Add a Record'}>
          <CreateRecordForm/>
      </ModalContainer> */}
      {/* <div className="divider" /> */}
      <Container>
        <div className='lg-divider' />
        <Row><Col><h1>Search Accidents</h1></Col></Row>
        <div className='lg-divider'/>
        <Row>
          <Col>
            <Card className='card border-light mb-3'>
              <Card.Title className='card-header'>
                Search
              </Card.Title>
              <Card.Body>
              <SearchForm setData={setData} />
            </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className='card border-light mb-3'>
              <Card.Title className='card-header'>Accident Report</Card.Title>
              <Card.Body><CardResults data={data} /></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;