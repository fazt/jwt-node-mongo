const express = require('express');
const apiRoutes = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./app/models/user');

//x-www-form-urlencoded
apiRoutes.post('/authenticate', (req, res) => {7
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if(err) throw err;

    if (!user) {
      res.json({success: true, message:'authentication failed. User not found'});
    }

    else if (user){
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'authentication failed. Wrong password'});
      } else {
        const token = jwt.sign({user}, req.app.get('superSecret'));

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
});

apiRoutes.use((req, res, next) => {
  // x-access-token: token , /api?token=token, form body
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No  token provided'
    });
  }
});

// more routes
apiRoutes.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my API'
  });
});

apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

module.exports = apiRoutes;
