const express = require("express");
const data = require("./data/testData.json");
const cors = require("cors");
const app = express();
const route = require("./routes/router.js");
app.use(cors());
app.use(express.json());

app.use("/users", route);
app.get("/", (req,res)=>{
    res.send("Express here!");
})
app.get("/testData", (req, res) =>{
  res.json(data);
})
app.listen(3001,()=>{
    console.log("Express server is running on port 3001");
});
