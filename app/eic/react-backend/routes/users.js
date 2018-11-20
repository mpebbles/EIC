var express = require("express");
var router = express.Router();
var user_controller = require("../controller/user_controller");
/* GET users listing. */

router.get("/", user_controller.list_users);

module.exports = router;
