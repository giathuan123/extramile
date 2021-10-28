const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes/router.js");
const dbloader = require("./db/dbloader")

app.use(cors());
app.use(express.json());
app.use("/users", route);

const server = app.listen(3001, () => {
  console.log("Server running on port 3001")
  dbloader.setup();
});

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
  

});

function shutDown() {
  console.log('Backing up data...');
  // Call data back up here

  console.log('Shutting down server...');
  server.close(() => {
    console.log('Closed remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}


