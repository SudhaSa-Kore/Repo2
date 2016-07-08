var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


app.get('/getPremiumDate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({"policies":[{"policyNumber":"9348209","policyStartDate":"27/5/2016","policyType":"yearly","policyName":"Jeevan Anandh","premiumAmount":"31,000","policyEndDate":"27/5/2019","premiumPaymentDate":"27/5/2017"},{"policyNumber":"1987650","policyStartDate":"12/2/2013","policyType":"half-yearly","policyName":"Jeevan Tarang","premiumAmount":"20,000","policyEndDate":"27/5/2018","premiumPaymentDate":"12/8/2016"},{"policyNumber":"1987650","policyStartDate":"2/7/2007","policyType":"monthly","policyName":"Abhinay","premiumAmount":"20,000","policyEndDate":"2/7/2020","premiumPaymentDate":"2/6/2016"}]}));
});


app.get('/payPremiumamount',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({"policyNumber":"9348209","message":"Successfully paid the premium amount","nextPremiumDate":"27/5/2018"}));
});

app.get('/getTaxCertificate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({"policyNumber":"9348209","policyName":"Jeevan Anandh","url":"http://www.revenue.ie/images/guide-paye-employees-booklet.jpg"}));
});

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
