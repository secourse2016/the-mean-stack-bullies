var models = require('../models/models.js');
var mongoose = require('mongoose');   
var moment = require('moment');



exports.comapreFlights = function(formdata, cb){

      if(formdata.trip == "one"){ 
      	 compareOnewayFlights(formdata,function(err,found){ 
              if(err) { 
                  cb(err,found);
              } 
              else{  
              	  cb(null,found);

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




exports.compareOnewayFlights = function(formdata, cb){  
       
     console.log("here-1"); 
     console.log(formdata); 
     console.log(formdata.from);
    var aiatFrom = formdata.from;
     console.log("here0");
   aiat = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
       console.log("here1"+aiatFrom);
    var aiatTo = formdata.To;
    aiatt= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
     console.log("here2"+aiatTo);
    var seatsava =  formdata.NumberOfAdults[0] + formdata.NumberOfChildren[0];

     console.log("here3"+seatsava);
       
   mongoose.model('outFlight').find(

    { 
        
      origin : aiat, 
      destination : aiatt,
      departureDateTime : formdata.DepartureDate, 
      seats : { $gte : seatsava}, 
    }, function(err,flight){ 
        console.log("hereeeee");
      if(err){  
        cb(err,false);
        
      } 

      else{ 

       cb(null,true); 
       insertBooking(flight, function(err,added){ 
          if(err){ 
             console.log(err)
          } 

          else{ 


             cb(null,true);
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

  newbooking.save(function(err, booking){ 
      if(err){ 
         cb(err,null);
      } 
      else{ 

         cb(null,true); 
       }
   });


}

