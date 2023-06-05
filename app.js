var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// use mysql
var mysql = require('mysql');

// create a 'pool' (a group) of connections to be used for connecting with our SQL server
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'the_database'
});

var app = express();

// middleware for accessing database,
// need access to the database before routes are processed in index.js

// express will run this function on every request and the continue to the next module
// (which is index.js)

// for all requests handled in index.js, we can access the connection pool with req.pool
app.use(function(req,res,next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
