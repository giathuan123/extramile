import React, {useState, useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
export default function BarGraph() {
    
    const [list, setList] = useState([]);

    useEffect(()=>{ 
        fetch('http://localhost:3001/users/barinfo')
        .then(response => response.json())
        .then((json) => {
            setList(json);
        });
    }, []);
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p className="intro">{getIntroOfPage(label)}</p>
              {/*<p className="desc">Anything you want can be displayed here.</p>*/}
            </div>
          );
        }
      
        return null;
      };
    const getIntroOfPage = (label) => {
        if (label === list[0].name) {
          return "Rank #1";
        }
        if (label === list[1].name) {
          return "Rank #2";
        }
        if (label === list[2].name) {
          return "Rank #3";
        }
        if (label === list[3].name) {
          return 'Rank #4';
        }
        if (label === list[4].name) {
          return 'Rank #5';
        }
        if (label === list[5].name) {
          return 'Rank #6';
        }
        if (label === list[6].name) {
            return 'Rank #7';
        }
        if (label === list[7].name) {
            return 'Rank #8';
        }
        if (label === list[8].name) {
            return 'Rank #9';
        }
        if (label === list[9].name) {
            return 'Rank #10';
        }
        return '';
      };
    return (
      <ResponsiveContainer>
        <BarChart 
        // width={1000}
        // height={300}
        data={list}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}><CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="accidents" barSize={20} fill="#8884d8" /></BarChart>
      </ResponsiveContainer>
    );
}
