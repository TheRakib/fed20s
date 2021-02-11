
const User = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//npm i nodemailer
// reset render : en resetemailForm.ejs
// reset submit : submit formuläret




//skapar en tunnel till från vår app till mail server
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "feddynamiskweb@gmail.com",
        pass: "FedDynamiskWeb.2021"
    }
})



const resetRender = (req, res)=>{



    res.render("reset.ejs")

}

const resetSubmit = async (req, res)=>{

    const email = req.body.email

    // check if user exists

  const user =   await User.findOne({email:email});

  if(!user) return res.redirect("/register")
    // token , tokenExpiration 
    const token = await crypto.randomBytes(32).toString("hex");

    // sparar token, token expiration
    user.token = token;
    user.tokenExpiration = Date.now() + 3600000;
    await user.save()
    // en länk med token  till användarens mejl adressen
 // transport services for mejl: tar data från appen -- > mail server ---> användare får data
   
   transport.sendMail({
       from: "feddynamiskweb@gmail.com",
       to: user.email,
       subject: "reset password requested",
       html: `<h2> Klicka  <a href="http://localhost:8002/reset/${user.token}" > Här </a> för att kunna återställa lösenord </h2>`


   })

}


module.exports = {
    resetRender, 
    resetSubmit
}