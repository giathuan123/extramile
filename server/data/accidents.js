var testData = require("./testData.json");
var a = JSON.parse(JSON.stringify(testData[0].ID));
console.log(a);



//if start and end time = 2016-02-08 this return testdata.id
Object.keys(testData).forEach(function(key) {
    console.log(key, testData[key].ID);
});


