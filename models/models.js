
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Db = require('../db.js');


Db.init(function(){
console.log("here");
});

var outgoingflightSchema = schema({
            flightNumber      : String,
            aircraftType      : String,
            aircraftModel     : String,
            departureDateTime : Date,
            arrivalDateTime   : Date,
            origin            : String,
            destination       : String,
            cost              : Number, 
            seats             : Number, 
            currency          : String,
            class             : String,
            Airline           : String
});


var ingoingflightSchema = schema({
            flightNumber      : String,
            aircraftType      : String,
            aircraftModel     : String,
            departureDateTime : Date,
            arrivalDateTime   : Date, 
            seats             : Number,
            origin            : String,
            destination       : String,
            cost              : Number,
            currency          : String,
            class             : String,
            Airline           : String
});
var bookingSchema = schema({
    from: String,
    To: String,
    DepartureDate: Date,
    ReturnDate: Date,
    NumberOfAdults: Number,
    NumberOfChildren: Number,
    Class:String,
    Email:String

});

var reservationSchema = schema({
    firstName: String,
    lastName: String,
    passport: String,
    issueDate: Date,
    expiryDate: Date,
    receipt_number: String,
    bookingRefNumber:String

});


var airportSchema = schema({
    iata:String,
    lon: Number,
    iso: String,
    status: Number,
    name: String,
    continent: String,
    type: String,
    lat: Number,
    size: String

});


var paymentSchema = schema({
      visa:Boolean,
      MasterCard: Boolean,
      CardHolderName: String,
      CardHolderNo: Number,
      Cvv: Number,
      ExpiryDate: Date

});



mongoose.model('Airport', airportSchema);
mongoose.model('outFlight', outgoingflightSchema);
mongoose.model('Reservation', reservationSchema);
mongoose.model('Booking', bookingSchema);
mongoose.model('Payment', paymentSchema);
mongoose.model('inFlight', ingoingflightSchema);




function seedOutFlights(entity){
  var newOutFlights = [];
  for(var j=0 ; j<48;j++)
  {
  

 var outflights = require(entity);

 

       for(var i=0 ; i<outflights.length ;i++){
    // Day flights
       var d =new Date();
     d.setDate(d.getDate() + j);    

    var x = new Date();
     x.setDate(x.getDate() + j);
    newOutFlights[i + (j * outflights.length)]= JSON.parse(JSON.stringify(outflights[i]));
      
      
    var hours= 0;
    if(i<20){
         hours = Math.random() * 12;
     
    }else{
        hours = (Math.random() * 12) + 12;
    }  
       d.setHours(hours); 

        newOutFlights[i + (j * outflights.length)].departureDateTime= d;
        x.setHours(hours + (Math.random()* 8) + 2); 

     newOutFlights[i + (j * outflights.length)].arrivalDateTime= x ;
    }
  }
  return newOutFlights;
 // console.log(newOutFlights[0]);
 // console.log(newOutFlights[30]);
 // console.log(newOutFlights[1879]);
 // console.log(newOutFlights[1880]);
}




seedingFunction=function(cb){
Db.seed(mongoose.model('Airport'),require('../airports.json'),function(){

    mongoose.model('outFlight').count( {}, function(err, count) { 
          if(count !=0){
            console.log("already seeded");
          }else{
             mongoose.model('outFlight').create(seedOutFlights('../outflights'), function (err) {
                      if (err) {
                        console.log("cannot seed outFlight");
                    }else{
                        console.log("outFlight seeded");
                    }
               });     
          }     
      
             mongoose.model('inFlight').count( {}, function(err, count) { 
                  if(count !=0){
                    console.log("already seeded");
                  }else{
                     mongoose.model('inFlight').create(seedOutFlights('../returnflights'), function (err) {
                              if (err) {
                                console.log("cannot seed inFlight");
                            }else{
                                console.log("inFlight seeded");
                            }
                       });     
                  }     

                Db.seed(mongoose.model('Reservation'),require('../reservations.json'),function(){

                    Db.seed(mongoose.model('Booking'),require('../bookings.json'),function(){

                        Db.seed(mongoose.model('Payment'),require('../payments.json'),function(){
                            cb();

                        });
                    });
                });
            });
        });
    });

};


//  Db.drop(function(){
//     console.log("dropped");
//     seedingFunction(function(){
//     console.log("seeding database");
// });
//  });

