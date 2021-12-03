if(process.argv.length < 4){
  console.log("Usage: node genTestData.json <outFile.json> <numberOfData>");
  return;
}
// only start loading here.
console.log("Getting data file....");
const fullData = require("./data.json");
const fs = require("fs");


end = parseInt(process.argv[3]);
i = 1;
outData = {};
full = Object.entries(fullData)
console.log(`Generating ${end} entries`)
for(const [key, value] of full){
    process.stdout.write(`${i}\r`);
  outData[key] = value;
  i++;
  if(i == end) break;
}
fs.writeFile(process.argv[2], JSON.stringify(outData), (e)=>console.log("Done!"));
