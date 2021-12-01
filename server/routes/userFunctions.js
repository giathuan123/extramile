const countyMap = require("./counties.json");
const fs = require("fs");
var { data, indexes } = require("../db/dbloader.js");

var maxIdNumber = 0;

function deleteDB(deleteArray){
  deleteArray.forEach(key=>{
    if(data[key]){
      indexes.removeData({[key]: data[key]});
      delete data[key];
    }
  });
  return "Deleted " + deleteArray;
}
function query(data, reqJson){
  const dateMatches = reqJson.date ? data["Start_Time"].split(' ')[0] == reqJson.date : true; // true if field is empty
  const streetMatches = reqJson.street ? data["Street"].includes(reqJson.street) : true;
  const stateMatches = reqJson.state ? data["State"].includes(reqJson.state) : true;
  const cityMatches = reqJson.city ? data["City"].includes(reqJson.city) : true;
  const zipMatches = reqJson.zip ? data["Zipcode"] == reqJson.zip : true;
  const severityMatches = reqJson.severity.length != 0 ? reqJson.severity.includes(data["Severity"]) : true; 
  return dateMatches && streetMatches && stateMatches && cityMatches && zipMatches && severityMatches;
}
function updateDB(key,updateObject){
  data[key] = updateObject;
  indexes.addData({[key]: updateObject});
}
function deleteDB(deleteArray){
  deleteArray.forEach(key=>{
    if(data[key]){
      indexes.removeData({[key]: data[key]});
      delete data[key];
    }
  });
}
function getMaxId(){
  console.log("[INFO] Getting max id");
  var keysArray = Object.keys(data);
  max = parseInt(keysArray[keysArray.length-1].split('-')[1]);
  console.log("[INFO] Got max id");
  return max;
}

function SeverityChart(){
  var severityIndex = indexes.getIndex("ServerityIndex");
  var numAccPerSeverity = Object.entries(severityIndex.index).map(
    ([severity, accidents])=>{return{name: severity, accidents: accidents.length}}
  );
  return numAccPerSeverity;
}
function tenAccCities(){
  var cityIndex = indexes.getIndex("CityIndex");
  var numAccPerCityArray = Object.entries(cityIndex.index).map(([city, accidents])=>[city, accidents.length]);
  numAccPerCityArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
    return nextNumAccidents-currNumAccidents;
  });
  return numAccPerCityArray.map(([city, accidents])=>{return {name: city, accidents: accidents}});
}

function MostAccStates(){
  var stateIndex = indexes.getIndex("StateIndex");
  ret =  Object.entries(stateIndex.index).map(([state, accidents])=>{return {name: state, accidents: accidents.length}});
  return ret;
}

function getDailyAccidents() {
  var timeIndex = indexes.getIndex("TimeIndex");
  var numAccPerDayArray = Object.entries(timeIndex.index).map(([day, accidents])=>[day, accidents.length]);
  numAccPerDayArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
    return nextNumAccidents-currNumAccidents;
  });
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

function makeData(key, value){
  return {
    ID: key,
    ...value
  }
}

function AccCounties(){
  var ret = []
  var countyIndex = indexes.getIndex("CountyIndex");
  for(const[key, value] of Object.entries(countyIndex.index)){
    if(countyMap[key] == undefined){
      fs.writeFileSync("./undefinedCounties", key.toString() + "\n", {flag: 'a'});
    }
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

function createDB(newObject){
    newId = (maxIdNumber == 0) ? getMaxId(): maxIdNumber;
    maxIdNumber = ++newId;
    newKey = "A-" + (newId);
    function getInt(id){
      return parseInt(id.split('-')[1]);
    }
    data[newKey] = newObject;
    indexes.addData({[newKey]: newObject});
    console.log(`[INFO] Adding to A-${newId} to main data`, newObject );
}
function queryDB(reqQuery){
  console.log("[INFO] QueryData recieved at /users/api: ", reqQuery); 
  results = [];
  var timeIndex = indexes.getIndex("TimeIndex");
  var cityIndex = indexes.getIndex("CityIndex");
  var stateIndex = indexes.getIndex("StateIndex");
  var serverityIndex = indexes.getIndex("ServerityIndex");
  // saving old fieldGetters in indexes
  var prevTimeGetter = timeIndex.fieldGetter;
  var prevCityGetter = cityIndex.fieldGetter;
  var prevStateGetter = stateIndex.fieldGetter;
  var prevServerityGetter = serverityIndex.fieldGetter;
  
  timeIndex.fieldGetter = (data)=>data.date;
  cityIndex.fieldGetter = (data)=>data.city;
  stateIndex.fieldGetter = (data)=>data.state;
  serverityIndex.fieldGetter = (data)=>data.severity;
  // quering index
  indexResults = indexes.queryIndex(reqQuery);
  if(indexResults == -1){
    for(const [key, value] of Object.entries(data)){
      if(query(value, reqQuery)){
        results.push(makeData(key, value));
      }
    }
  }else{
    results = indexResults
      .filter(id=>query(data[id],reqQuery))
      .map(id=>makeData(id, data[id]));
  }
  console.log(`[INFO] Responding with ${results.length} results for`, reqQuery);
  // restoring original getters
  timeIndex.fieldGetter = prevTimeGetter;
  stateIndex.fieldGetter = prevStateGetter;
  cityIndex.fieldGetter = prevCityGetter;
  serverityIndex.fieldGetter = prevServerityGetter;
  return results;
} 
module.exports = {
  createDB: createDB,
  queryDB: queryDB,
  deleteDB: deleteDB,
  updateDB: updateDB,
  AccCounties: AccCounties,
  getDailyAccidents: getDailyAccidents,
  getSwarmPlotStats: getSwarmPlotStats,
  SeverityChart: SeverityChart,
  MostAccStates: MostAccStates,
  tenAccCities: tenAccCities 
}

