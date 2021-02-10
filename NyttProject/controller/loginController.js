const User = require("../model/user");


const loginRender = (req, res)=>{


    res.render("login.ejs", {err:" "})

}

const loginSubmit = async(req, res)=> {
  
    // read from req.body 

    // kolla upp i databasen om användare finns


    // jämför vi lösenord bcrypt.compare

    // låter användare logga in 
        //jwt 



}

module.exports = {
    loginRender, 
    loginSubmit
}