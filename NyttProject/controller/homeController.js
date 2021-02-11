const homeRender = (req, res)=>{

   // nåt i request har alla information


    console.log(req.user)


    res.render("home.ejs", {user: req.user.user} )


}

module.exports = {
    homeRender
}