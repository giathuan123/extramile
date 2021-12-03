var { data, indexes } = require("./dbloader.js")
const countyMap = require("./counties.json");
const fs = require("fs");

function AccCounties(){
  var ret = []
  var countyIndex = indexes.getIndex("CountyIndex");
  for(const[key, value] of Object.entries(countyIndex.index)){
    if(countyMap[key] == undefined){
      fs.writeFileSync("./undefinedCounties", key.toString() + "\n", {flag: 'a'});
    }
    //creates array of objects with parameters name:(county_name), accidents:(length of id), id:(id)
    ret.push(
     {
        name: key,
        accidents: value.length,
        id: countyMap[key]
      }
    );
  }
  
return ret;
}
function getMaxId(){
  var max = 0;
  for(const [key,] of Object.entries(data)){
    curr = parseInt(key.split('-')[1]);
    max = curr > max ? curr: max;
  }
  return max;
}
function tenAccCities(){
  var cityIndex = indexes.getIndex("CityIndex");
  var numAccPerCityArray = Object.entries(cityIndex.index).map(([city, accidents])=>[city, accidents.length]);
  numAccPerCityArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
    return nextNumAccidents-currNumAccidents;
  });
  return numAccPerCityArray.splice(0, 10).map(([city, accidents])=>{return {name: city, accidents: accidents}});
}
function SeverityChart(){
  var severityAccidents = {};
  for(const [, value] of Object.entries(data)){
    if(severityAccidents[value.Severity] == undefined){
      severityAccidents[value.Severity] = 1;
    }else{
      severityAccidents[value.Severity] += 1;
    }
  }
  ret =  Object.entries(severityAccidents).map(([severity, accidents])=>{return {name: severity, accidents: accidents}});

  return ret;
}
function MostAccStates(){
  var stateIndex = indexes.getIndex("StateIndex");
  var ret = Object.entries(stateIndex.index).map(([state, accidents])=>{return {name: state, accidents: accidents.length}});
  return ret;
 
}
function getDailyAccidents() {
  var timeIndex = indexes.getIndex("TimeIndex");
  var numAccPerDayArray = Object.entries(timeIndex.index).map(([day, accidents])=>[day, accidents.length]);
  numAccPerDayArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
   // console.log(nextNumAccidents-currNumAccidents);
    return nextNumAccidents-currNumAccidents;
  });
 // console.log(numAccPerDayArray.length)
  return numAccPerDayArray.map(([date, accidents])=>{return {day: date, value: accidents }});

}
function getSwarmPlotStats() {
  const sev1 = new Map();
  const sev2 = new Map();
  const sev3 = new Map();
  const sev4 = new Map();

  for(const [, value] of Object.entries(data)) {
    let visibility = value.Visibility;
    let severity = value.Severity;
    if (typeof visibility == "undefined") {
      continue;
    }
    if (typeof severity == "undefined") {
      continue;
    }
    if (visibility > 10) {
      continue;
    }
    let total = 0;
    switch (severity) {
      case '1':
        total = sev1.get(visibility) ?? 0;
        if (!sev1.has(visibility)) {
          sev1.set(visibility, 1);
        }
        else if (total > 50) {
          break;
        }
        else {
          sev1.set(visibility, total + 1);
        }
        break;
      case '2':
        total = sev2.get(visibility) ?? 0;
        if (!sev2.has(visibility)) {
          sev2.set(visibility, 1);
        }
        else if (total > 50) {
          break;
        }
        else {
          sev2.set(visibility, total + 1);
        }
        break;
      case '3':
        total = sev3.get(visibility)??0;
        if (!sev3.has(visibility)) {
          sev3.set(visibility, 1);
        }
        else if (total > 50) {
          break;
        }
        else {
          sev3.set(visibility, total + 1);
        }
        break;
      case '4':
        total = sev4.get(visibility)??0;
        if (!sev4.has(visibility)) {
          sev4.set(visibility, 1);
        }
        else if (total > 50) {
          break;
        }
        else {
          sev4.set(visibility, total + 1);
        }
      default:
        break;
    }
  }
  let arr = [];
  let id = 0;
  sev1.forEach( (val, key) => {
    const json = ({
      id: id,
      severity: '1',
      visibility: key,
      volume: val
    });
    arr.push(json);
    id++;
  });
  sev2.forEach( (val, key) => {
    const json = ({
      id: id,
      severity: '2',
      visibility: key,
      volume: val
    });
    arr.push(json);
    id++;
  });
  sev3.forEach((val,key) => {
    const json = ({
      id: id,
      severity: '3',
      visibility: key,
      volume: val
    });
    arr.push(json);
    id++;
  });
  sev4.forEach( (val,key) => {
    const json = ({
      id: id,
      severity: '4',
      visibility: key,
      volume: val
    });
    arr.push(json);
    id++;
  });
  return arr;
}



module.exports=
 {
AccCounties,
getMaxId,
SeverityChart,
tenAccCities,
MostAccStates,
getDailyAccidents,
getSwarmPlotStats
 }


