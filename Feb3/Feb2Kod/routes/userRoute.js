const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken"); 
const verifyToken = require("./middleware/userVerify")



let errors = []





router.get("/test", verifyToken, (req, res)=>{


    res.send("it works ")

})

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").send("it is done!")


})

//10:30 

router.get("/register", (req, res) => {
    res.render("register.ejs", { errors })
})





router.post("/register", async (req, res) => {
    if (!req.body.name) {
        errors.push(" Name is required")
    }

    if (!req.body.password) {
        errors.push(" password is required")
    }

    if (!req.body.name || !req.body.password) {

        res.render("register.ejs", { errors })
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt)



    const user = await new User({
        name: req.body.name,
        password: hashedPassword
    }).save()

    res.redirect("/")

})

router.get("/login", (req, res) => {
    res.render("login.ejs")
})


router.post("/login", async (req, res) => {
    const name = req.body.name;
    //const password = req.body.password;
    const user = await User.findOne({ name: name })

    // find -> array av object 
    // findOne -> ett object

    // 9:30 
    const checkedPassword = await bcrypt.compare(req.body.password, user.password)

    
    if (checkedPassword) {
        
        const jwtToken = await jwt.sign({user:user}, process.env.secretKey)


        
        if(jwtToken)
        {

            const cookie = req.cookies.jwtToken


            if(!cookie) {
              
                res.cookie("jwtToken", jwtToken, {maxAge:3600000, httpOnly: true} )
            }
                 // jwtToken adfaseasdgadsgasdgsadgasdgasdga
               
             
            //console.log(req.cookies.jwtToken)
         return  res.send("hello it works")
        }
       
        

        // client --> middleware --> server

        // verifiera token 

    }
    // läsa data från database
    res.send(" försök igen")
})

module.exports = router;