var Db = require('../db.js');
var mongoose = require('mongoose');
var model = require('./models');

Db.init(function(){
});

function seedOutFlights(entity){
  console.log("hereesss");
  var newOutFlights = [];
  for(var j=0 ; j<48;j++)
  {
  var count =0;
  
 var outflights = require(entity);

 

       for(var i=0 ; i<outflights.length ;i+=2){
    // Day flights
   
//console.log("--------");
       var d =new Date();
     d.setDate(d.getDate() + j);    

    var x = new Date();
     x.setDate(x.getDate() + j);
    newOutFlights[i + (j * outflights.length)]= JSON.parse(JSON.stringify(outflights[count]));
    newOutFlights[i+1 + (j * outflights.length)]= JSON.parse(JSON.stringify(outflights[count+20]));
      // console.log(i + (j * outflights.length));
      // console.log(i+1 + (j * outflights.length));
    var hours= 0;
    if(i<20){
         hours = Math.random() * 12;
     
    }else{
        hours = (Math.random() * 12) + 11;
    }  
       d.setHours(hours); 
       x.setHours(hours + (Math.random()* 8) + 2); 
       newOutFlights[i + (j * outflights.length)].departureDateTime= d;
       newOutFlights[i + (j * outflights.length)].arrivalDateTime= x ;
       newOutFlights[i + (j * outflights.length)].seats= 100 ;


        newOutFlights[i+1 + (j * outflights.length)].departureDateTime= d;
        newOutFlights[i+1 + (j * outflights.length)].arrivalDateTime= x ;
        newOutFlights[i+1 + (j * outflights.length)].seats= 100 ;
        // incrementing count
         count+=1;
    }
  }
  return newOutFlights;
 // console.log(newOutFlights[0]);
 // console.log(newOutFlights[1]);
 // console.log(newOutFlights[4]);
 // console.log(newOutFlights[5]);
};

 Db.drop(function(){
    console.log("dropped");
    seedingFunction(function(){
    console.log("seeding database completed successfully");
  });
 });


var seedingFunction=exports.seedingFunction=function(cb){
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

                            Db.seed(mongoose.model('Person'),require('../persons.json'),function(){

                                cb();
                            });    

                        });
                    });
                });
            });
        });
    });

};


