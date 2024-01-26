const router = require("express").Router();
const User = require("../models/User");

router.get("/login", (req,res)=>{
    res.send("User Logged In");
});

router.get("/reqister", (req,res)=>{
    res.send("User registered");
} );

module.exports = router