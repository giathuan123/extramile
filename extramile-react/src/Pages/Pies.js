import React from "react";
import PieGraph from '../Charts/Pie'

function PieChart(){
    return (
        
        <div className="content-container">
            <h1>Accident Severity</h1>
                <p>The ranking of severity is classified by the impact it has on traffic 1 will be the least impact it has on the flow of traffic and 4 will be noted as the highest impact it has on the flow of traffic</p>
            <PieGraph />
        </div>
    );
}

export default PieChart;