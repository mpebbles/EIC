var resource = require("../models/Resource");
var { findEmailByToken } = require("../models/GoogleUser");

exports.createResource = [
  (req, res, next) => {
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
        var date1 = new Date(Date.now());
        var newResource = new resource({
          title: req.body.title,
          creator: contact,
          creation_date: date.toDateString(),
          related_skills: req.body.skills,
          content: req.body.content
        });
        newResource.save(function(err) {
          if (err) {
            return next(err);
          }
        });
      });
  }
];

exports.getResources = function(req, res, next) {
    resource
      .find()
      .limit(10)
      .exec(function(err, resources) {
        if (err) {
          return next(err);
        }
        res.json([{ resources }]);
      });
};

exports.getResourceByCreator = function(req, res, next) {
    resource
      .find({ creator: req.params.creator })
      .exec(function(err, resources) {
        if (err) {
          return next(err);
        }
        res.json([{ resources }]);
      });
};

exports.getResourceByTitle = function(req, res, next) {
    resource.find({ title: req.params.title }).exec(function(err, resources) {
      if (err) {
        return next(err);
      }
      res.json([{ resources }]);
    });
};

exports.deleteResourceByTitle = function(req, res, next) {
    resource
      .findOne({ title: req.params.title })
      .exec(function(err, aResource) {
        if (err) {
          return next(err);
        }
        aResource.drop(function(err) {
          if (err) {
            return next(err);
          }
        });
      });
};
