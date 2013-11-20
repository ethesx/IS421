
/*
 * We're going to Create, Replace, Update, Delete our responses (quotes and the like... generic name) here.
 */



var mongoose = require('mongoose')
  , Response = mongoose.model('Response');

exports.index = function(req, res){
  
  res.render('responses', { 
      title : "Responses test Page"
    });
}

exports.list = function(req, res) {
  Response.find({}, function(err, responses) {
    console.log(responses);
    res.render('response', { 
      responses : responses,
      title : ''
    });
    //sendMe(res, responses); 
 });
}
exports.jsonlist = function(req, res) {
  Response.find({}, function(err, responses) {
    sendMe(res, responses); 
  });
}
exports.findById = function (req, res) {
  Response.findOne({_id : req.params.cid}, function(err, responses) {
    sendMe(res, responses); 
 });
}

exports.add = function (req, res) {
  var response = new Response(req.body);
  console.log("############" + response);
  response.save(function (err) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/responses/');
      console.log(response);
    }

  });
}
exports.update = function (req, res) {
  Response.findOneAndUpdate({_id : req.params.cid}, req.body,

    function(err, responses) {
        console.log(responses);
      res.redirect('/responses/');
    });
}

function sendMe(res, data){
  
  console.log(data);
  res.send(data);
}
  