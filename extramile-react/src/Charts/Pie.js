import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
export default function PieGraph() {
    const [list, setList] = useState([]);
    const [colors, setColors] = useState(['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']);
    const [checker,setChecker] = useState(0);
    const [total,setTotal]=useState(0);
    if(checker !== 1){
        fetch('http://localhost:3001/users/pieinfo')
        .then(response => response.json())
        .then((json) => {
            setList(json);
            console.log(json);
            setChecker(1);
            var temp =0;
            list.forEach(function (element){
                temp +=element.accidents;
            })
            setTotal(temp);
        });
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${(((payload[0].value)/total)*100).toFixed(2)}%`}</label>
                </div>
            );
        }
      
        return null;
      };
    /*const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
    ];*/
    //"#8884d8" blue color
    
    return (
        <ResponsiveContainer width="100%" height="50%">
            <PieChart width={500} height={500} >

                <Pie 
                    data={list} 
                    dataKey="accidents" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={window.innerHeight/5}
                    fill="#db071f"
                    label
                     >{
                        list.map((entry,index)=><Cell key ={'cell-${index}'} fill={colors[index%colors.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip/>} />
                <Legend verticalAlign ="top" align="center"/>
                {/*<Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />*/}
            </PieChart>
        </ResponsiveContainer>
    );
}
