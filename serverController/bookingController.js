// var models = require('../models/models.js');
// var mongoose = require('mongoose');   
// var moment = require('moment');



// exports.comapreFlights = function(formdata, cb){

//       if(formdata.trip == "one"){ 
//       	 compareOnewayFlights(formdata,function(err,found){ 
//               if(err) { 
//                   cb(err,found);
//               } 
//               else{  
//               	  cb(null,found);

//                }
//       	 });  

//       	} 

//       	if(formdata.trip=="round"){ 
           
//            comapreRoundtripFlights(formdata, function(err,found){ 
//                if(err){ 
//                     cb(err,found); 
//                } 

//                else{ 

//                    cb(null,found);
//                }
//            });
//       	}

// }




// exports.compareOnewayFlights = function(formdata, cb){  
       
     
//      // console.log(formdata); 
//      // console.log(formdata.from); 
 
//     var aiatFrom = formdata.from; 
    
      

//    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
       
//     var aiatTo = formdata.To;
//     var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
    
//     //var seatsava =  300 - (formdata.NumberOfAdults[0] + formdata.NumberOfChildren[0]);

//      // console.log(seatsava);
       
//    // mongoose.model('outFlight').find(

//    //  { 
        
//    //    origin : aiat, 
//    //    destination : aiatt,
//    //    departureDateTime : formdata.DepartureDate, 
//    //    seats : { $gte : seatsava}, 
//    //  }, function(err,flight){ 
//    //      console.log("hereeeee");
//    //    if(err){  
//    //      console.log("here1"+err);
//    //      cb(err,false);
        
//    //    } 

//    //    else{ 
       
//    //     //cb(null,true); 
//    //     insertBooking(formdata, function(err,added){ 
//    //        if(err){ 
//    //           console.log(err)
//    //        } 

//    //        else{ 
//    //              console.log("here2"+added);

//    //           cb(null,true);
//    //        }

//    //     });
//    //    }


//    //  }); 
//  var FlightModel = mongoose.model('outFlight');
// var query = FlightModel.find(flightData);
//   query.where('destination',destination);
//   query.where('origin',origin);

//   var x = new Date(formdata.DepartureDate);
//   x.setMinutes(0);
//   x.setHours(0);
//   var y = new Date(formdata.DepartureDate);
//   y.setMinutes(59);
//   y.setHours(23);
//   console.log(y);
//   query.where('departureDateTime',{"$gte":x, "$lte": y});  

//   query.where('seats',{"$gt":0});

//   query.exec(function (err, docs) {
//       console.log("the docs is found "+docs);
// });

      

// } 
// exports.comapreRoundtripFlights = function(formdata, cb){  
 



// } 

// insertBooking = function(booking, cb){ 

    
//  var BookingModel = mongoose.model('Booking');
//   var newbooking = new BookingModel(booking); 
//       console.log("here4"+newbooking);
//   newbooking.save(function(err, booking){ 
//       if(err){ 
//          cb(err,null);
//       } 
//       else{ 
//          console.log("here3"+booking);
//          cb(null,true); 
//        }
//    });


// }

formdata={

DepartureDate: "Tue Apr 12 2016 00:00:00 GMT+0200 (EET)",
Email : "shhd@sjs.com",
NumberOfAdults : "3 Adults",
NumberOfChildren : "2 Children",
ReturnDate : undefined,
To : "Saint John Airport (YSJ)",
from : "Andorra la Vella Heliport (ALV)",
trip : "one"
}

var models = require('../models/models.js');
var mongoose = require('mongoose');   


var FlightModel = mongoose.model('outFlight');
var query = FlightModel.find(flightData);
  query.where('destination',destination);
  query.where('origin',origin);

  var x = new Date(formdata.DepartureDate);
  x.setMinutes(0);
  x.setHours(0);
  var y = new Date(formdata.DepartureDate);
  y.setMinutes(59);
  y.setHours(23);
  console.log(y);
  query.where('departureDateTime',{"$gte":x, "$lte": y});  

  query.where('seats',{"$gt":0});

  query.exec(function (err, docs) {
      console.log("the docs is found "+docs);
});

