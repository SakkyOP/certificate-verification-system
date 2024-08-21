const router = require("express").Router();
const { adminController } = require("../controllers")
const {loginController, registerController} = adminController

if (process.env.NODE_ENV === "development") {
	router.post("/register", registerController);
}
router.post("/login", loginController);

module.exports = router;
