import { useState } from "react";
import { Container, Card, Col, Row } from 'react-bootstrap';
import PieGraph from '../Charts/Pie'
import Bargraph from '../components/Bar';
import { StatesMapChart, CountiesMapChart, CountiesColorBarChart } from '../Charts';
import { ChartModal } from '../Modals';

function Analytics1() {
  return (
    <Container fluid style={{ height: '100%'}}>
      <div className='lg-divider'/>
      <Row><Col><h1>Analytics Page 1</h1></Col></Row>
      <div className='lg-divider'/>
      <Row>
        <Col md={6} style={{width: '40%'}}>
          <Card className='card border-light'>
            <Card.Title className='card-header d-flex justify-content-between' style={{}}>Pie Chart {<ChartModal><PieGraph /></ChartModal>}</Card.Title>
            <Card.Body style={{height: "20rem"}}><PieGraph /></Card.Body>
          </Card>
        </Col>
        <Col style={{width: '60%'}}>
          <Card className='card border-light'>
            <Card.Title className='card-header d-flex justify-content-between'>Bar Chart {<ChartModal><Bargraph /></ChartModal>}</Card.Title>
            <Card.Body style={{height: "20rem"}}>
              <Bargraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='lg-divider'/>
      <Row>
        <Col>
          <Card className='card border-light'>
            <Card.Title className='card-header d-flex justify-content-between'># of Accidents per State {<ChartModal><StatesMapChart /></ChartModal>}</Card.Title>
            <Card.Body><StatesMapChart /></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='card border-light'>
            <Card.Title className='card-header d-flex justify-content-between'>County Heatmap {<ChartModal> <CountiesColorBarChart /><CountiesMapChart /></ChartModal>}</Card.Title>
            <Card.Body>
              <CountiesColorBarChart />
              <CountiesMapChart/>
              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Analytics1;