var jwt = require('jsonwebtoken');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var validate_student_call = function(req) {
  return true;
};

var validate_buddy_call = function(req) {
  return true;
};

var validate_company_call = function (req) {
  return true;
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send(JSON.stringify(req.user));
  }
};

