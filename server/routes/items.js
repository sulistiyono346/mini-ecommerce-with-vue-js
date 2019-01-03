var express = require('express');
var router = express.Router();
const upload = require("../helpers/upload")
const itemController = require("../controllers/items")
var { isLogin } = require("../middleware/validations")

/* GET users listing. */
router.get('/', isLogin, itemController.get_item)
router.get('/:id', itemController.detail_item)
router.post('/', isLogin, upload.multer.single('img'),
    upload.sendUploadToGCS, itemController.add_item)
router.put('/:id', isLogin, itemController.updates_item)
router.delete('/:id', isLogin, itemController.delete_item)

module.exports = router;
