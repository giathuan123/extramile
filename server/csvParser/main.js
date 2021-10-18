const {Parser} = require("./Parser.js");

p = new Parser();
p.input.on('close', ()=>console.log(JSON.stringify(p.data)));

