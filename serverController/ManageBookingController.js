var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchReservations =function(refNum,cb){
     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('bookingSchema');


	var resQuery = reservationModel.find();
	resQuery.where('refNum',refNum);
	



	resQuery.exec(function (err, resDocs) {
		cb(resDocs);
	});
	
}
exports.searchBooking =function(refNum,cb){
	var bookingModel = mongoose.model('bookingSchema');

	var bookingQuery = bookingModel.find();
	bookingQuery.where('refNum',refNum);


	bookingQuery.exec(function(err,bookDocs)
	{

		cb(bookDocs);
	});
	
}