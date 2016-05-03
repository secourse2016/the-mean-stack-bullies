var Db = require('../db.js');
var mongoose = require('mongoose');
var model = require('./models');
var moment = require('moment');
// Db.init(function(){
// });

function seed(jsonFileName){
  var newOutFlights = [];

  // loop to insert flights from day of calling this function to the 50 days comming
  for(var j=0 ; j<50;j++)
  {
      var count =0;
      
     var outflights = require(jsonFileName);

     //loop on flights to insert flights with dfferent times within a particular day
     for(var i=0 ; i<outflights.length ;i+=2){

       var d =new Date();
       d.setDate(d.getDate() + j);    

        var x = new Date();
        x.setDate(x.getDate() + j);

        newOutFlights[i + (j * outflights.length)]= JSON.parse(JSON.stringify(outflights[count]));
        newOutFlights[i+1 + (j * outflights.length)]= JSON.parse(JSON.stringify(outflights[count+40]));

        var hours= 0;
        if(i<40){
             hours = Math.random() * 12;
         
        }else{
              hours = (Math.random() * 12) + 11;
        }  
       d.setHours(hours); 
       var duration = getFlightDuration(newOutFlights[i + (j * outflights.length)].origin,newOutFlights[i + (j * outflights.length)].destination);
       x.setHours(hours + duration); 

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
 //  console.log(newOutFlights[20]);
 // console.log(newOutFlights[21]);
 //   console.log(newOutFlights[40]);
 // console.log(newOutFlights[41]);
}

 
 function getFlightDuration(origin,Destination){
  var originDestination = origin+"->"+Destination;
  
   switch(originDestination){
    case "BOM->DEL": return 1;
    case "DEL->BOM": return 1;
    case "CAI->JED": return 2;
    case "JED->CAI": return 2;
    case "HKG->TPE": return 3;
    case "TPE->HKG": return 3;
    case "JNB->CPT": return 3;
    case "CPT->JNB": return 3;
    case "RUH->JED": return 1;
    case "JED->RUH": return 1;
    case "LHR->JFK": return 8;
    case "JFK->LHR": return 8;
    case "LCF->LAX": return 2;
    case "LAX->LCF": return 2;
    case "LAX->SFO": return 2;
    case "SFO->LAX": return 2;
    case "FRA->TXL": return 1;
    case "TXL->FRA": return 1;
    case "FCO->LIN": return 1;
    case "LIN->FCO": return 1;
    default        : return 0;
   }
 }


var seedingFunction=exports.seedingFunction=function(cb){
mongoose.model('Airport').count( {}, function(err, count) { 
          if(count !=0){
            console.log("already seeded");
          }else{
Db.seed(mongoose.model('Airport'),require('../airports.json'),function(){
         
    mongoose.model('outFlight').count( {}, function(err, count) { 
          if(count !=0){
            console.log("already seeded");
          }else{
             mongoose.model('outFlight').create(seed('../outflights'), function (err) {
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
                     mongoose.model('inFlight').create(seed('../returnflights'), function (err) {
                              if (err) {
                                console.log("cannot seed inFlight");
                            }else{
                                console.log("inFlight seeded");
                            }
                       });     
                  }     
              mongoose.model('Reservation').count( {}, function(err, count) { 
                    if(count !=0){
                      console.log("already seeded");
                    }else{
                Db.seed(mongoose.model('Reservation'),require('../reservations.json'),function(){
                  mongoose.model('Booking').count( {}, function(err, count) { 
                      if(count !=0){
                        console.log("already seeded");
                      }else{
                    Db.seed(mongoose.model('Booking'),require('../bookings.json'),function(){
                      mongoose.model('Payment').count( {}, function(err, count) { 
                        if(count !=0){
                          console.log("already seeded");
                        }else{
                        Db.seed(mongoose.model('Payment'),require('../payments.json'),function(){
                      mongoose.model('Person').count( {}, function(err, count) { 
                            if(count !=0){
                              console.log("already seeded");
                            }else{
                            Db.seed(mongoose.model('Person'),require('../persons.json'),function(){

                                cb();
                            });  
                            }  
                          });  
                        });
                      }
                      });
                    });
                  }
                  });
                });
              }
              });
            });
        });
    });
 }
 });

};


// var today = new Date('Mon Apr 25 2016 07:11:04 GMT+0200 (EET)');
// console.log(today);
// var x = moment(today).format('YYYY-MM-DD')
//  console.log(x); 



 Db.drop(function(){
    console.log("dropped");
    seedingFunction(function(){
    console.log("seeding database completed successfully");
  });
 });

