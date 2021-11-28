import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//const data = []

function CountiesMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:3001/users/mostcounty')
    .then(response => response.json())
    .then((json) => {
        setData(json);
    });
  },[]);

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
  
  const onMouseEnter = (geo = { value: "NA" }) => {
    return () => {
      const NAME = geo.properties.name;
      setTooltipContent(`${NAME}`);
    };
  };
  
  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div>
    <ReactTooltip>{tooltipContent}</ReactTooltip>
    <ComposableMap projection="geoAlbersUsa" data-tip="" projectionConfig={{ scale: 1000 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.id == geo.id);
            
            return (
              <Geography
                key={geo.rmsKey}
                geography={geo}
                onMouseEnter={onMouseEnter(geo)}
                onMouseLeave={onMouseLeave}
                style={{
                  hover: {
                    fill: "#000000",
                    outline: "none"
                  }
                }}
                fill={cur ? colorScale(cur.accidents) : "#AEE"}
              />
            );
          })
          
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default CountiesMap;
