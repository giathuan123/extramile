import { SwarmPlotChart } from '../Charts'

function Swarm() {
    return (
        <div className="content-container">
            <h1>Swarm Plot</h1>
            <p>This page shows the proportion of accidents for a specific visibility range in miles.</p>
            <SwarmPlotChart />
        </div>
    )
}

export default Swarm;