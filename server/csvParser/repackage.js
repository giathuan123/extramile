const o = require('./' + process.argv[2]);

repacked = {}
o.map((raw)=>{
    repacked[raw.ID] = {
      State: raw.State,
      Severity: raw.Severity,
      Start_Time: raw.Start_Time,
      Street: raw.Street,
      City: raw.City,
      Zipcode: raw.Zipcode,
      Weather: raw.Weather_Condition,
    }
})

console.log(JSON.stringify(repacked));
