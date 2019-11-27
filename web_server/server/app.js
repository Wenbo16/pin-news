var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var passport = require('passport');
var path = require('path');

var auth = require('./routes/auth');
var index = require('./routes/index');
var news = require('./routes/news');

var app = express();

var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../client/build/'));

app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));
app.use(bodyParser.json());

// load passport strategies
app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);



// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// TODO: remove this after development is done.
app.use(cors());

app.use('/', index);
app.use('/auth', auth);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('404 Not Found');
});

module.exports = app;
