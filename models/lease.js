var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store whatever they're looking to send back to the requestor.*/

var LeaseSchema = new Schema({
  msrp: String,
  baseCapCost: String,
  baseCapCost: String,
  baseCapCost: String,
  baseCapCost: String,
  baseCapCost: String,
  baseCapCost: String,
});

mongoose.model('Lease', LeaseSchema);
