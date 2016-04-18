var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchBookings =function(refNum,cb){


	console.log("book here");
     var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var resQuery = reservationModel.find();
	resQuery.where('bookingRefNumber',refNum);
	

	console.log("book here");
	var ObjectId = mongoose.Types.ObjectId; 

try
{
	var bookingQuery = bookingModel.find();
	bookingQuery.where('_id',new ObjectId(refNum));


	console.log("book here");

	resQuery.exec(function (err, resDocs) {

	console.log("book here");
		console.log(err);
		bookingQuery.exec(function(err2,bookDocs) {
					console.log(err2);
			cb(resDocs,bookDocs,false);
		});
	});
}
catch(err)
{
	cb(null,null,true);
}

exports.cancelReservation =function(refNum,cb){



    var reservationModel = mongoose.model('Reservation');
	var bookingModel = mongoose.model('Booking');
	var paymentModel = mongoose.model('Payment');
	var personModel = mongoose.model('Person');

	var ObjectId = mongoose.Types.ObjectId; 
	console.log("test");
	console.log(refNum);
	bookingModel.find({ '_id':new ObjectId(refNum) }).remove().exec();
		console.log("test");
	reservationModel.find({ 'bookingRefNumber':refNum }).remove().exec();
		console.log("test");
	paymentModel.find({ 'bookingRefNumber':refNum }).remove().exec();
		console.log("test");
	personModel.find({ 'bookingRefNumber':refNum }).remove().exec();
		console.log("test");
	cb('Your reservation has been cancelled');
	
	}
};