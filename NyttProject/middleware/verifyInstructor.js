

const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyTokenInstructor = (req, res, next)=>{
    const token = req.cookies.jwtToken;
    if(!token ) return res.render("login.ejs", {err:"Du måste logga in"})
 
 
    const validUser =   jwt.verify(token, process.env.SECRET_KEY)
  
  // läser in den här token data , lägger till token datan i req objektet. 
  //

  console.log(" verify intructor is triggered")
  
  //console.log(validUser.user.role)

  if(!validUser.user.role) return res.render("login.ejs", {err:"Du har inte authorization för att kunna göra detta"})

 
  req.user = validUser;

  next();
}

module.exports = verifyTokenInstructor;