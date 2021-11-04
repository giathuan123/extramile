const router = require("express").Router();
var { data, indexes } = require("../db/dbloader.js")
 var dummyData = require("../db/data/testData.json");
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
  // saving old fieldGetters in indexes
  var prevTimeGetter = timeIndex.fieldGetter;
  var prevCityGetter = cityIndex.fieldGetter;
  
  // new getter for req.body(json)
  timeIndex.fieldGetter = (data)=>data.date;
  cityIndex.fieldGetter = (data)=>data.city;
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
  cityIndex.fieldGetter = prevCityGetter;
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

router.get("/mostaccstates",(req,res)=>{
  console.log("[INFO] Get request recieved at /acccounties");
  const results = AccCounties();
  res.json(results);
})

router.get("/dailystats", (req,res) => {
  console.log("[INFO] Get request recieved at /dailystats");
  const results = getDailyAccidents();
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

function AccCounties(){
  var ret = []
  var countyIndex = indexes.getIndex("CountyIndex");
  for(const[key, value] of Object.entries(countyIndex)){
    ret.push({[key]:value.length})
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
  return ret;
}


module.exports = router;
