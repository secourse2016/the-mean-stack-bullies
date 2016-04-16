var models = require('../models/models.js');
var mongoose = require('mongoose');   
var moment = require('moment');



exports.comapreFlights = function(formdata, cb){

      if(formdata.trip == "one"){ 
      	 compareOnewayFlights(formdata,function(err,found){ 
              if(err) { 
                  cb(err,found); 
                  console.log(found);
              } 
              else{  
              	  cb(null,found); 
                  console.log(found);

               }
      	 });  

      	} 

      	if(formdata.trip=="round"){ 
           
           comapreRoundtripFlights(formdata, function(err,found){ 
               if(err){ 
                    cb(err,found); 
               } 

               else{ 

                   cb(null,found);
               }
           });
      	}

}




exports.compareOnewayFlights = function(formdata2, cb){  
       

var formdata = {
destination:formdata2.To,
origin :formdata2.from,
departureDateTime :formdata2.DepartureDate, 
 
};
    var aiatFrom = formdata.origin; 
    
      

   var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
       console.log(origin);
    var aiatTo = formdata.destination;
    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
      console.log(destination);
 


var FlightModel = mongoose.model('outFlight');
var query = FlightModel.find(formdata);
  query.where('destination',destination);
  query.where('origin',origin);

  var x = new Date(formdata.departureDateTime);
  x.setMinutes(0);
  x.setHours(0);
  var y = new Date(formdata.departureDateTime);
  y.setMinutes(59);
  y.setHours(23);
  console.log("here"+y);
  query.where('departureDateTime',{"$gte":x, "$lte": y});  

  query.where('seats',{"$gt":0});

  query.exec(function (err, docs) {
    if(err){
      console.log(err);
    
    }else{
        formdata2.NumberOfChildren = Number(formdata2.NumberOfChildren[0]); 
        formdata2.NumberOfAdults = Number(formdata2.NumberOfAdults[0]);
        console.log(docs); 
        insertBooking(formdata2, function(err, booking){ 
           if(err){ 
            console.log(err);
           } 
           else{ 

              console.log("HEEERERERE" + booking);
           }


        });
    }
});
      

} 
exports.comapreRoundtripFlights = function(formdata, cb){  
     



} 

insertBooking = function(booking, cb){ 

    
 var BookingModel = mongoose.model('Booking');
  var newbooking = new BookingModel(booking); 
      console.log("here4"+newbooking);
  newbooking.save(function(err, booking){ 
      if(err){ 
         cb(err,null);
      } 
      else{ 
         console.log("here3"+booking);
         cb(null,booking); 
       }
   });


}

