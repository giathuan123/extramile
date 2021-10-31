const o = require("./repacked1.json");
const o1 = require("./repacked2.json");
const o2 = require("./repacked3.json");
const o3 = require("./repacked4.json");
const o4 = require("./repacked5.json");
const o5 = require("./repacked6.json");

data = [o, o1, o2, o3, o4, o5];
total = {};
data.forEach(object=>{
  total = Object.assign(total, object);
});
console.log(JSON.stringify(total));
