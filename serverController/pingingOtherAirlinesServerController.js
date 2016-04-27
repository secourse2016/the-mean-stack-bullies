var models = require('../models/models.js');
var mongoose = require('mongoose');
exports.getOneTripFlights = function(bookingData,cb){
  var outgoingFlights = mongoose.model('outFlight');
  console.log(bookingData.departingDate);
  var departureDateTime = new Date(Number(bookingData.departingDate));
  console.log(departureDateTime);
   var flightCriteria = {
   			origin:bookingData.origin,
   			destination:bookingData.destination,
   			class:bookingData.class,
   			seats:bookingData.seats
   		};
   		  var x = new Date(departureDateTime);
		  x.setMinutes(0);
		  x.setHours(0); 
		  console.log(x);
		  var y = new Date(departureDateTime);
		  y.setMinutes(59);
		  y.setHours(23);
		  console.log(y);
	var query = outgoingFlights.find(flightCriteria);
	query.where('origin',flightCriteria.origin);
	query.where('destination',flightCriteria.destination);
	query.where('departureDateTime',{"$gte":x, "$lte": y}); 
	query.where('class', flightCriteria.class); 
	query.where('seats',{"$gt":flightCriteria.seats});   
    
    query.exec(function (err, docs) { 
           if(err){
              console.log(err);
            } 
           else{ 
           	var outgoingFlights = [];
           	for(var i=0;i<docs.length;i++){
           		outgoingFlights.push(docs[i]);
           	}
              var oneWayFlights = {
              	outgoingFlights:outgoingFlights
              }
              console.log(docs);
              cb(oneWayFlights);
           } 
});

}