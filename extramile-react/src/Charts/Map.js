import React, {useState} from 'react'
import Plot from 'react-plotly.js';

function Map() {
    var locs = []
    var accidents = []
    const [list, setList] = useState([]);
    const [checker,setChecker] = useState(0);


    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Plot
                data= {[{
                    type: 'choropleth',
                    locationmode: 'USA-states',
                    locations: locs,
                    z: accidents, 
                    //text: ["California", "Ohio"],
                    autocolorscale: true
                }]}
                layout= { {
                    title: '2019 Car Accidents',
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
        </div> 
    );
}

export default Map;