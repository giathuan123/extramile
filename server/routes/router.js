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
  if(timeIndex.get(req.body.date) != undefined){
    let fromIndex = timeIndex.get(req.body.date);
    results = fromIndex.map((id)=>{return makeData(id, data[id])});
  }else if(cityIndex.get(req.body.city) != undefined){
    let fromIndex = cityIndex.get(req.body.city);
    results= fromIndex.map((id)=>{return makeData(id, data[id])});
  }else{
    for(const [key, value] of Object.entries(data)){
      if(query(value, req.body)){
        results.push(makeData(key, value));
      }
    }
  }
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
  const results = tenAccCities();
  res.send(JSON.stringify(results));
})
//Feature 1 get request for most Accidental states
router.get("/mostaccstates",(req,res)=>{
  const results = MostAccStates();
  res.send(JSON.stringify(results));
})

router.get("/dailystats", (req,res) => {
  const results = getDailyAccidents();
  res.send(JSON.stringify(results));
});

router.post("/delete", (req, res)=>{
  const deleteArray = req.body;
  console.log(req.body);
  deleteArray.forEach(data=>{
    if(dummyData[data] != undefined){
      delete dummyData[data];
    }
    res.send("Deleted" + JSON.stringify(req.body));
  });
});

router.post("/create", (req, res)=>{
    newId = (maxIdNumber == 0) ? getMaxId(): ++maxIdNumber;
    if(data["A-" + (newId)] != undefined){
      console.log("[ERROR] can't create new object");
      return -1;
    }
    newKey = "A-" + (newId);
    newObject = {
      "Street": req.body.street,
      "City": req.body.city,
      "State": req.body.state,
      "Severity": req.body.severity,
      "Zipcode": req.body.zip
    }
  
    data[newKey] = newObject;
    indexes.addData({[newKey]: newObject});
    console.log(`[INFO] Adding to A-${newID} dummyData`, );
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

function tenAccCities(){
  let data = dummyData;
  var arr = [];
  const map1 = new Map();
  data.filter(function (item){
    arr.push(item.City);
  });
  arr.forEach(function (x) { 
    if(!map1.has(x)){
      map1.set(x,1);
    }
    else{
      map1.set(x,(map1.get(x)??0)+1);
    }
  });
  var new_map = new Map([...map1.entries()].sort((a,b)=> b[1]-a[1]).splice(0,10));
  var new_array = Array.from(new_map,([name,accidents])=>({name,accidents}));
  /*console.log(new_array);
  const obj = Object.fromEntries(new_array);*/
  return new_array;
}

function MostAccStates(){
  let data = dummyData;
  var arr = [];
  const map1 = new Map();
  data.filter(function (item){
    arr.push(item.State);
  });
  arr.forEach(function (x) { 
    if(!map1.has(x)){
      map1.set(x,1);
    }
    else{
      map1.set(x,(map1.get(x)??0)+1);
    }
  });
  var new_map = new Map([...map1.entries()].sort((a,b)=> b[1]-a[1]));
  var new_array = Array.from(new_map,([name,accidents])=>({name,accidents}));
  //console.log(new_array);
  return new_array;
}

function getDailyAccidents() {
  let data = dummyData;
  const accidentsMap = new Map();

  data.forEach( (accident) => {
    let date = accident.Start_Time.substring(0,10);
    if (!accidentsMap.has(date)) {
      accidentsMap.set(date, 1);
    }
    else {
      accidentsMap.set(date, (accidentsMap.get(date)??0) + 1)
    }
  });

  return Array.from(accidentsMap, ([day, value]) => ({day, value}));
}


module.exports = router;
