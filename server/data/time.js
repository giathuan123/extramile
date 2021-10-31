var testData = require("./testData3.json");
var a = JSON.parse(JSON.stringify(testData[0].ID));
//console.log(a);

  

//A function that returns the start time of accidents for a specific date.
Object.keys(testData).forEach(function(key) {
    console.log(testData[key].ID, testData[key].Start_Time);
});


