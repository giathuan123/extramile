const fs = require('fs');
const path = require('path');
const { data } = require('./load.js');
const { Index, IndexContainer } = require("./index.js");

function initIndex(){
  var indexContainer = new IndexContainer();
  Index.setData(data);
  var timeIndex = new Index("TimeIndex", (data)=>{
    if(data.Start_Time != undefined){
      return data.Start_Time.split(" ")[0]
    }
    return undefined;
  });
  var cityIndex = new Index("CityIndex", (data)=>data.City);
  var countyIndex = new Index("CountyIndex", (data)=>{return data.County + " County, " + data.State;});
  var stateIndex = new Index("StateIndex", (data)=>data.State);
  var severityIndex = new Index("ServerityIndex", (data)=>data.Severity);
  indexContainer.addIndex(severityIndex);
  indexContainer.addIndex(timeIndex);
  indexContainer.addIndex(cityIndex);
  indexContainer.addIndex(countyIndex);
  indexContainer.addIndex(stateIndex);
  
  return indexContainer;
}
function shutDown(server, connections) {
  backup(data);
  console.log('[INFO] Shutting down server...');
  server.close(() => {
    console.log('[INFO] Closed remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('[INFO] Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000); 
}

function backup(newData) {
    console.log("[INFO] Backup in progress...")
    let data = JSON.stringify(newData);
    const filename = path.resolve(__dirname, './data/backup.json')
    fs.writeFileSync(filename, data), function(err) {
        if(err) console.log('[ERROR] ', err)
        else{
          console.log("[INFO] Backup successful data saved to " + filename);
        }
    };
}


module.exports = {shutDown, data, indexes: initIndex()};

// function getMostRecentBackup(dir) {
//     const files = orderBackups(dir);
//     return files.length ? files[0] : undefined;
// }

// function orderBackups(dir) {
//     return fs.readdirSync(dir)
//         .filter( (file) => fs.lstatSync(path.join(dir, file)).isFile())
//         .map( (file) => ({
//             file, mtime: fs.lstatSync(path.join(dir,file)).mtime
//         }))
//         .sort((a,b) => b.mtime.getTime() - a.mtime.getTime());
// }
