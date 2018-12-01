var test = require("../models/Test");
var buddy = require("../models/Buddy");
var student = require("../models/Student");
var googleUser = require("../models/GoogleUser");
var token_utils = require("../utils/token.utils");
var { findEmailByToken } = require("../models/GoogleUser");
var mongoose = require("mongoose");
var ObjectId = mongoose.ObjectId;
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

//Insert new buddy into database
//Token validation not needed due to registration workflow
exports.create_buddy_account = function(req, res, next) {

  new buddy({
    user_name: req.header("x-user-name"),
    contact: req.user.contact,
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    return next();
  });
};

//Gets all buddies in the db
exports.get_buddy_info = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  buddy.find().exec(function(err, buddy) {
    if (err) {
      return next(err);
    }
    res.json([{ buddy }]);
  });
};

//Gets buddy based on email
exports.get_buddy_email = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  buddy.find({ contact: req.params.id }).exec(function(err, buddy) {
    if (err) {
      return next(err);
    }
    res.json([{ buddy }]);
  });
};

// Gets buddy profile info based off of token
exports.get_buddy_profile = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy
      .findOne({ contact: contact })
      // this is a_user to make front end logic easier
      .exec(function(err, a_user) {
        res.json([{ a_user }]);
      });
  });
};

//Gets buddy based on partial matches
exports.get_buddy_partial = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  console.log(req.params.id);
  buddy
    .find({
      $or: [
        { user_name: { $regex: req.params.id, $options: "i" } },
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

//Adds student to this buddy's pending_student[]
exports.add_pending_student = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    student.findOne({ contact: contact }).exec(function(err, a_student) {
      if (err) return err;
      buddy
        .findOne({ contact: req.params.student_email })
        .exec(function(err, a_buddy) {
          buddy
            .findOneAndUpdate(
              { _id: a_buddy.id },
              { $push: { pending_student: a_student._id } }
            )
            .exec();
        });
    });
    res.send();
  });
};

// Adds student to this buddy's student[] from pending_student[]
// Also adds buddy to student's buddy[]
exports.accept_pending_student = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy.findOne({ contact: contact }).exec(function(err, a_buddy) {
      if (err) return err;
      //student.find({"_id": {$in: a_buddy.pending_student}})
      //.exec(function(err, a_student){
      //				if(err) return err;
      //**this next call shouldn't be necessary**
      //student.findOneAndUpdate(
      //		{ _id: a_student._id },
      //		{ $pull: {pending_buddy: a_buddy._id}
      //}).exec();
      student
        .findOneAndUpdate(
          { contact: req.params.student_email },
          { $push: { buddy: a_buddy._id } }
        )
        .exec(function(err, a_student) {
          buddy
            .findOneAndUpdate(
              { _id: a_buddy._id },
              { $push: { student: a_student._id } }
            )
            .exec();
          buddy
            .findOneAndUpdate(
              { _id: a_buddy._id },
              { $pull: { pending_student: a_student._id } }
            )
            .exec();
          res.send();
        });
    });
  });
  //	}
};

//Delete student from this buddy's pending_student[] and this buddy from the the specified student's pending_buddy[]
exports.reject_pending_student = function(req, res, next) {
  token_utils.validate_buddy_call(res, req);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy.findOne({ contact: contact }).exec(function(err, a_buddy) {
      if (err) return err;
      student
        .findOne({ contact: req.params.student_email })
        .exec(function(err, a_student) {
          if (err) return err;
          //**this next call shouldn't be necessary**
          //student.findOneAndUpdate(
          //	{ _id: a_student._id },
          //	{ $pull: {pending_buddy: a_buddy._id}
          //}).exec();
          buddy
            .findOneAndUpdate(
              { _id: a_buddy._id },
              { $pull: { pending_student: a_student._id } }
            )
            .exec();
        });
    });
    res.send();
  });
  //	}
};

//Delete student/buddy connection
exports.reject_student = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy.findOne({ contact: contact }).exec(function(err, a_buddy) {
      if (err) return err;
      student
        .findOne({ contact: req.params.student_email })
        .exec(function(err, a_student) {
          if (err) return err;
          student
            .findOneAndUpdate(
              { _id: a_student._id },
              { $pull: { buddy: a_buddy._id } }
            )
            .exec();
          buddy
            .findOneAndUpdate(
              { _id: a_buddy._id },
              { $pull: { student: a_student._id } }
            )
            .exec();
        });
    });
    res.send();
  });
  //}
};

//View this buddy's pending students
exports.get_pending_student = function(req, res, next) {
  token_utils.validate_student_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy.findOne({ contact: contact }).exec(function(err, a_buddy) {
      if (err) return err;
      student
        .find({ _id: { $in: a_buddy.pending_student } })
        .exec(function(err, a_student) {
          if (err) return err;
          res.json([{ a_student }]);
        });
    });
  });
  //	}
};

//View this buddy's accepted students
exports.get_student = function(req, res, next) {
  token_utils.validate_buddy_call(req, res);

  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    if (err) {
      return next(err);
    }
    buddy.findOne({ contact: contact }).exec(function(err, a_buddy) {
      if (err) return err;
      student
        .find({ _id: { $in: a_buddy.student } })
        .exec(function(err, a_student) {
          if (err) return err;
          res.json([{ a_student }]);
        });
    });
  });
};

exports.edit_buddy_profile = [
  (req, res, next) => {
      token_utils.validate_buddy_call(req, res);
      var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
        " "
      )[1];
      token_to_find_in_db = token_to_find_in_db.substring(
        0,
        token_to_find_in_db.length - 1
      );
      findEmailByToken(token_to_find_in_db, function(err, contact) {
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
