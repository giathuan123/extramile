const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes/router.js");
const { shutDown } = require("./db/dbloader")

app.use(cors());
app.use(express.json());
app.use("/users", route);

const server = app.listen(3001, () => {
  console.log("[INFO] Server running on port 3001")
});

process.on('SIGINT', ()=>shutDown(server, connections));
process.on('SIGTERM', ()=>shutDown(server, connections));

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});



