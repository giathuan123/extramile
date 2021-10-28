const express = require ("express");
usersRoute = require("../controllers/usersData");
var dummyData = require("../data/testData.json");

const router = express.Router();
router.get("/",usersRoute.usersData);

router.post("/api", (req, res)=>{ 
  console.log("QueryData", req.body); 
  const results = dummyData.filter(data=>query(data, req.body));
  res.json(results);
})
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
    let index = dummyData.findIndex(object=>object.ID == data);
    if(index == -1){
      res.send("invalid record ID");
      return;
    }
    dummyData.splice(index, 1);
    res.send("Deleted" + JSON.stringify(req.body));
  });
});

router.post("/create", (req, res)=>{
  var newId = dummyData.reduce((prev, curr)=>{
    currInt = parseInt(curr.ID.split('-')[1]);
    return (currInt > prev) ? currInt : prev;
  }, 0);
  var newAccident = {
    "ID": "A-" + (newId + 1),
    "Street": req.body.street,
    "City": req.body.city,
    "State": req.body.state,
    "Severity": req.body.severity,
    "Zipcode": req.body.zip
  }
  dummyData.push(newAccident);
  console.log("Adding to dummyData", newAccident);
  res.send("Success");
});

function query(data, reqJson){
  const dateMatches = reqJson.date ? data["Start_Time"].split(' ')[0] == reqJson.date : true; // true if field is empty
  const streetMatches = reqJson.street ? data["Street"].includes(reqJson.street) : true;
  const stateMatches = reqJson.state ? data["State"].includes(reqJson.state) : true;
  const cityMatches = reqJson.city ? data["City"].includes(reqJson.city) : true;
  const zipMatches = reqJson.zip ? data["Zipcode"] == reqJson.zip : true;
  const severityMatches = reqJson.severity.length != 0 ? reqJson.severity.includes(data["Severity"]) : true; 
  return dateMatches && streetMatches && stateMatches && cityMatches && zipMatches && severityMatches;
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
