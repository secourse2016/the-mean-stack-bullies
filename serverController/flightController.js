var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchFlights =function(flightData,cb){

    var FlightModel = mongoose.model('outFlight');

console.log("I am in the search");

    cb(FlightModel.Find(flightData[0]));

	
}