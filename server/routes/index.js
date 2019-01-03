var express = require('express');
var router = express.Router();
var userController = require("../controllers/users")
var shippingController = require("../controllers/shipping")
var { isLogin } = require("../middleware/validations")

/* GET users listing. */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Status connect server"
  })
})
router.get("/validate", isLogin, userController.isLogin)

router.get("/provinces", shippingController.get_province)
router.get("/city/:id", shippingController.get_city)
router.post("/services", shippingController.get_service)



router.post("/register", userController.register)
router.post("/login", userController.login)


module.exports = router;