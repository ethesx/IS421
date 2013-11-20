var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store whatever they're looking to send back to the requestor.*/

var ResponseSchema = new Schema({
  cid: String,
  resp_obj: String,
  MSRP: String,
  term: String
});

mongoose.model('Response', ResponseSchema);
