// Libraries
require('events').EventEmitter.prototype._maxListeners = 200;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport"); 
const session = require("express-session");
const flash = require("express-flash");

// Routers 
const generalRouter = require("./routes/general");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
require("dotenv").config();


// TO DO: 
// Pagina cu reguli pentru avansare in grad 
// Ideea principala - daca esti user nu poti vedea cine posteaza povestile 
  
const app = express();

// Database 
const mongodb = process.env.MONGODB_CONNECTION;
main().catch(err => console.log(err)); 
async function main() { 
  await mongoose.connect(mongodb);
}

const User = require("./models/User");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
  {
    secret: process.env.SECRET_KEY,  
    resave: false, 
    saveUninitialized: true,
  }
));
app.use(passport.initialize())
app.use(passport.session()); 
app.use(flash()); 

app.use('/', indexRouter);
app.use('/users', usersRouter)
app.use("/general", generalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
