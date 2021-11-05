import React, { useState, useEffect } from 'react'
import { SwarmPlotChart } from '../Charts'

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
        <div className="content-container">
            <h1>Swarm Plot</h1>
            <p>This page shows the proportion of accidents for a specific visibility range in miles.</p>
            <SwarmPlotChart data={data} />
        </div>
    )
}

export default Swarm;