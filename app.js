
/**
 * Module dependencies.
 */

var express = require('express'),
    uid = require('./uid');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'CodeCollab'
  });
});

app.get('/new', function(req, res){
  res.redirect('/code/' + uid.gen());
});

app.get('/join', function(req, res){
  res.redirect('/code/' + req.param('id', ''));
});

app.get('/code/:id', function(req, res){
  res.render('code', {
   title: 'CodeCollab'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
