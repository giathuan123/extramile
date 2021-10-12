const express = require ("express");
const router = express.Router();

usersRoute = require("../controllers/usersData");

router.get("/",usersRoute.usersData);

module.exports = router;