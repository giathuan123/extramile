var { data, indexes } = require("./dbloader.js")
const countyMap = require("./counties.json");
const fs = require("fs");

function AccCounties(){
  var ret = []
  var countyIndex = indexes.getIndex("CountyIndex");
  for(const[key, value] of Object.entries(countyIndex.index)){
    if(countyMap[key] == undefined){
      fs.writeFileSync("./undefinedCounties", key.toString() + "\n", {flag: 'a'});
    }
    //creates array of objects with parameters name:(county_name), accidents:(length of id), id:(id)
    ret.push(
     {
        name: key,
        accidents: value.length,
        id: countyMap[key]
      }
    );
  }
  
return ret;
}
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


module.exports=
 {
AccCounties,
getMaxId,
SeverityChart
 }


