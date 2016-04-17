// var models = require('../models/models.js');
// var mongoose = require('mongoose');   
// var moment = require('moment');



// exports.comapreFlights = function(formdata2, cb){ 
//           console.log(formdata2.trip);
//       console.log("Im in comapreFlights"); 

//       if(formdata2.trip == "one"){  
//            console.log("IMM IN ONE TRIIP");

//           var OutFlightConditions = {
//               destination:formdata2.To,
//               origin :formdata2.from,
//               departureDateTime :formdata2.DepartureDate
               
//               }; 
            
             
//       	 checkForFlights(formdata2,OutFlightConditions,'outFlight',true,function(err,flights){ 
//               if(err) { 
               
//                   console.log(err);
//               } 
//               else{  
//               	   console.log("out flights ->"+flights);
                  

//                }
//                cb(err,flights);
//       	 });  

//       	} 

//       	if(formdata2.trip=="round"){  
//           console.log("IM IN ROUND TRIP");
//                 var OutFlightConditions = {
//                 destination:formdata2.To,
//                 origin :formdata2.from,
//                 departureDateTime :formdata2.DepartureDate 
//                 };  
//               // var bookingFrom1 = JSON.parse(JSON.stringify(formdata2);
//            checkForFlights(formdata2,OutFlightConditions,'outFlight',true, function(err,outFlights){ 
//                if(err){ 
//                   console.log(err);
//                } 

//                else{ 
//                    console.log("out flights ->"+outFlights+"\n -----------");
//                              var inFlightConditions = {
//                               destination:formdata2.from,
//                               origin :formdata2.To,
//                               departureDateTime :formdata2.ReturnDate 
                               
//                               }; 
                              
//                               // console.log("NUMBERR OFF" + formdata.NumberOfChildren);
//                                //var bookingFrom1 = JSON.parse(JSON.stringify(formdata2);
//                                checkForFlights(formdata2,inFlightConditions,'inFlight' ,false,function(err,inFlights){ 
//                                    if(err){ 
//                                       console.log(err);
//                                    } else{
//                                        console.log("in flights ->"+inFlights);
//                                        //cb(err,outFlights,inFlights);
//                                    }
//                                  });

//                                    }
//            });
//       	 }

// } 




// function checkForFlights(formdata2,formdata,collectionName,insertflag,cb){   
//      // console.log("INN CHECKKK YO");
//      // console.log(">>>>>>>> formdata" + formdata); 
//      // console.log(">>>>>>> formdata2" + formdata2);
//     var aiatFrom = formdata.origin; 

//     var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
    
//     var aiatTo = formdata.destination;
//     var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 

 
//        console.log("INN CHECKKK" +formdata.origin+"----"+formdata.destination+"----"+new Date(formdata.departureDateTime));
 
//   var FlightModel = mongoose.model(collectionName);
//   var query = FlightModel.find(formdata); 

//   query.where('destination',destination);
//   query.where('origin',origin);

//   var x = new Date(formdata.departureDateTime);
//   x.setMinutes(0);
//   x.setHours(0); 

//   var y = new Date(formdata.departureDateTime);
//   y.setMinutes(59);
//   y.setHours(23);

//   query.where('departureDateTime',{"$gte":x, "$lte": y});  
//   query.where('seats',{"$gt":0});

//   query.exec(function (err, docs) {
//     if(err){
//       console.log(err);
    
//     }else{
//         formdata2.NumberOfChildren = Number(formdata2.NumberOfChildren[0]); 
//         formdata2.NumberOfAdults = Number(formdata2.NumberOfAdults[0]);
//               if(insertflag == true){
//                 console.log("hersssss");
//                   insertBooking(formdata2, function(err, booking){ 
//                    if(err){ 
//                     console.log(err);
//                    } 
//                    else{ 

//                       // console.log("HEEERERERE" + booking);
                    
//                    }
//                    cb(err,docs);

//                 });
//               }else{
//                 console.log(docs);
//                 cb(err,docs);
//               }
      
//     }
// });
      

// } 

// function insertBooking(booking, cb){ 

    
//  var BookingModel = mongoose.model('Booking');
//   var newbooking = new BookingModel(booking); 
//      // console.log("here4"+newbooking);
//   newbooking.save(function(err, booking){ 
//       if(err){ 
//          cb(err,null);
//       } 
//       else{ 
//          //console.log("here3"+booking);
//          cb(null,booking); 
//        }
//    });


// }
var models = require('../models/models.js');
var mongoose = require('mongoose'); 
var inFlightConditions = {
                              destination:"King Abdulaziz International Airport (JED)" ,
                              origin :"Cairo International Airport (CAI)",
                              departureDateTime :"Thu Apr 21 2016 00:00:00 GMT+0200 (EET)"
                              }; 
                               var aiatFrom = inFlightConditions.origin; 

    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
    
    var aiatTo = inFlightConditions.destination;
    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 

      var FlightModel = mongoose.model('inFlight');
        var query = FlightModel.find(inFlightConditions); 

        query.where('destination',destination);
        query.where('origin',origin);

        var x = new Date(inFlightConditions.departureDateTime);
        x.setMinutes(0);
        x.setHours(0); 

        var y = new Date(inFlightConditions.departureDateTime);
        y.setMinutes(59);
        y.setHours(23);

        query.where('departureDateTime',{"$gte":x, "$lte": y});  
       // query.where('seats',{"$gt":0});

        query.exec(function (err, docs) { 

                    if(err){ 
                    console.log(err);
                   } 
                   else{ 
                        console.log(docs);
                      // console.log("HEEERERERE" + booking);
                    
                   } 
                   });                      
                              // console.log("NUMBERR OFF" + formdata.NumberOfChildren);
                               //var bookingFrom1 = JSON.parse(JSON.stringify(formdata2);
                               // checkForFlights(formdata2,inFlightConditions,'inFlight' ,false,function(err,inFlights){ 
                               //     if(err){ 
                               //        console.log(err);
                               //     } else{
                               //         console.log("in flights ->"+inFlights);
                               //         //cb(err,outFlights,inFlights);
                               //     }
                               //   });