import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { CountiesMapChart } from '../Charts';
import { CountiesColorBarChart } from '../Charts';


function CountiesMap() {
    const [content, setContent] = useState("");
    return (
        <div className="content-container">
            <CountiesColorBarChart />
            <CountiesMapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}

export default CountiesMap;