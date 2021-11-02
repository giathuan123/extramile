// parse small segment of the csv at a time to prevent using up the heap
const { Parser } = require("./Parser.js");
const fs = require('fs');
const SEGMENT_SIZE = 300000;
const readline = require("readline");

var filename = "outFile";
var index = 1;
var outFile = fs.createWriteStream(filename + index + ".json");

var pipe = readline.createInterface({
  input: process.stdin,
  output: outFile 
})

var p = new Parser(pipe);

p.input.on('line',(data)=>{
  if(p.data.length > SEGMENT_SIZE){
    outFile.write(JSON.stringify(p.data));
    outFile.close();
    outFile = fs.createWriteStream(filename + (++index) + ".json");
    console.log("Switching file to" + filename + (index) + ".json");
    p.data = [];
  }
});
p.input.on('close', ()=>{
  outFile.write(JSON.stringify(p.data));
})



