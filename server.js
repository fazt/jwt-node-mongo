const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/user');

const apiRoutes = require('./api');

// settings
const port = process.env.PORT || 3000;
mongoose.connect(config.database, {
  useMongoClient: true
}); // db connection
mongoose.Promise = global.Promise;

app.set('superSecret', config.secret); // secret variable

//to obtain data from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.send('Hello! The Api is at http://localhost:' + port + '/api');
});

app.get('/setup', (req, res) => {
  const testUser = new User({
    name: 'Fazt',
    password: 'password',
    admin: true
  });

  testUser.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  })
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log('server on port ', port);
});
