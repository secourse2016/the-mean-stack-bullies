var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchBookings =function(refNum,cb){
     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('bookingSchema');


	var resQuery = reservationModel.find();
	resQuery.where('destination',flightData[0].destination);
	resQuery.where('origin',flightData[0].origin);

	var bookingQuery = bookingModel.find();
	
	var x = new Date(flightData[0].departureDateTime);
	x.setMinutes(0);
	x.setHours(0);
	var y = new Date(flightData[0].departureDateTime);
	y.setMinutes(59);
	y.setHours(23);
	resQuery.where('departureDateTime',{"$gte":x
		, "$lt": y});	

	resQuery.exec(function (err, docs) {


	cb(docs);
});
	
}