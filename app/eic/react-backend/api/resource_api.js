
//Dependencies
var express = require('express');
var router = express.Router();


//controllers
var user_controller = require('../controller/student_controller');


//testing if express responds to react
router.get('/api/get_student/:id)',student_controller.list_db);



module.exports = router;