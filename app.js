var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/api/users/index');
var api = require('./routes/api/index');
var app = express();
var  authRoutes = require('./routes/api/auth/index');
const session    = require('express-session');
const passport   = require('passport');

function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
}
// const cors = require('cors');
//
// var whitelist = [
//     'http://localhost:4200',
//     'http://localhost:3000',
// ];
// var corsOptions = {
//     origin: function(origin, callback){
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//         callback(null, originIsWhitelisted);
//     },
//     credentials: true
// };
// app.use(cors(corsOptions));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const passportSetup = require('./config/passport');
passportSetup(passport);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get('/login', (req, res, next) => {
  console.log('login');
  res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.use('/api/auth', authRoutes);

app.get('/', isAuthenticated, (req, res, next) => {
  res.redirect('/profile');
});

app.get('/profile', isAuthenticated, (req, res, next) => {
  console.log(req.user);
  res.sendFile(path.join(__dirname +'/public/app.html'));
});

app.use('/api', api);
app.use('/users',isAuthenticated, users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
