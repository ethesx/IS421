
/*
 * GET courses.
 */

var mongoose = require('mongoose')
  , Course = mongoose.model('Course');


exports.list = function(req, res) {
  Course.find({}, function(err, courses) {
    res.render('courses', { 
      title: 'Personal Learning Platform', 
      courses: courses 
    });
 });
}
exports.jsonlist = function(req, res) {
  Course.find({}, function(err, courses) {
    res.send(courses);  
  });
}
exports.findById = function (req, res) {
  Course.findOne({_id : req.params.cid}, function(err, course) {
      console.log(course);
      res.render('course', {
      title: 'Course information',
      coursetitle: course.title,
      cid: course.cid,
      id: course._id, 
      section: course.section
    });
 });
}

exports.add = function (req, res) {
  var course = new Course(req.body);
  
  course.save(function (err) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/courses/'+course._id);
      console.log(course);
    }

  });
}
exports.update = function (req, res) {
  Course.findOneAndUpdate({_id : req.params.cid}, req.body,

  function(err, course) {
      console.log(course);
    res.redirect('/courses/');
  });
}

