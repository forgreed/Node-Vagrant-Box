// ---------- Requires ---------- //
var path = require('path');
var bodyParser = require('body-parser');
var jade = require('jade');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var sass = require('node-sass-middleware');
var express = require('express');

// ---------- Express ---------- //
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname,'public','favicon.gif')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Sass ---------- //
app.use(sass({
  src: __dirname + '/sass', 
  dest: __dirname + '/public/stylesheets', 
  debug: false, 
  outputStyle: 'compressed',
  prefix: '/stylesheets'
}));

// ---------- Session ---------- //
var sess = {
  secret: 'redcowsdontfallaroundfromtwelvegreenlegs',
  resave: false,
  saveUninitialized: true,
  cookie: {}
};
if (app.get('env') === 'production') { // Assume production https
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // Serve Secure Cookies
}
app.use(session(sess));

// ---------- Routes ---------- //
app.use('/', require('./routes/index'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err
  });
});

// ---------- Expose the App ---------- //
module.exports = app;