const express = require("express");
const app = express();

app.use("/users",require("./routes/router"));

app.get("/", (req,res)=>{
    res.send("Express here!");
})
app.listen(3001,()=>{
    console.log("Express server is running on port 3001");
});