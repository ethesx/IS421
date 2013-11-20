module.exports = function (app) {

var index = require('./controllers/index');
var courses = require('./controllers/courses');
var passport = require('passport');
var users = require('./controllers/users');
var admin = require('./controllers/admin');
//var assignments = require('./controllers/assignments');

var responses = require('./controllers/responses');


  //app.get('/', index.index);
  app.get('/admin',ensureAuthenticated , admin.main); 
  app.get('/courses', courses.list);
  app.get('/api/courses', courses.jsonlist);
  app.get('/courses/:cid', courses.findById);
  app.post('/courses/add', courses.add);
  app.post('/courses/update/:cid', courses.update); 
  
  app.get('/users/', users.list);
  app.get('/api/users', users.jsonlist);
  app.get('/users/:uid', users.findById);
  app.post('/users/add', users.add);
  app.post('/users/update/:uid', users.update);
  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local'), users.auth);
  app.get('/api', function (req,res) {
    var obj = {
      spam: 'test'
    }
    res.send(obj);
  });
  
  app.get('/', responses.index);
  app.get('/responses/', responses.index);
  app.get('/responses/list', responses.list);
  app.post('/responses/add', responses.add);
  
  
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
     res.cookie('lasturl', req.path);
     res.redirect('/login'); 
}
/*
  app.get('/assignments/:cid/', assignments.list);
  app.get('/assignments/:cid/:aid/', assignments.findOne);
  app.post('/assignments/add/', assignments.add);
*/
}
