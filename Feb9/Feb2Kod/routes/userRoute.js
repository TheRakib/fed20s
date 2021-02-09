const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken"); 
const verifyToken = require("./middleware/userVerify");


const crypto = require("crypto");

const nodemailer = require("nodemailer");
const nodemailerSmtpTransport = require("nodemailer-smtp-transport");



require("dotenv").config();



let errors = []


// nåt transport för att kunna skicka till användare 


// kl. 11.00 

const transport = nodemailer.createTransport( 
    nodemailerSmtpTransport({ service: "gmail",
    auth:{
      user: "feddynamiskweb@gmail.com",
      pass: "FedDynamiskWeb.2021"
    }
})

 )
//13:50 : 
 
 // glöm inte aktivera mindre säkra app
 // ta bort MFA  / två väg authentication



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
        password: hashedPassword,
        email: req.body.email
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





router.get("/reset", (req, res)=> {



    res.render("reset.ejs")

})



router.post("/reset",  async (req, res)=>{


    // Vi ska först användare finns i database 

   const user =  await User.findOne({email:req.body.email})
      
    // Vi ska hämta deras mejl adress 



    //res.send(user.email)

      //  -> token och tokenExpiration 

      if (user) {
      const token = await crypto.randomBytes(32);

  
         //   spara i database 

         user.token= token.toString("hex");
         user.tokenExpiration = Date.now() + 3600000;
         await user.save();
    
         // send mail with better mail server
    await transport.sendMail({
            from: "feddynamiskweb@gmail.com",
            to: user.email, // Change to your recipient
           // Change to your verified sender
            subject: 'Återställa ditt lösenord',
           
            html: `<h1> Trycka på den här länken : <a href=" http://localhost:8000/reset/${user.token}"> Link  </a> </h1>`,
         }) 
         


       return res.send("ditt lösenord är skickat")
      }


})



router.get("/reset/:token", async (req, res)=>{


 const token =  req.params.token

 
 // check if user has the right token and token has valid time


 const userWithtokenExist = await User.findOne({token:token, tokenExpiration: {$gt:Date.now()}})

// console.log(userWithtokenExist)

 res.render("resetPassForm.ejs", {user:userWithtokenExist})


})


router.post("/resetPass" , async (req, res)=>{
const nyttPass = req.body.password;
    // tar in nytt lösenord 
    // spara in i user in i database
const user = await User.findOne({email:req.body.email})
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(nyttPass, salt)
  user.password = hashedPassword ;

  user.save();

res.send("Lykades att skapa nytt lösenord")


})


module.exports = router;