const jwt = require("jsonwebtoken");
require("dotenv").config();



const verifyToken = (req, res, next)=> {
 
    //efter användare har loggat in har de rätt jwtToken
    const token = req.cookies.jwtToken;
    
    if(!token) return res.send("You don't have authentication")
    
    //verifiera token 
    const verifiedUser = jwt.verify(token, process.env.secretKey)
    //console.log(verified.user)
    
    req.user= verifiedUser;
    
    
    next();
    
    }

    module.exports = verifyToken;