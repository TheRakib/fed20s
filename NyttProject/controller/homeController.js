
const homeRender = async(req, res)=>{
   // nåt i request har alla information
    console.log(req.user)
   // res.send({user})
   res.render("home.ejs", {user: req.user.user} )
 
}
   
const homeIntructor = (req, res)=>{
    console.log(req.user.user)

    res.render("instructorHome.ejs", {user: req.user.user})
}
module.exports = {
    homeRender,
    homeIntructor
}