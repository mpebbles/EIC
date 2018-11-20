//Dependencies
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

//controllers
var buddy_controller = require('../controller/buddy_controller');
var student_controller = require('../controller/student_controller');
var user_controller = require('../controller/user_controller');
var resourceController = require('../controller/resourceController');


//get all students
router.get('/get_all_student', student_controller.get_student_info);

//get specific user by email
router.get('/get_student_email/:id', student_controller.get_student_email);

//this gets partial matches for the student
router.get('/get_student_partial/:id', student_controller.get_student_partial);

//Gets all buddies
router.get('/get_all_buddy', buddy_controller.get_buddy_info);

//Get specific buddy by email
router.get('/get_buddy_email/:id',buddy_controller.get_buddy_email);

//Gets partial matches for buddy
router.get('/get_buddy_partial/:id',buddy_controller.get_buddy_partial);

router.get('/add_pending_buddy/:buddy_email', student_controller.add_pending_buddy);

router.get('/add_pending_student/:student_email', buddy_controller.add_pending_student);

router.get('/get_pending_student/', buddy_controller.get_pending_student);

router.get('/get_pending_buddy/', student_controller.get_pending_buddy);

router.get('/reject_pending_student/:student_email', buddy_controller.reject_pending_student);

router.get('/reject_pending_buddy/:buddy_email', student_controller.reject_pending_buddy);

router.get('/accept_pending_student/:student_email', buddy_controller.accept_pending_student);

router.get('/accept_pending_buddy/:buddy_email', student_controller.accept_pending_buddy);

router.get('/reject_student/:student_email', buddy_controller.reject_student);

router.get('/reject_buddy/:buddy_email', student_controller.reject_buddy);

router.get('/get_student/', buddy_controller.get_student);

router.get('/get_buddy/', student_controller.get_buddy);

router.get('/get_buddy_profile/', buddy_controller.get_buddy_profile);

router.get('/get_student_profile/', student_controller.get_student_profile);

router.post('/edit_buddy_profile/', buddy_controller.edit_buddy_profile);

router.post('/edit_student_profile/', student_controller.edit_student_profile);

router.post('/add_user_image/',upload.single('uploadedImage'),user_controller.addUserProfileImage);

router.get('/getUserImage/:id',user_controller.getUserProfileImage);



// requires: title, skills[](optional in model), content
router.post('/createResource/',resourceController.createResource);

router.get('/getResource/', resourceController.getResources);

router.get('/getResourceByCreator/', resourceController.getResourceByCreator);

router.get('/getResourceByTitle/', resourceController.getResourceByTitle);

router.post('/deleteResourceByTitle/', resourceController.deleteResourceByTitle);


module.exports = router;
