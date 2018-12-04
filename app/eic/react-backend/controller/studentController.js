var buddy = require("../models/Buddy");
var student = require("../models/Student");
var tokenUtils = require("../utils/token.utils");
var { findEmailByToken } = require("../models/GoogleUser");
const { body, validationResult } = require("express-validator/check");

//Insert new student into database
//Token validation not needed due to registration workflow
exports.createStudentAccount = function(req, res, next) {
  new student({
    userName: req.header("x-user-name"),
    contact: req.user.contact
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    return next();
  });
};

//Returns all students and their info
exports.getStudentInfo = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  student.find().exec(function(err, student) {
    if (err) {
      return next(err);
    }
    res.json([{ student }]);
  });
};

//Gets information based on the specific email
exports.getStudentEmail = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  student.find({ contact: req.params.id }).exec(function(err, student) {
    if (err) {
      return next(err);
    }
    res.json([{ student }]);
  });
};

// Gets buddy profile info based off of token
exports.getStudentProfile = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  console.log("Made it past token verify");
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];

  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );

  console.log("Token is", tokenToFindInDb);

  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    console.log("Searching for contact", contact);
    student
      .findOne({ contact: contact })
      // this is a user to make front end logic easier
      .exec(function(err, aUser) {
        console.log("Found result", aUser);
        res.json([{ aUser }]);
      });
  });
};

//Get students who have partial matches based on the user name
exports.getStudentPartial = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  student
    .find({ userName: { $regex: req.params.id, $options: "i" } })
    .limit(10)
    .exec(function(err, student) {
      if (err) {
        return next(err);
      }
      res.json([{ student }]);
    });
};

//Adds buddy to this student's pendingBuddy[],
exports.addPendingBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .findOne({ contact: req.params.buddyEmail })
        .exec(function(err, aBuddy) {
          if (err) return err;
          student
            .findOneAndUpdate(
              { _id: aStudent._id },
              { $push: { pendingBuddy: aBuddy._id } }
            )
            .exec();
        });
    });
  });
};

//Adds student to this buddy's student[] from pendingStudent[]
exports.acceptPendingBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .find({ _id: { $in: aStudent.pendingBuddy } })
        .exec(function(err, aBuddy) {
          if (err) return err;
          student
            .findOneAndUpdate(
              { _id: aStudent._id },
              { $pull: { pendingBuddy: aBuddy._id } }
            )
            .exec();
          student
            .findOneAndUpdate(
              { _id: aStudent._id },
              { $push: { buddy: aBuddy._id } }
            )
            .exec();
          //**this next call shouldn't be necessary**
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $pull: { pendingStudent: aStudent._id } }
            )
            .exec();
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $push: { student: aStudent._id } }
            )
            .exec();
        });
    });
  });
};

//Delete buddy from this student's pendingBuddy[]
exports.rejectPendingBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .findOne({ contact: req.params.buddyEmail })
        .exec(function(err, aBuddy) {
          if (err) return err;
          student
            .findOneAndUpdate(
              { _id: aStudent._id },
              { $pull: { pendingBuddy: aBuddy._id } }
            )
            .exec();
          //**this next call shouldn't be necessary**
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $pull: { pendingStudent: aStudent._id } }
            )
            .exec();
        });
    });
    res.send();
  });
};

//Delete buddy/student connection
exports.rejectBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .findOne({ contact: req.params.buddyEmail })
        .exec(function(err, aBuddy) {
          if (err) return err;
          student
            .findOneAndUpdate(
              { _id: aStudent._id },
              { $pull: { buddy: aBuddy._id } }
            )
            .exec();
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $pull: { student: aStudent._id } }
            )
            .exec();
        });
    });
    res.send();
  });
};

//View this student's pending buddies
exports.getPendingBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .find({ _id: { $in: aStudent.pendingBuddy } })
        .exec(function(err, aBuddy) {
          if (err) return err;
          res.json([{ aBuddy }]);
        });
    });
  });
};

//View this student's accepted buddies
exports.getBuddy = function(req, res, next) {
  tokenUtils.validateStudentCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, aStudent) {
      if (err) return err;
      buddy
        .find({ _id: { $in: aStudent.buddy } })
        .exec(function(err, aBuddy) {
          if (err) return err;
          res.json([{ aBuddy }]);
        });
    });
  });
};

exports.editStudentProfile = [
  (req, res, next) => {
    tokenUtils.validateStudentCall(req, res);
    var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
      " "
    )[1];
    tokenToFindInDb = tokenToFindInDb.substring(
      0,
      tokenToFindInDb.length - 1
    );
    findEmailByToken(tokenToFindInDb, function(err, contact) {
      student
        .findOneAndUpdate(
          { contact: contact },
          {
            biography: req.body.biography,
            interests: req.body.interests
          }
        )
        .exec();
    });
  }
];
