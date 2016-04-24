var models = require('../models/models.js');
var mongoose = require('mongoose');

exports.insertBookingData = function (booking, cb){     
 var BookingModel = mongoose.model('Booking');
  var newbooking = new BookingModel(booking); 
     // console.log("here4"+newbooking);
  newbooking.save(function(err, booking){ 
      if(err){ 
         cb(err,null);
      } 
      else{ 
         //console.log("here3"+booking);
         cb(null,booking); 
       }
   });

};

exports.insertReservationData = function(inFlightID,outFlightID,booking_id,cb){
   var reserve = {
        inFlight_id:inFlightID,
        outFlight_id:outFlightID,
        bookingRefNumber:booking_id
   };

  var reservationModel = mongoose.model('Reservation');
  var newReservation = new reservationModel(reserve); 
     // console.log("here4"+newbooking);
  newReservation.save(function(err, reserve){ 
      if(err){ 
         cb(err,null);
      } 
      else{ 
         //console.log("here3"+booking);
         cb(null,reserve); 
       }
   });
};

exports.decreaseSeatsByOne = function(flightIDOutging,flightIDInGoing,cb){
  
  var inFlightModel = mongoose.model('inFlight');
  var outFlightModel = mongoose.model('outFlight');
     // console.log("here4"+newbooking);



   if (flightIDOutging != null)
   {
    outFlightModel.findOne({ _id:  flightIDOutging }, function (err, doc1){
      if (!err)
      {
        console.log("doc1----------------------------->"+doc1);
      doc1.seats=doc1.seats-1;
      doc1.save();

    if (flightIDInGoing != null)
      {
        inFlightModel.findOne({ _id:  flightIDInGoing }, function (err, doc2){
          if (!err)
          {
            console.log("dov2-------------------"+doc2);
             doc2.seats=doc2.seats-1;
          doc2.save();
           cb(null,doc2);
          }else{
            cb(err,null);
          }
        });
      }else{
        cb(null,doc1);
      }
       
      }else{
        cb(err,null);
      }
    });
  }else{
    cb("NO flight choosen",null);
  }
};


exports.insertPersonalInformation = function(personalInformation,booking_id,cb){
    personalInformation.bookingRefNumber = booking_id;
   var PersonModel = mongoose.model('Person');
	var newPerson = new PersonModel(personalInformation);
	newPerson.save(function (err,person) {
       if (err) {
       	 console.error(err);
       	 cb(err,null);
       }else{
       	console.log(person);
         cb(null,person);
       }
        
      });
};


exports.insertPaymentInformation = function(paymentInformation,booking_id,cb){
	paymentInformation.bookingRefNumber = booking_id;
	var PaymentModel = mongoose.model('Payment');
	var newpayment = new PaymentModel(paymentInformation);
     console.log("new payment"+newpayment);
	newpayment.save(function (err,payment) {
    console.log("in the save function");
       if (err) {
       	 console.error(err);
       	 cb(err,null);
       }
         cb(null,payment);
      });
};