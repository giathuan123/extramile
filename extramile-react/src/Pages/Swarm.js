import React, { useState, useEffect } from 'react'
import { SwarmPlotChart } from '../Charts'

import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';

function Swarm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users/visibility')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setData(data)
    });
  }, []);

  return (
    <>
      <h1>Swarm Plot</h1>
      <p>This page shows the proportion of accidents for a specific weather visibility range in miles.</p>
      <SwarmPlotChart data={data}/>
    </>
  );
}

export default Swarm;