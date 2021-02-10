
const express = require("express");

const router = express.Router();

// controller ska importeras här 

//router.get().post()



router.get("/register", registerController );

//router.post("/register", registerController);



module.exports = router;



