const router = require("express").Router();

const { queryDB, 
        tenAccCities, 
        SeverityChart, 
        createDB,
        MostAccStates,
        AccCounties,
        getDailyAccidents,
        getSwarmPlotStats } = require("./userFunctions.js");

router.post("/api", (req, res)=>{ 
  var results = queryDB(req.body);
  res.json(results);
})

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


router.post("/create", (req, res)=>{
    createDB(req.body);
    res.send("Success");
});



module.exports = router;
