var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchBookings =function(refNum,cb){


     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var resQuery = reservationModel.find();
	resQuery.where('refNum',refNum);
	

	var bookingQuery = bookingModel.find();
	bookingQuery.where('refNum',refNum);

	resQuery.exec(function (err, resDocs) {
		bookingQuery.exec(function(err2,bookDocs) {
			cb(resDocs,bookDocs);
		});
	});

	exports.cancelReservation =function(refNum){


     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var resQuery = reservationModel.find();
	resQuery.where('refNum',refNum);
	

	var bookingQuery = bookingModel.find();
	bookingQuery.where('refNum',refNum);

	resQuery.exec(function (err, resDocs) {
		bookingQuery.exec(function(err2,bookDocs) {
			cb(resDocs,bookDocs);
		});
	});
}