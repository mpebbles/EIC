var buddy = require("../models/Buddy");
var student = require("../models/Student");
var tokenUtils = require("../utils/token.utils");
var { findEmailByToken } = require("../models/GoogleUser");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

//Insert new buddy into database
//Token validation not needed due to registration workflow
exports.createBuddy_account = function(req, res, next) {
  new buddy({
    userName: req.header("x-user-name"),
    contact: req.user.contact
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    return next();
  });
};

//Gets all buddies in the db
exports.getBuddyInfo = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

  buddy.find().exec(function(err, buddy) {
    if (err) {
      return next(err);
    }
    res.json([{ buddy }]);
  });
};

//Gets buddy based on email
exports.getBuddyEmail = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

  buddy.find({ contact: req.params.id }).exec(function(err, buddy) {
    if (err) {
      return next(err);
    }
    res.json([{ buddy }]);
  });
};

// Gets buddy profile info based off of token
exports.getBuddyProfile = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
    buddy
      .findOne({ contact: contact })
      // this is aUser to make front end logic easier
      .exec(function(err, aUser) {
        res.json([{ aUser }]);
      });
  });
};

//Gets buddy based on partial matches
exports.getBuddyPartial = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

  console.log(req.params.id);
  buddy
    .find({
      $or: [
        { userName: { $regex: req.params.id, $options: "i" } },
        { skills: { $regex: req.params.id, $options: "i" } }
      ]
    })
    .limit(10)
    .exec(function(err, buddy) {
      if (err) {
        return next(err);
      }
      res.json([{ buddy }]);
    });
};

//Adds student to this buddy's pendingStudent[]
exports.addPendingStudent = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
        .findOne({ contact: req.params.studentEmail })
        .exec(function(err, aBuddy) {
          buddy
            .findOneAndUpdate(
              { _id: aBuddy.id },
              { $push: { pendingStudent: aStudent._id } }
            )
            .exec();
        });
    });
    res.send();
  });
};

// Adds student to this buddy's student[] from pendingStudent[]
// Also adds buddy to student's buddy[]
exports.acceptPendingStudent = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
    buddy.findOne({ contact: contact }).exec(function(err, aBuddy) {
      if (err) return err;
      //student.find({"_id": {$in: aBuddy.pendingStudent}})
      //.exec(function(err, aStudent){
      //				if(err) return err;
      //**this next call shouldn't be necessary**
      //student.findOneAndUpdate(
      //		{ _id: aStudent._id },
      //		{ $pull: {pendingBuddy: aBuddy._id}
      //}).exec();
      student
        .findOneAndUpdate(
          { contact: req.params.studentEmail },
          { $push: { buddy: aBuddy._id } }
        )
        .exec(function(err, aStudent) {
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $push: { student: aStudent._id } }
            )
            .exec();
          buddy
            .findOneAndUpdate(
              { _id: aBuddy._id },
              { $pull: { pendingStudent: aStudent._id } }
            )
            .exec();
          res.send();
        });
    });
  });
  //	}
};

//Delete student from this buddy's pendingStudent[] and this buddy from the the specified student's pendingBuddy[]
exports.rejectPendingStudent = function(req, res, next) {
  //tokenUtils.validateBuddyCall(res, req);

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
    buddy.findOne({ contact: contact }).exec(function(err, aBuddy) {
      if (err) return err;
      student
        .findOne({ contact: req.params.studentEmail })
        .exec(function(err, aStudent) {
          if (err) return err;
          //**this next call shouldn't be necessary**
          //student.findOneAndUpdate(
          //	{ _id: aStudent._id },
          //	{ $pull: {pendingBuddy: aBuddy._id}
          //}).exec();
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
  //	}
};

//Delete student/buddy connection
exports.rejectStudent = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
    buddy.findOne({ contact: contact }).exec(function(err, aBuddy) {
      if (err) return err;
      student
        .findOne({ contact: req.params.studentEmail })
        .exec(function(err, aStudent) {
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
  //}
};

//View this buddy's pending students
exports.getPendingStudent = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
    buddy.findOne({ contact: contact }).exec(function(err, aBuddy) {
      if (err) return err;
      student
        .find({ _id: { $in: aBuddy.pendingStudent } })
        .exec(function(err, aStudent) {
          if (err) return err;
          res.json([{ aStudent }]);
        });
    });
  });
  //	}
};

//View this buddy's accepted students
exports.getStudent = function(req, res, next) {
  tokenUtils.validateBuddyCall(req, res);

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
    buddy.findOne({ contact: contact }).exec(function(err, aBuddy) {
      if (err) return err;
      student
        .find({ _id: { $in: aBuddy.student } })
        .exec(function(err, aStudent) {
          if (err) return err;
          res.json([{ aStudent }]);
        });
    });
  });
};

exports.editBuddyProfile = [
  (req, res, next) => {
    tokenUtils.validateBuddyCall(req, res);
    var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
      " "
    )[1];
    tokenToFindInDb = tokenToFindInDb.substring(
      0,
      tokenToFindInDb.length - 1
    );
    findEmailByToken(tokenToFindInDb, function(err, contact) {
      buddy
        .findOneAndUpdate(
          { contact: contact },
          {
            biography: req.body.biography,
            skills: req.body.skills,
            company: req.body.company
          }
        )
        .exec(function(err, buddy) {
          res.json({ buddy });
        });
    });
  }
];
