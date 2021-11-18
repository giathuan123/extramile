import './Pages.css';

import React, {useState} from 'react';
import {CreateRecordForm, SearchForm} from '../Forms';
import Card from '../components/Card';
import ModalContainer from '../ModalContainer'

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Search() {
  const [data, setData] = useState([])
    
  return (
    <>
      {/* <ModalContainer triggerText={'Add a Record'}>
          <CreateRecordForm/>
      </ModalContainer> */}
      {/* <div className="divider" /> */}
      <Container fluid>
        <Row>
          <Col md='auto'>
            <h1>Search Accidents</h1>
            <SearchForm setData={setData} />
          </Col>
          <Col>
          <h1>Accident Report</h1>
          <Card data={data} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;