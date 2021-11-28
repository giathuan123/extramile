import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
export default function PieGraph() {
    const RADIAN = Math.PI / 180;
    const [list, setList] = useState([]);
    const [colors] = useState(['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']);
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        fetch('http://localhost:3001/users/pieinfo')
        .then(response => response.json())
        .then((json) => {
            setList(json);
            console.log(json);
            var temp =0;
            list.forEach(function (element){
                temp +=element.accidents;
            })
            setTotal(temp);
        });
    }, []);

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
    //"#8884d8" blue color
    const renderLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const item = list[index];

        return (
          <text x={x} y={y} fill={colors[index%colors.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" key={`label-${list.Id}-${item.Id}`}>
            Severity: {item.name} ({item.accidents} accidents)  
          </text>
        )
      };
    return (
        <ResponsiveContainer>
            {/* <PieChart width={300} height={250}> */}
            <PieChart>
                <Pie 
                    data={list} 
                    dataKey="accidents"
                    nameKey="name" 
                    isAnimationActive={false}
                    cx="50%" 
                    cy="50%" 
                    labelLine={true}
                    label={renderLabel}
                    // outerRadius={100}
                    fill="#db071f"
                   >{list.map((entry,index)=><Cell key ={`cell-${index}`} fill={colors[index%colors.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip/>} />
                <Legend verticalAlign ="top" align="center"/>
                {/*<Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />*/}
            </PieChart>
        </ResponsiveContainer>
    );
}
