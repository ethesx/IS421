
/*
 * GET courses.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User');


exports.list = function(req, res) {
  User.find({}, function(err, users) {
    res.render('users', { 
      title: 'Personal Learning Platform', 
      users: users,
      info: req.flash('info')
    });
 });
}
exports.jsonlist = function(req, res) {
  User.find({},'username _id', function(err, users) {
    res.send(users);
    });
}

exports.auth = function (req, res) {
   if(req.cookies.lasturl) {
     res.redirect(req.cookies.lasturl);
     res.clearCookie('lasturl');
   } else {
   req.flash('info', 'Flash is back!'); 
   res.render('user', {
      title: 'Welcome ... whoever you are (insert name)',
      id: 'id',
      username: 'username',
      password: 'password',
      messages: req.flash('info') 
  });
    }
}
exports.login = function (req, res) {
  console.log(req.cookies.lasturl);
  res.render('login', {
    title: "login Page",
    id: 'id',
    username: 'username',
    password: 'password' 
  });
}

exports.findById = function (req, res) {
  User.findOne({_id : req.params.uid}, function(err, user) {
      console.log(user);
      res.render('user', {
      title: "User Page",
      messages: "",
      id: user._id,
      username: user.username,
      password: user.password 
    });
 });
}

exports.add = function (req, res) {

  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.error(err);
      console.log("In error");
      if(!req.body.password){
        console.log("In error, no password");
        
        req.flash('info','Please specify a password');
        exports.list(req, res);
      }
      else{
        req.flash('info',err);
        exports.list(req, res);
      }
    } else{
        console.log("About to render");
        
        res.render('user', {
          title: "User Page",
          messages : "The user has been added.",
          id: user._id,
          username: user.username,
          password: user.password
      });
        
        console.log("Done render");
    }
  });
  
 
}

exports.update = function (req, res) {
  User.findOneAndUpdate({_id : req.params.uid}, req.body, 
  
  function(err, user) {
      console.log(user);
    res.redirect('/users/');
  });
}
