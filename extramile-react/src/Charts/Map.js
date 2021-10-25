import React from 'react';
import Plot from 'react-plotly.js';


class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                type: 'choropleth',
                locationmode: 'USA-states',
                // locations: unpack(rows, 'Postal'),
                // z: unpack(rows, 'Population'),
                // text: unpack(rows, 'State'),
                autocolorscale: true
            }],
            layout: {
                title: '2014 US Popultaion by State',
                geo:{
                    scope: 'usa',
                    countrycolor: 'rgb(255, 255, 255)',
                    showland: true,
                    landcolor: 'rgb(217, 217, 217)',
                    showlakes: true,
                    lakecolor: 'rgb(255, 255, 255)',
                    subunitcolor: 'rgb(255, 255, 255)',
                    lonaxis: {},
                    lataxis: {}
                }
            }
        };
    }

    
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                
                <Plot
                    data={this.state.data}
                    layout={this.state.layout}
                />
            </div>
        );
    }
}

export default Map;

