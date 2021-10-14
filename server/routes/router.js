const express = require ("express");
usersRoute = require("../controllers/usersData");
const dummyData = require("../data/testData3.json");
const router = express.Router();

router.get("/",usersRoute.usersData);
router.post("/api", (req, res)=>{ 
  console.log("QueryData", req.body); 
  const results = dummyData.filter(data=>query(data, req.body));
  res.json(results);
})

function query(data, reqJson){
  const dateMatches = reqJson.date ? data["Start_Time"].split(' ')[0] == reqJson.date : true; // true if field is empty
  const streetMatches = reqJson.street ? data["Street"].includes(reqJson.street) : true;
  const cityMatches = reqJson.city ? data["City"].includes(reqJson.city) : true;
  const zipMatches = reqJson.zip ? data["Zipcode"] == reqJson.zip : true;
  const severityMatches = reqJson.severity.lenght == 0 ? reqJson.severity.includes(data["Severity"]) : true; 
  console.log("Matches:", data.ID);
  
  return dateMatches && streetMatches && cityMatches && zipMatches && severityMatches;
}
module.exports = router;
