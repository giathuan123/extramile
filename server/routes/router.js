const router = require("express").Router();
const fs = require("fs");
const countyMap = require("./counties.json");
var { data, indexes } = require("../db/dbloader.js")
var maxIdNumber = 0;

function makeData(key, value){
  return {
    ID: key,
    ...value
  }
}
router.post("/api", (req, res)=>{ 
  console.log("[INFO] QueryData recieved at /users/api: ", req.body); 
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
  // new getter for req.body(json)
  timeIndex.fieldGetter = (data)=>data.date;
  cityIndex.fieldGetter = (data)=>data.city;
  stateIndex.fieldGetter = (data)=>data.state;
  serverityIndex.fieldGetter = (data)=>data.severity;
  // quering index
  indexResults = indexes.queryIndex(req.body);
  if(indexResults == -1){
    for(const [key, value] of Object.entries(data)){
      if(query(value, req.body)){
        results.push(makeData(key, value));
      }
    }
  }else{
    results = indexResults
      .filter(id=>query(data[id], req.body))
      .map(id=>makeData(id, data[id]));
  }
  console.log(`[INFO] Responding with ${results.length} results for`, req.body);
  // restoring original getters
  timeIndex.fieldGetter = prevTimeGetter;
  stateIndex.fieldGetter = prevStateGetter;
  cityIndex.fieldGetter = prevCityGetter;
  serverityIndex.fieldGetter = prevServerityGetter;
  res.json(results);
})

function query(data, reqJson){
  const dateMatches = reqJson.date ? data["Start_Time"].split(' ')[0] == reqJson.date : true; // true if field is empty
  const streetMatches = reqJson.street ? data["Street"].includes(reqJson.street) : true;
  const stateMatches = reqJson.state ? data["State"].includes(reqJson.state) : true;
  const cityMatches = reqJson.city ? data["City"].includes(reqJson.city) : true;
  const zipMatches = reqJson.zip ? data["Zipcode"] == reqJson.zip : true;
  const severityMatches = reqJson.severity.length != 0 ? reqJson.severity.includes(data["Severity"]) : true; 
  return dateMatches && streetMatches && stateMatches && cityMatches && zipMatches && severityMatches;
}
//Feature 2 get request for most Accidental cities
router.get("/barinfo",(req,res)=>{
  console.log("[INFO] Get request recieved at /barinfo");
  const results = tenAccCities();
  res.send(results);
})
//Feature 4 get request for Severity
router.get("/pieinfo",(req,res)=>{
  console.log("[INFO] Get request recieved at /pieinfo");
  const results = SeverityChart();
  res.send(results);
})
//Feature 1 get request for most Accidental states
router.get("/mostaccstates",(req,res)=>{
  console.log("[INFO] Get request recieved at /mostaccstates");
  const results = MostAccStates();
  res.json(results);
})

router.get("/mostcounty",(req,res)=>{
  console.log("[INFO] Get request recieved at /mostcounty");
  const results = AccCounties();
  res.json(results);
})

router.get("/dailystats", (req,res) => {
  console.log("[INFO] Get request recieved at /dailystats");
  const results = getDailyAccidents();
  res.send(JSON.stringify(results));
});

router.get("/visibility", (req,res) => {
  console.log("[INFO] Get request received at /visibility");
  const results = getSwarmPlotStats();
  res.send(JSON.stringify(results));
});

router.post("/delete", (req, res)=>{
  const deleteArray = req.body;
  console.log("[INFO] /delete request receive:", req.body);
  deleteArray.forEach(key=>{
    if(data[key]){
      indexes.removeData({[key]: data[key]});
      delete data[key];
      res.send("Deleted " + JSON.stringify(req.body));
    }
  });
});

function getDateTime(){
  let now = new Date();
  return  `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

router.post("/create", (req, res)=>{
    newId = (maxIdNumber == 0) ? getMaxId(): ++maxIdNumber;
    newId++;
    newKey = "A-" + (newId);
    newObject = {
      "Street": req.body.street??"",
      "City": req.body.city??"",
      "Start_Time": getDateTime(),
      "State": req.body.state??"",
      "Severity": req.body.severity??"",
      "Zipcode": req.body.zip??""
    }
  
    data[newKey] = newObject;
    indexes.addData({[newKey]: newObject});
    console.log(`[INFO] Adding to A-${newId} to main data`, newObject );
    res.send("Success");
});

function getMaxId(){
  var max = 0;
  for(const [key,] of Object.entries(data)){
    curr = parseInt(key.split('-')[1]);
    max = curr > max ? curr: max;
  }
  return max;
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
function tenAccCities(){
  var cityIndex = indexes.getIndex("CityIndex");
  var numAccPerCityArray = Object.entries(cityIndex.index).map(([city, accidents])=>[city, accidents.length]);
  numAccPerCityArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
    return nextNumAccidents-currNumAccidents;
  });
  // let data = dummyData;
  // var arr = [];
  // const map1 = new Map();
  // data.filter(function (item){
  //   arr.push(item.City);
  // });
  // arr.forEach(function (x) { 
  //   if(!map1.has(x)){
  //     map1.set(x,1);
  //   }
  //   else{
  //     map1.set(x,(map1.get(x)??0)+1);
  //   }
  // });
  // var new_map = new Map([...map1.entries()].sort((a,b)=> b[1]-a[1]).splice(0,10));
  // var new_array = Array.from(new_map,([name,accidents])=>({name,accidents}));
  // /*console.log(new_array);
  // const obj = Object.fromEntries(new_array);*/
  // return new_array;
  return numAccPerCityArray.splice(0, 10).map(([city, accidents])=>{return {name: city, accidents: accidents}});
}

function MostAccStates(){
  var statesAccidents = {};
  for(const [, value] of Object.entries(data)){
    if(statesAccidents[value.State] == undefined){
      statesAccidents[value.State] = 1;
    }else{
      statesAccidents[value.State] += 1;
    }
  }

  ret =  Object.entries(statesAccidents).map(([state, accidents])=>{return {name: state, accidents: accidents}});
  // let data = dummyData;
  // var arr = [];
  // const map1 = new Map();
  // data.filter(function (item){
  //   arr.push(item.State);
  // });
  // arr.forEach(function (x) { 
  //   if(!map1.has(x)){
  //     map1.set(x,1);
  //   }
  //   else{
  //     map1.set(x,(map1.get(x)??0)+1);
  //   }
  // });
  // var new_map = new Map([...map1.entries()].sort((a,b)=> b[1]-a[1]));
  // var new_array = Array.from(new_map,([name,accidents])=>({name,accidents}));
  // console.log(new_array);
  // return new_array;
  return ret;
}

function getDailyAccidents() {
  var timeIndex = indexes.getIndex("TimeIndex");
  var numAccPerDayArray = Object.entries(timeIndex.index).map(([day, accidents])=>[day, accidents.length]);
  numAccPerDayArray.sort(([, currNumAccidents], [, nextNumAccidents])=>{
    return nextNumAccidents-currNumAccidents;
  });
//   let data = dummyData;
//   const accidentsMap = new Map();
// 
//   data.forEach( (accident) => {
//     let date = accident.Start_Time
//     if (typeof date == "undefined") {
//       return;
//     }
//     date = date.substring(0,10);
//     if (!accidentsMap.has(date)) {
//       accidentsMap.set(date, 1);
//     }
//     else {
//       accidentsMap.set(date, (accidentsMap.get(date)??0) + 1)
//     }
//   });
// 
//   return Array.from(accidentsMap, ([day, value]) => ({day, value}));
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
  // let data = dummyData;
  // var arr = [];
  // const map1 = new Map();
  // data.filter(function (item){
  //   arr.push(item.State);
  // });
  // arr.forEach(function (x) { 
  //   if(!map1.has(x)){
  //     map1.set(x,1);
  //   }
  //   else{
  //     map1.set(x,(map1.get(x)??0)+1);
  //   }
  // });
  // var new_map = new Map([...map1.entries()].sort((a,b)=> b[1]-a[1]));
  // var new_array = Array.from(new_map,([name,accidents])=>({name,accidents}));
  // console.log(new_array);
  // return new_array;
  // console.log("ret", ret);
  return ret;
}


module.exports = router;
