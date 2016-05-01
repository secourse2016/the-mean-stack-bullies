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

exports.getRoundTripFlights = function(bookingData, cb){ 
  var outgoingFlights = mongoose.model('outFlight');
  var departureDateTime = new Date(Number(bookingData.departingDate));
  

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
   
        var incomingFlights = mongoose.model('inFlight');   
  		var arrivalDateTime = new Date(Number(bookingData.returningDate));  
                
  			var flightCriteria2 = { 
            origin:bookingData.destination,
   			destination:bookingData.origin,
   			class:bookingData.class,
   			seats:bookingData.seats
             };  

           var x2 = new Date(arrivalDateTime);
		  x2.setMinutes(0);
		  x2.setHours(0); 
		  var y2 = new Date(arrivalDateTime);
		  y2.setMinutes(59);
		  y2.setHours(23); 
          
          var query2 = incomingFlights.find(flightCriteria2);
	query2.where('origin',flightCriteria2.origin);
	query2.where('destination',flightCriteria2.destination);
	query2.where('departureDateTime',{"$gte":x2, "$lte": y2}); 
	query2.where('class', flightCriteria2.class); 
	query2.where('seats',{"$gt":flightCriteria2.seats});   
           
           query2.exec(function (err, docs2) { 
           if(err){
              console.log(err);
            }  
            else { 
            var outgoingFlights = [];
           	for(var i=0;i<docs.length;i++){
           		outgoingFlights.push(docs[i]);
           	} 
              var incomingFlights = [];
           	for(var k=0;k<docs.length;k++){
           		incomingFlights.push(docs2[k]);
           	}
              var twoWayFlights = {
              	outgoingFlights:outgoingFlights,
              	returnFlights:incomingFlights
              }
              console.log(docs);
              cb(twoWayFlights);
           } 


            });
  			
		 



           	}

     });




}