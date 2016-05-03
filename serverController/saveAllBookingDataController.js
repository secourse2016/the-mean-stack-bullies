var models = require('../models/models.js');
var mongoose = require('mongoose');
var count = 0;
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

exports.decreaseSeatsByNumber = function(number,flightIDOutging,flightIDInGoing,cb){
  
  var inFlightModel = mongoose.model('inFlight');
  var outFlightModel = mongoose.model('outFlight');
     // console.log("here4"+newbooking);



   if (flightIDOutging != null)
   {
    outFlightModel.findOne({ _id:  flightIDOutging }, function (err, doc1){
      if (!err)
      {
        console.log("doc1----------------------------->"+doc1);
      doc1.seats=doc1.seats-number;
      doc1.save();

    if (flightIDInGoing != null)
      {
        inFlightModel.findOne({ _id:  flightIDInGoing }, function (err, doc2){
          if (!err)
          {
            console.log("dov2-------------------"+doc2);
             doc2.seats=doc2.seats-number;
             doc2.save();
             cb(null,doc2);
          }else{
            cb(err,null);
          }
        });
      }
      else{
        cb(null,doc1);
      }
       
      }else{
        cb(err,null);
      }
    });
  }
  else{
       if (flightIDInGoing != null)
      {
        inFlightModel.findOne({ _id:  flightIDInGoing }, function (err, doc2){
          if (!err)
          {
            console.log("dov2-------------------"+doc2);
             doc2.seats=doc2.seats-number;
             doc2.save();
             cb(null,doc2);
          }else{
            cb(err,null);
          }
        });
      }
      else{
       cb("NO flight choosen",null);
      }
    
  }
};


var insertPersonalInformation = exports.insertPersonalInformation = function(personalInformation,booking_id,count,cb){
    if(count >= personalInformation.length ){
      console.log("true cond satisfied");
      cb(null,true);
    }else{
      personalInformation[count].bookingRefNumber = booking_id;
      var PersonModel = mongoose.model('Person');
      var newPerson = new PersonModel(personalInformation[count]);
      newPerson.save(function (err,person){
           if (err) {
             console.log("error when saving"+err);
             cb(err,false);
           }else{
            console.log("count is :"+count);
            insertPersonalInformation(personalInformation,booking_id,count+1,cb);
           }
            
          });
    }
  //for(i=0;i<personalInformation.length;i++){
      
  //}
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


exports.fligtInformationsByID = function(outgoingFlightId,returnFlightId,cb){
  var ObjectId = mongoose.Types.ObjectId; 
  if(outgoingFlightId){
    var outgoingFlights = mongoose.model('outFlight');

   outgoingFlights.findOne( {'_id' : new ObjectId(outgoingFlightId) }, function(err, outgoingFlight){
   
      if(err) cb(err,null,null);

   if(returnFlightId){
     var returnFLights = mongoose.model('inFlight');

   returnFLights.findOne( {'_id' : new ObjectId(returnFlightId) }, function(err, returnFLight){
   if(err) cb(err,outgoingFlight,null);

    cb(null,outgoingFlight,returnFLight);
   });
   }else{
    cb(null,outgoingFlight,null);
   }
});

}
}