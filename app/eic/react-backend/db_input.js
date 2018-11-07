#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
var async = require('async')

var Student = require('./models/Student')
var Buddy  = require('./models/Buddy')

var User = require('./models/User')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


var students = []
var buddies = []

//Takes input and creates a student based on parameters
function student_create(user_name,email,full_name, biography,cb){
  var student = new Student({
    user_name: user_name,
    contact: email,
    biography: biography, 
    full_name: full_name
  });
  student.save(function(err){
    if(err){
      cb(err,null);
      return;
    }
    students.push(student)
    cb(null,student);
  });
}

function buddy_create(user_name,email,cb){
  var buddy = new Buddy({
   user_name: user_name,
   contact: email
  });
  buddy.save(function(err){
    if(err){
      cb(err,null);
      return;
    }
    students.push(buddy)
    cb(null,buddy);
  });
}
//custom input to create test students
function addBuddy(email,cb){
  var student = student.find({contact: email});
  
}

function createStudent(cb) {
  console.log("step 1 ");
  async.parallel([

    function(callback){
      student_create('Dolo4','dolo4@gmail.com','Dolores Hubert','CS in iowa',callback);
    },
    function(callback){
      student_create('MScol','mscolariasdf@gmail.com','Matt Scol', 'Cs major in UCSC',callback);
    },
  ],
  cb);
}


function createBuddy(cb) {
  console.log("step 1 ");
  async.parallel([

    function(callback){
      buddy_create('Dutch','odst1@gmail.com',callback);
    },
    function(callback){
      buddy_create('Mickey','mickJaeger@gmail.com',callback);
    },
  ],
  cb);
}

async.series([
  createBuddy
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
}
);



