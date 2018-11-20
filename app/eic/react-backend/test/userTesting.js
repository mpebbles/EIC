process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let student = require("../models/Student");
let buddy = require("../models/Buddy");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should;

chai.use(chaiHttp);

describe("/POST buddy information", () => {
  it("it should POST a buddy information", done => {
    let buddy = {
      biography: "Graduated at Pepperdine",
      skills: "C++, HTML, JAVA",
      company: "Wizards of the Coast"
    };
    chai
      .request(app)
      .post("/edit_student_profile")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZWIzZjJlZGJiN2M3MDJjZThhMWZlYyIsImlhdCI6MTU0MjM0ODE4MywiZXhwIjoxNTQyMzU1MzgzfQ.-av6OMJuxm0zWOc8AhOuaJHbinK2nVEPZe981__eZlU"
      )
      .send(buddy)
      .end((err, res) => {
        res.should.exist(res.body);
        res.should.have.property("biography");
        res.should.have.property("skills");
        res.should.have.property("company");
        done();
      });
  });
});
