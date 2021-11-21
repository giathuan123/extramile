import './Pages.css';

import React, {useState} from 'react';
import {CreateRecordForm, SearchForm} from '../Forms';
import CardResults from '../components/Card';
import { AddRecordModal } from '../Modals';
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
              <Card.Title className='card-header d-flex justify-content-between'>Accident Report <AddRecordModal/></Card.Title>
              <Card.Body><CardResults data={data} /></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;