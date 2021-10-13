const express = require ("express");
const dummyData = require("../data/testData.json");
const router = express.Router();
let data =[];
let parseData=[];
usersRoute = require("../controllers/usersData");

router.get("/",usersRoute.usersData);
router.post("/api", (req, res)=>{ console.log(req.body); 
  //store the request into a searchQuery
  const searchQuery = {
    Street: req.body.street,
    City: req.body.city,
    State: req.body.state,
    Zip: req.body.zip,
    Weather: req.body.weather,
    Severity: req.body.severity,
  }
  //push the searchquery into an array
  data.push(searchQuery);
  searchObjects();
  //print the parseData that is the results of the searchObjects
  console.log(parseData.slice(0,3));

  // Send data to console
  res.send(parseData.slice(0,3));

  //reset parseData and data back to empty array
  parseData=[];
  data=[];
})
function searchObjects(){
  //find length of testData.csv
  var length = Object.keys(dummyData).length;
  for(let i=0; i<length;i++){
    //need to add more search queries here and condition
    //but in short if the testData.csv ->severity is the same as
    //the severity from the form which is stored in Data
    //push that whole object into parseData
    if(dummyData[i].Severity==data[0].Severity){
      parseData.push(dummyData[i]);
    }
    
  }
}
module.exports = router;
