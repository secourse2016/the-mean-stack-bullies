var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchBookings =function(refNum,cb){


     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var resQuery = reservationModel.find();

	var bookingQuery = bookingModel.find();

	resQuery.exec(function (err, resDocs) {
		bookingQuery.exec(function(err2,bookDocs) {
			cb(resDocs,bookDocs);
		});
	});
}