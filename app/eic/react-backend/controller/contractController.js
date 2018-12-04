var contract = require("../models/Contract");
var { findEmailByToken } = require("../models/GoogleUser");

exports.createContract = [
  (req, res, next) => {
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
      var date = new Date(Date.now());
      new contract({
        title: req.body.title,
        creator: contact,
        creationDate: date.toDateString(),
        relatedSkills: req.body.skills,
        description: req.body.description,
        pay: req.body.pay,
        location: req.body.location
      }).save(function(err) {
        if (err) {
          return next(err);
        }
        return next();
      });
    });
  }
];

exports.getContracts = function(req, res, next) {
  contract.find().exec(function(err, contracts) {
    if (err) {
      return next(err);
    }
    res.json([{ contracts }]);
  });
};

exports.deleteContractById = function(req, res, next) {
  contract.findOneAndDelete({ _id: req.body.id }).then(result => {
  });

  return next();
};
