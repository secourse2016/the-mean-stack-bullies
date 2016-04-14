
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
            arrivalDateTime   : Date,
            origin 		      : String,
            destination       : String,
            cost              : Number,
            currency          : String,
            class             : String,
            Airline           : String
});
var bookingSchema = schema({
    from: String,
    To: String,
    DepartureDate: Date,
    ReturnDate: Date,
    NumberOfAdults: Number,
    NumberOfChildren: Number,
    Class:String,
    Email:String

});

var reservationSchema = schema({
    firstName: String,
    lastName: String,
    passport: String,
    issueDate: Date,
    expiryDate: Date,
    receipt_number: String,
    bookingRefNumber:String

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


var paymentSchema = schema({
      visa:Boolean,
      MasterCard: Boolean,
      CardHolderName: String,
      CardHolderNo: Number,
      Cvv: Number,
      ExpiryDate: Date

});


mongoose.model('Airport', airportSchema);
mongoose.model('Flight', flightSchema);
mongoose.model('Reservation', reservationSchema);
mongoose.model('Booking', bookingSchema);
mongoose.model('Payment', paymentSchema);


exports.seedingFunction=function(cb){
    Db.seed(mongoose.model('Airport'),require('../airports.json'));
    Db.seed(mongoose.model('Flight'),require('../flights.json'));
    Db.seed(mongoose.model('Reservation'),require('../reservations.json'));
    Db.seed(mongoose.model('Booking'),require('../bookings.json'));
    Db.seed(mongoose.model('Payment'),require('../payments.json'));
    cb();
};


