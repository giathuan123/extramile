import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//const data = []

const CountiesMap = () => {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:3001/users/mostcounty')
    .then(response => response.json())
    .then((json) => {
        setData(json);
    });
  },[]);

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
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

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
