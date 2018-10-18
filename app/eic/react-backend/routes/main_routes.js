
//Dependencies
var express = require('express');
var router = express.Router();


//controllers
var user_controller = require('../controller/user_controller');


//testing if express responds to react
router.get('/test',user_controller.list_db);

module.exports = router;