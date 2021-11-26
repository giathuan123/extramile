import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//const data = []

const CountiesMap = () => {
  const [data, setData] = useState([]);
  const [checker,setChecker] = useState(0);
  
  
  if(checker !== 1){
    fetch('http://localhost:3001/users/mostcounty')
    .then(response => response.json())
    .then((json) => {
        setData(json);
        setChecker(1);
    });
  }

  // useEffect(() => {
  //   // https://www.bls.gov/lau/
  //   csv("county_accidents_0.csv").then(counties => {
  //     console.log(counties);
  //     setData(counties);
  //   });
  // }, []);

  
  const colorScale = scaleQuantile(data)
    .domain(data.map(d => d.accidents))
    .range([
      "#E8DAEF",
      "#D2B4DE",
      "#BB8FCE",
      "#A569BD",
      "#8E44AD",
      "#7D3C98",
      "#6C3483",
      "#5B2C6F",
      "#4A235A"
    ]);

  console.log(data.map(data=>data["accidents"]));
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.id == geo.id);
            console.log(cur)
            return (
              <Geography
                key={geo.rmsKey}
                geography={geo}
                fill={cur ? colorScale(cur.accidents) : "#AEE"}
              />
            );
          })
          
        }
      </Geographies>
    </ComposableMap>
  );
};

export default CountiesMap;
