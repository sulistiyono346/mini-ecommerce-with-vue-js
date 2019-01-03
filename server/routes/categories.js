var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/categories")
var { isLogin } = require("../middleware/validations")


/* GET users listing. */
router.get('/', isLogin, categoryController.get_category)
router.post('/', isLogin, categoryController.create_category)
router.put('/:id', isLogin, categoryController.updated_category)
router.delete('/:id', isLogin, categoryController.delete_category)

module.exports = router;
