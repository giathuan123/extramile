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
  console.log(parseData);
  // Send data to console
  res.send(parseData);

  //reset parseData and data back to empty array
  parseData=[];
  data=[];
})
function searchObjects(){
  //find length of testData.csv
  var length = Object.keys(dummyData).length;
  var placer_i = 0;
  //finding street
  for(let i=0; i<length;i++){
    //need to add more search queries here and condition
    //but in short if the testData.csv ->severity is the same as
    //the severity from the form which is stored in Data
    //push that whole object into parseData
    if(dummyData[i].Street==data[0].Street){
      parseData.push(dummyData[i]);
    }
  }
  //finding State
  for(let i=0;i<length;i++){
    if(dummyData[i].State==data[0].State){
      parseData.push(dummyData[i]);
    }
  }
  //finding Zip
  for(let i=0;i<length;i++){
    if(dummyData[i].Zip==data[0].Zip){
      parseData.push(dummyData[i]);
    }
  }
  //finding Severity
  let not_done=false;
  var temp_i=0;
  var severity_index=0;
  if(data[0].Severity.length>1){
    while(temp_i<length && not_done == false){
      if(dummyData[temp_i].Severity==data[0].Severity[severity_index]){
        parseData.push(dummyData[temp_i]);
      }
      if(temp_i+1==length && not_done==false){
        severity_index++;
        temp_i=0;
      }
      if(severity_index==data[0].Severity.length){
        not_done=true;
      }
      temp_i++;
    }
  }
  else{
    for(let i=0; i<length;i++){
      if(dummyData[i].Severity==data[0].Severity){
        parseData.push(dummyData[i]);
      }
    }
  }
  
  
}
module.exports = router;
