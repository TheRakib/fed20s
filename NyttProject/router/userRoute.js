
const express = require("express");

const router = express.Router();

const {registerRender, registerSubmit } =require("../controller/registerController")

const {loginRender, loginSubmit} = require("../controller/loginController");
 
const {resetRender, resetSubmit} = require("../controller/resetPassword");
const verifyToken = require("../middleware/verifyUser");
// controller ska importeras här 

//router.get().post()



router.get("/register",   registerRender );

router.post("/register", registerSubmit);

router.get("/login", loginRender );

router.post("/login", loginSubmit)

router.get("/reset",  resetRender);

router.post("/reset", resetSubmit)



module.exports = router;

//10:30

