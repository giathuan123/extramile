var { data, indexes } = require("../db/dbloader.js")
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
  console.log(ret.length)
return ret;
}
console.log(AccCounties());
// const arrayData = [
//   {
//       key: 'blah',
//       value: 'Blah Blah'
//   },
//   {
//       key: 'foo',
//       value: 'Foos'
//   },
//   {
//       key: 'baz',
//       value: 'Bars'
//   },
//   {
//       key: 'baz',
//       value: 'Bazingo'
//   }
// ];
// const foodBar = arrayData.find(item => item.key === "baz");
// for (let i = 0; i < arrayData.length; i++)
// {
//   if(foodBar)
//   {
//     console.log(foodBar['value'])
//   }
  
// }


// const users = [
//   { id: 0, name: 'John' },
//   { id: 1, name: 'Wayne' },
//   { id: 2, name: 'David' },
// ];
// const names = [];

// for (let i = 0; i < users.length; i++) {
//     if (!users[i].hasOwnProperty('name')) {
//         continue;
//     }

//     names.push(users[i].name);
// }

// console.log(names);



// const resultValue = foodBar['value']; // here the extracted value is by key
// console.log(resultValue)

module.exports = AccCounties;