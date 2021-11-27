const router = require("express").Router();
const { Result } = require("./resultsCache.js")
const { queryDB, createDB, deleteDB, updateDB } = require("./userFunctions.js");

router.post("/api", (req, res)=>{ 
  var results = queryDB(req.body);
  res.json(results);
})

console.log(Result.cache);
//Feature 2 get request for most Accidental cities
router.get("/barinfo",(req,res)=>{
  console.log("[INFO] Get request recieved at /barinfo");
  // const results = tenAccCities();
  var results = Result.cache.getResult('/barinfo');
  res.send(results);
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
  const deleteArray = req.body;
  console.log("[INFO] /delete request receive:", req.body);
  deleteDB(deleteArray);
  res.send("Deleted " + JSON.stringify(req.body));
});

router.post("/edit", (req, res)=>{
  const newObject = req.body;
  var key = newObject.ID;
  delete newObject['ID'];  // remove ID entry 
  console.log("[INFO] /edit request receive:", newObject);
<<<<<<< HEAD
  updateDB(key, newObject);
=======
  
  data[key] = newObject;
  indexes.addData({[key]: newObject});
  console.log(`[INFO] Adding to A-${key} to main data`, newObject );
>>>>>>> main
});

router.post("/create", (req, res)=>{
    createDB(req.body);
    res.send("Success");
});



module.exports = router;
