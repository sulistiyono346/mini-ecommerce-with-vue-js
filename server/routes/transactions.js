var express = require('express');
var router = express.Router();
const transactionController = require("../controllers/transactions")
var { isLogin } = require("../middleware/validations")

router.get("/cart", isLogin, transactionController.get_cart)
router.put("/add_to_cart", isLogin, transactionController.add_to_cart)
router.put("/delete_cart/:id", isLogin, transactionController.delete_cart_item)
router.put("/up_qty/:id", isLogin, transactionController.up_qty)
router.put("/down_qty/:id", isLogin, transactionController.down_qty)
router.post('/checkout', isLogin, transactionController.checkout)


module.exports = router
