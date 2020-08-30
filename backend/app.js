const express = require('express');
const app = express();

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const movieApiRouter = require('./routes/api/movie');
const policyApiRouter = require('./routes/api/policy');
const usersApiRouter = require('./routes/api/user');
const reviewApiRouter = require('./routes/api/review');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const corsOption = {
  origin: "*",
  optionSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersApiRouter);
app.use('/api/movie', movieApiRouter);
app.use('/api/policy', policyApiRouter);
app.use('/api/review', reviewApiRouter);

app.get('/api/users', (cors(corsOption), async(req, res, next) => { }));
app.get('/api/movie', (cors(corsOption), async(req, res, next) => { }));
app.get('/api/policy', (cors(corsOption), async(req, res, next) => { }));
app.get('/api/review', (cors(corsOption), async(req, res, next) => { }));

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
