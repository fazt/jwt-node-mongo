const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // x-access-token: token , /api?token=token, form body
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, req.app.get("superSecret"), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No  token provided",
    });
  }
};
