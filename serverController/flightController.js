var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.searchFlights =function(flightData,cb){
    var FlightModel = mongoose.model('outFlight');

	var query = FlightModel.find(flightData);
	query.where('destination',flightData[0].destination);
	query.where('origin',flightData[0].origin);
	var x = new Date(flightData[0].departureDateTime);
	x.setMinutes(0);
	x.setHours(0);
	var y = new Date(flightData[0].departureDateTime);
	y.setMinutes(59);
	y.setHours(23);
	console.log(y);
	query.where('departureDateTime',{"$gte":x
		, "$lt": y});	

	query.exec(function (err, docs) {


		cb(docs);
	});
	
}

exports.getFlightsForTimeTable=function(cb){
	var OutFlightModel = mongoose.model('outFlight');
	var InFlightModel = mongoose.model('inFlight');
	var x=new Date();
	var y=new Date();
	
	x.setHours(0);
	x.setMinutes(0);
	y.setMinutes(59);
	y.setHours(23);


	
	var outquery = OutFlightModel.find();
	var inquery = InFlightModel.find();

	outquery.where('departureDateTime',{"$gte":x, "$lt": y  });
	inquery.where('departureDateTime',{"$gte":x, "$lt": y  });

	outquery.exec(function (err, outdocs) {
			inquery.exec(function (err, indocs) {

				cb(outdocs,indocs);
			});

		
	});

}