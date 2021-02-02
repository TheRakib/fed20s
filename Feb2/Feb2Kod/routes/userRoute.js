const express = require("express");
const mongoose = require("mongoose");

const User = require("../model/user")

const router = express.Router();


const errors = " "
router.get("/register", (req, res) => {
    res.render("register.ejs", {errors})
})


router.post("/register", async (req, res) => {
    //reg.body
    // vi ska gör hash på lösenord
 const errors = []
   
 if( !req.body.name || !req.body.password) {
    errors.push("field is required")
    res.render("error.ejs" , {errors})
      
   }


//13.00 

   const user=  await new User({
        name: req.body.name,
        password: req.body.password
    }).save()
    console.log(user)

    res.redirect("/")
    
})

router.get("/login",  (req, res)=>{
    res.render("login.ejs")
})


router.post("/login" , async (req, res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const username = await User.find({name:name})
    const userPass = await User.find({ password: password})
    if( username[0].name === name && userPass[0].password ===password)
    {
        res.send("Välkommen till min hemsida")
       
    }
 // läsa data från databasen
 res.send(" försök igen")
})

module.exports = router;