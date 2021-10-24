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
        <div className='page-container'>
            Accidents Heatmap By Month
            <CalendarChart data={data} />
        </div>
    );
}

export default Calendar;