import { CountiesMapChart } from '../Charts';
import { CountiesColorBarChart } from '../Charts';

function CountiesMap() {
    return (
        <div className="content-container">
            <CountiesColorBarChart />
            <CountiesMapChart />
        </div>
    );
}

export default CountiesMap;