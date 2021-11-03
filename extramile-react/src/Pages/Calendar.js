import './Pages.css';
import React, { useState, useEffect } from 'react';
import { CalendarChart } from '../Charts';

function Calendar() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users/dailystats')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setData(data)
        });
    }, []);

    return (
        <div className='content-container'>
            <h1>Accidents Heatmap</h1>
            <p className="page-summary">
                This chart shows the number of accidents that are recorded
                on a specific date.
            </p>
            <CalendarChart data={data} />
        </div>
    );
}

export default Calendar;