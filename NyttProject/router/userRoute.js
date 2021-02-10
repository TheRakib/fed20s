
const express = require("express");

const router = express.Router();

const {registerRender, registerSubmit } =require("../controller/registerController")

// controller ska importeras här 

//router.get().post()



router.get("/register", registerRender );

router.post("/register", registerSubmit);


module.exports = router;

//10:30

