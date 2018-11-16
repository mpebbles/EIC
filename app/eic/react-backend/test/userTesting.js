process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let student = require('../models/Student');
let buddy = require('../models/Buddy');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should;


chai.use(chaiHttp);

describe('/POST buddy information', () => {
	it('it should POST a buddy information',(done) => {
		let buddy = {
				biography: 'Graduated at Pepperdine',
				skills: "C++, HTML, JAVA",
				company: "Wizards of the Coast"
		} 
		chai.request(app)
		.post('/edit_student_profile')
		.send(buddy)
		.end((err, res) => {
			res.should.have.property('biography');
			res.should.have.property('skills');
			res.should.have.property('company');
			done();
		})

	})
});