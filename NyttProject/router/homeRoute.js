const express = require("express");
const axios = require("axios")
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const verifyInstructor = require("../middleware/verifyInstructor");
const {homeRender, homeIntructor} = require("../controller/homeController");
const Picture = require("../model/picture");
var multer  = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+".png")
    }
  })
   
var upload = multer({ storage: storage })



router.get("/", verifyUser , homeRender)

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/login")
})

router.get("/profile", async (req, res)=>{
    const allPics = await Picture.find();
    res.render("picture.ejs", {allPics})
})

router.post("/profile", upload.single("image"), async (req, res)=>{


    const name = req.body.name
    const path = req.file.filename
   


      console.log( path  )
    const data =  await new Picture( {name:name, path:path}).save();
// läsa data från user form 
      console.log(data);

res.redirect("/profile")

})

//Kl. 11:00 

router.get("/instructor", verifyInstructor , homeIntructor)


module.exports = router;

// /addCourse, /intructorSite : - verifyInstructor

//  /home , /user, / checkout  : -verifyUser
