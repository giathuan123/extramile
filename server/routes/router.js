const router = require("express").Router();
const { data } = require("../db/dbloader.js"); 
const { Result } = require("./resultsCache.js")
const { queryDB, createDB, deleteDB, updateDB } = require("./userFunctions.js");

router.post("/api", (req, res)=>{ 
  var results = queryDB(req.body);
  res.json(results);
})

//Feature 2 get request for most Accidental cities
router.get("/barinfo",(req,res)=>{
  console.log("[INFO] Get request recieved at /barinfo");
  // const results = tenAccCities();
  var results = Result.cache.getResult('/barinfo');
  res.send(results.slice(0, 10));
})
//Feature 4 get request for Severity
router.get("/pieinfo",(req,res)=>{
  console.log("[INFO] Get request recieved at /pieinfo");
  // const results = SeverityChart();
  var results = Result.cache.getResult('/pieinfo');
  res.send(results);
})
//Feature 1 get request for most Accidental states
router.get("/mostaccstates",(req,res)=>{
  console.log("[INFO] Get request recieved at /mostaccstates");
  // const results = MostAccStates();
  var results = Result.cache.getResult('/mostaccstates');
  res.json(results);
})

router.get("/mostcounty",(req,res)=>{
  console.log("[INFO] Get request recieved at /mostcounty");
  // const results = AccCounties();
  var results = Result.cache.getResult('/mostcounty');
  res.json(results);
})

router.get("/dailystats", (req,res) => {
  console.log("[INFO] Get request recieved at /dailystats");
  // const results = getDailyAccidents();
  var results = Result.cache.getResult('/dailystats');
  res.send(JSON.stringify(results));
});

router.get("/visibility", (req,res) => {
  console.log("[INFO] Get request received at /visibility");
  // const results = getDailyAccidents();
  var results = Result.cache.getResult('/visibility');
  res.send(JSON.stringify(results));
});

router.post("/delete", (req, res)=>{
  console.log("[INFO] /delete request receive:", req.body);
  const deleteArray = req.body;
  for(const key of deleteArray)
    Result.cache.pushChange(["DELETE", data[key]]);
  res.send(deleteDB(deleteArray));
});

router.post("/edit", (req, res)=>{
  const newObject = req.body;
  var key = newObject.ID;
  delete newObject['ID'];  // remove ID entry 
  console.log("[INFO] /edit request receive:", { ['A'+key]: newObject});
  updateDB(key, newObject);
  Result.cache.pushChange(["INSERT", newObject]);
  console.log(`[INFO] Updating to A-${key} to main data`, { ['A'+key]: newObject} );
});

function getDateTime(){
  let now = new Date();
  return  `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

router.post("/create", (req, res)=>{
    var data = req.body;
    newObject = {
      "Street": data.street??"",
      "City": data.city??"",
      "Start_Time": getDateTime(),
      "State": data.state??"",
      "Severity": data.severity??"",
      "Zipcode": data.zip??""
    }
    Result.cache.pushChange(["INSERT", newObject]);
    createDB(newObject);
    res.send("Success");
});



module.exports = router;
