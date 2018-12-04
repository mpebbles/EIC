//Dependencies
var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

//controllers
var buddyController = require("../controller/buddyController");
var studentController = require("../controller/studentController");
var userController = require("../controller/userController");
var resourceController = require("../controller/resourceController");
var companyController = require("../controller/companyController");
var contractController = require("../controller/contractController");

//get all students
router.get("/getAllStudent", studentController.getStudentInfo);

//get specific user by email
router.get("/getStudentEmail/:id", studentController.getStudentEmail);

//this gets partial matches for the student
router.get("/getStudentPartial/:id", studentController.getStudentPartial);

//Gets all buddies
router.get("/getAllBuddy", buddyController.getBuddyInfo);

//Get specific buddy by email
router.get("/getBuddyEmail/:id", buddyController.getBuddyEmail);

//Gets partial matches for buddy
router.get("/getBuddyPartial/:id", buddyController.getBuddyPartial);

router.get(
  "/addPendingBuddy/:buddyEmail",
  studentController.addPendingBuddy
);

router.get(
  "/addPendingStudent/:studentEmail",
  buddyController.addPendingStudent
);

router.get("/getPendingStudent/", buddyController.getPendingStudent);

router.get("/getPendingBuddy/", studentController.getPendingBuddy);

router.get(
  "/rejectPendingStudent/:studentEmail",
  buddyController.rejectPendingStudent
);

router.get(
  "/rejectPendingBuddy/:buddyEmail",
  studentController.rejectPendingBuddy
);

router.get(
  "/acceptPendingStudent/:studentEmail",
  buddyController.acceptPendingStudent
);

router.get(
  "/acceptPendingBuddy/:buddyEmail",
  studentController.acceptPendingBuddy
);

router.get("/rejectStudent/:studentEmail", buddyController.rejectStudent);

router.get("/rejectBuddy/:buddyEmail", studentController.rejectBuddy);

router.get("/getStudent/", buddyController.getStudent);

router.get("/getBuddy/", studentController.getBuddy);

router.get("/getBuddyProfile/", buddyController.getBuddyProfile);

router.get("/getStudentProfile/", studentController.getStudentProfile);

router.post("/editBuddyProfile/", buddyController.editBuddyProfile);

router.post("/editStudentProfile/", studentController.editStudentProfile);

router.post(
  "/addUserImage/",
  upload.single("uploadedImage"),
  userController.addUserProfileImage
);

router.get("/getUserImage/:id", userController.getUserProfileImage);

// requires: title, skills[](optional in model), content
router.post("/createResource/", resourceController.createResource);

router.get("/getResource/", resourceController.getResources);

router.get("/getResourceByCreator/", resourceController.getResourceByCreator);

router.get("/getResourceByTitle/", resourceController.getResourceByTitle);

router.post(
  "/deleteResourceByTitle/",
  resourceController.deleteResourceByTitle
);

router.post("/deleteResourceById/", resourceController.deleteResourceById);

// requires: contact
router.post("/createCompanyAccount/", companyController.createCompanyAccount);

router.get("/getCompanyInfo/", companyController.getCompanyInfo);

router.get("/getCompanyProfile/", companyController.getCompanyProfile);

router.post("/editCompanyProfile/", companyController.editCompanyProfile);

router.post("/createContract/", contractController.createContract);

router.get("/getContracts/", contractController.getContracts);

router.post("/deleteContractById/", contractController.deleteContractById);

module.exports = router;
