
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Db = require('../db.js');

Db.init(function(){
console.log("here");
});

// Db.seed();

var flightSchema = schema({
            flightNumber      : String,
            aircraftType      : String,
            aircraftModel     : String,
            departureDateTime : Date,
            arrivalDateTime   :Date
            origin 		      : String,
            destination      : String,
            cost              : Number,
            currency          : String,
            class             : String,
            Airline           : String
});


var airportSchema = schema({
	iata:String,
	lon: Number,
	iso: String,
	status: Number,
	name: String,
	continent: String,
	type: String,
	lat: Number,
	size: String

});
mongoose.model('Airport', airportSchema);
mongoose.model('Flights', flightSchema);

Db.seed(mongoose.model('Airport'),require('../airports.json'));
Db.seed(mongoose.model('Flights'),require('../flights.json'));

