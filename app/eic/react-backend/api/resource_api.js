
//Dependencies
var express = require('express');
var router = express.Router();


//controllers
var buddy_controller = require('../controller/buddy_controller');
var student_controller = require('../controller/student_controller');

//get all students
router.get('/get_all_student', student_controller.get_student_info);

//get specific user by email
router.get('/get_student_email/:id',student_controller.get_student_email);

//this gets partial matches for the student
router.get('/get_student_partial/:id',student_controller.get_student_partial);

//Gets all buddies
router.get('/get_all_buddy', buddy_controller.get_buddy_info);

//Get specific buddy by email
router.get('/get_buddy_email/:id',buddy_controller.get_buddy_email);

//Gets partial matches for buddy
router.get('/get_buddy_partial/:id',buddy_controller.get_buddy_partial);







module.exports = router;
