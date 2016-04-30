var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var jwt     = require('jsonwebtoken');
var api = require('./routes/api');
require('dotenv').config();
//var authenticate = require('./routes/authenticate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

 

app.use(express.static(path.join(__dirname, 'www')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'key12',cookie:{maxAge:60000*30}}));
// routes


app.get('/getToken',function(req,res){
//   console.log("here in token route");
// var newJwt = jwt.create(process.env.JWTSECRET);
// console.log(   newJwt);
// var token = newJwt.compact();
// console.log(token);
var token = jwt.sign({}, process.env.JWTSECRET);
console.log(token);
res.send(token);
});



app.use('/api',function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.wt || req.query.wt || req.headers['x-access-token'];   
        var jwtSecret =  process.env.JWTSECRET;
        // Get JWT contents:
        try 
        {
          var payload = jwt.verify(token, jwtSecret);
         // console.log("payload -->"+payload);
          req.payload = payload;

          next();


        } 
        catch (err) 
        {
          console.error('[ERROR]: JWT Error reason:', err);
          res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
        }
    

});
    

  
app.use('/', api);

//app.use('/authenticate', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
