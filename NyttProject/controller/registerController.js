
const mongoose = require("mongoose");

const registerRender = (req, res)=>{

    res.render("register.ejs")

}

const registerSubmit =(req, res)=>{



 res.redirect("/login")
}


module.exports = {
    registerRender, 
    registerSubmit

}