const express = require ("express");
const dummyData = require("../data/testData.json");
const router = express.Router();

usersRoute = require("../controllers/usersData");

router.get("/",usersRoute.usersData);
router.post("/api", (req, res)=>{ console.log(req.body); 
  res.send("Successfull");
})
module.exports = router;
