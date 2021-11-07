import React, {useState} from 'react'
import Plot from 'react-plotly.js';

function StatesMap() {
    const [list, setList] = useState([]);
    const [checker,setChecker] = useState(0);

    if(checker !== 1){
        fetch('http://localhost:3001/users/mostaccstates')
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setList(json);
            setChecker(1);
        });
    }

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
                    title: '2019 Car Accidents By State',
                    width: window.innerWidth,
                    height: window.innerHeight,
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
