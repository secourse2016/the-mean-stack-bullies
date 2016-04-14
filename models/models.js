
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Db = require('../db.js');

Db.init(function(){
console.log("here");
});

// Db.seed();

var outgoingflightSchema = schema({
            flightNumber      : String,
            aircraftType      : String,
            aircraftModel     : String,
            departureDateTime : Date,
            arrivalDateTime   : Date,
            origin            : String,
            destination       : String,
            cost              : Number,
            currency          : String,
            class             : String,
            Airline           : String
});


var ingoingflightSchema = schema({
            flightNumber      : String,
            aircraftType      : String,
            aircraftModel     : String,
            departureDateTime : Date,
            arrivalDateTime   : Date,
            origin            : String,
            destination       : String,
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
mongoose.model('outFlight', outgoingflightSchema);
mongoose.model('Reservation', reservationSchema);
mongoose.model('Booking', bookingSchema);
mongoose.model('Payment', paymentSchema);
mongoose.model('inFlight', ingoingflightSchema);


exports.seedingFunction=function(cb){
    // Db.seed(mongoose.model('Airport'),require('../airports.json'),function(){
    //     Db.seed(mongoose.model('outFlight'),require('../outflights.json'),function(){
    //         Db.seed(mongoose.model('inFlight'),require('../returnflights.json'),function(){
    //             Db.seed(mongoose.model('Reservation'),require('../reservations.json'),function(){
    //                 Db.seed(mongoose.model('Booking'),require('../bookings.json'),function(){
    //                     Db.seed(mongoose.model('Payment'),require('../payments.json'),function(){
    //                           cb();
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
    Db.seed(mongoose.model('Airport'),require('../airports.json'));
    Db.seed(mongoose.model('outFlight'),require('../outflights.json'));
    Db.seed(mongoose.model('inFlight'),require('../returnflights.json'));
    Db.seed(mongoose.model('Reservation'),require('../reservations.json'));
    Db.seed(mongoose.model('Booking'),require('../bookings.json'));
    Db.seed(mongoose.model('Payment'),require('../payments.json'));
    cb();
};

