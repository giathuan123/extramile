const express = require ("express");
const db = require("../db/backup");
usersRoute = require("../controllers/usersData");
var dummyData = require("../data/testData.json");

const router = express.Router();
var global_results;
router.get("/",usersRoute.usersData);

router.post("/api", (req, res)=>{ 
  console.log("QueryData", req.body); 
  const results = dummyData.filter(data=>query(data, req.body));
  res.json(results);
  global_results=results;
})
router.get("/api/endpoint",(req,res)=>{
  res.send(global_results);
})
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

setInterval(() => db.backup(dummyData), 5000);

function query(data, reqJson){
  const dateMatches = reqJson.date ? data["Start_Time"].split(' ')[0] == reqJson.date : true; // true if field is empty
  const streetMatches = reqJson.street ? data["Street"].includes(reqJson.street) : true;
  const stateMatches = reqJson.state ? data["State"].includes(reqJson.state) : true;
  const cityMatches = reqJson.city ? data["City"].includes(reqJson.city) : true;
  const zipMatches = reqJson.zip ? data["Zipcode"] == reqJson.zip : true;
  const severityMatches = reqJson.severity.length != 0 ? reqJson.severity.includes(data["Severity"]) : true; 
  return dateMatches && streetMatches && stateMatches && cityMatches && zipMatches && severityMatches;
}
module.exports = router;
