var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchBookings =function(refNum,cb){


     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var resQuery = reservationModel.find();
	resQuery.where('bookingRefNumber',refNum);
	

	var bookingQuery = bookingModel.find();
	bookingQuery.where('_id',refNum);

	resQuery.exec(function (err, resDocs) {
		bookingQuery.exec(function(err2,bookDocs) {
			cb(resDocs,bookDocs);
		});
	});

exports.cancelReservation =function(refNum,cb){


    var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var paymentModel = mongoose.model('Payment');
	var personModel = mongoose.model('Person');
	bookingModel.find({ _id:refNum }).remove().exec();
	reservationModel.find({ bookingRefNumber:refNum }).remove().exec();
	paymentModel.find({ bookingRefNumber:refNum }).remove().exec();
	personModel.find({ bookingRefNumber:refNum }).remove().exec();
	cb();
	
	}
};