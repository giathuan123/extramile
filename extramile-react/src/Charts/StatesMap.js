import React, { useEffect, useState} from 'react'
import Plot from 'react-plotly.js';

function StatesMap() {
    const [list, setList] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/users/mostaccstates')
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setList(json);
        });
    }, [])

    function getData(key){
      return list.map(data=>data[key]);
    } 
    return (
        <>
            <Plot 
                data= {[{
                    type: 'choropleth',
                    locationmode: 'USA-states',
                    locations: getData('name'),
                    z: getData('accidents'), 
                    text: getData('name'),
                    autocolorscale: true
                }]}
                layout= { {
                    title: '2016-2020 Car Accidents By State',
                    // width: window.innerWidth,
                    // height: window.innerHeight,
                    geo:{
                        scope: 'usa',
                        countrycolor: 'rgb(255, 255, 255)',
                        showland: true,
                        landcolor: 'rgb(217, 217, 217)',
                        showlakes: true,
                        lakecolor: 'rgb(255, 255, 255)',
                        subunitcolor: 'rgb(255, 255, 255)',
                    }
                } }
            />
        </> 
    );
}

export default StatesMap;
