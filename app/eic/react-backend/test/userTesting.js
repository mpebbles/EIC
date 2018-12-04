process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let student = require("../models/Student");
let buddy = require("../models/Buddy");
let googleUser = require("../models/GoogleUser");
let contract = require("../models/Contract");
let company = require("../models/Company");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("/POST edit buddy information", () => {
  it("it should POST a buddy information", done => {
    let buddyParam = {
      biography: "Graduated at UCSC",
      skills: "C++, Java, JavaScript",
      company: "MICROSOFT"
    };
    googleUser.findOne({ contact: "hycheng@ucsc.edu" }, function(err, buddy) {
      chai
        .request(app)
        .post("/api/editBuddyProfile")
        .set("Authorization", "Bearer " + buddy.eicToken)
        .send(buddyParam)
        .end((err, res) => {
          res.body.buddy.should.have.property("biography"),
            res.body.buddy.should.have.property("skills"),
            res.body.buddy.should.have.property("company"),
            done();
        });
    });
  });
});

describe("/GET get buddy information by email", () => {
  it("it should GET a buddy's information", done => {
    chai
      .request(app)
      .get("/api/getBuddyEmail/hycheng@ucsc.edu")
      .end((err, res) => {
        res.body[0].buddy[0].should.have.property("biography"),
          res.body[0].buddy[0].should.have.property("skills"),
          res.body[0].buddy[0].should.have.property("userName"),
          res.body[0].buddy[0].should.have.property("company"),
          res.body[0].buddy[0].should.have.property("_id");
        done();
      });
  });
});

describe("/GET student information by email", () => {
  it("it should GET a student information", done => {
    chai
      .request(app)
      .get("/api/getStudentEmail/eicstudent2143@gmail.com")
      .end((err, res) => {
        res.body[0].student[0].should.have.property("userName"),
          res.body[0].student[0].should.have.property("biography"),
          res.body[0].student[0].should.have.property("buddy"),
          res.body[0].student[0].should.have.property("pendingBuddy"),
          done();
      });
  });
});

describe("/POST create new contract", () => {
  it("it should POST a new contract", done => {
    var date = new Date(Date.now());
    let contractParam = {
      title: "UNIT_TEST_TITLE",
      skills: "UNIT_TEST_REALTED_SKILLS",
      description: "UNIT_TEST_DESCRIPTION",
      pay: "UNIT_TEST_PAY",
      location: "UNIT_TEST_LOCATION"
    };

    googleUser.findOne({ contact: "hycheng@ucsc.edu" }, function(err, buddy) {
      chai
        .request(app)
        .post("/api/createContract/")
        .set("Authorization", "Bearer " + buddy.eicToken)
        .send(contractParam)
        .end((err, res) => {
          contract.findOne({ title: contractParam.title }, function(
            err,
            contract
          ) {
            contract.should.have.property("title"),
              contract.should.have.property("creator"),
              contract.should.have.property("description"),
              contract.should.have.property("creationDate"),
              contract.should.have.property("pay"),
              contract.should.have.property("location"),
              contract.should.have.property("relatedSkills");
            contract.remove();
            done();
          });
        });
    });
  });
});

describe("/POST create new company user", () => {
  it("it should create a new company user", done => {
    let user = {
      contact: "UNIT_TEST_EMAIL@hotmail.com"
    };
    googleUser.findOne({ contact: "hycheng@ucsc.edu" }, function(
      err,
      testUser
    ) {
      chai
        .request(app)
        .post("/api/createCompanyAccount/")
        .set("x-user-name", "MICROSOFT")
        .auth("user", testUser)
        .end((err, res) => {
          company.findOne({ copmanyName: "MICROSOFT" }, function(
            err,
            company
          ) {
            console.log(company);
            company.should.have.property("companyName"),
              company.should.have.property("contracts"),
              done();
          });
        });
    });
  });
});
