process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let student = require("../models/Student");
let buddy = require("../models/Buddy");
let googleUser = require("../models/GoogleUser")
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
    googleUser.findOne({contact: 'hycheng@ucsc.edu'},function(err, buddy){
    	 chai.request(app)
      .post("/api/edit_buddy_profile")
      .set(
        "Authorization",
        "Bearer "+ buddy.eic_token
      )
      .send(buddyParam)
      .end((err, res) => {
        res.body.buddy.should.have.property("biography");
        res.body.buddy.should.have.property("skills");
        res.body.buddy.should.have.property("company");
        done();
      });
    });

   
  });
});



describe("/GET get buddy information", () => {
	it("it should GET a buddy's information", done => {
		cha.request(app)
		.get("/api/get_buddy_email/hycheng@ucsc.edu")
		.end((err, res) => {
			
		});
	});
});