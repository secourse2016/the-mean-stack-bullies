var moment = require('moment');
exports.validateBooking = function(booking, cb){ 
     
     var valid= true; 
     var err ="";    
     var evalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(booking.trip == undefined){ 
              err += "Please select your trip type"; 
              valid = false;
        }

        if(booking.from == undefined){  
        	    err += "Please enter your origin airport";
                valid = false; 
        } 
        if(booking.To == undefined){ 
               err += "Please enter your destination"; 
               valid = false;
         }  

         // if(booking.DepartureDate && (booking.DepartureDate.getFullYear() > new Date().getFullYear()+1)) {
         //      err = "You can not book a flight within a period greater than one year ahead";
         //      valid = false;
         // // } 
         // console.log("HHHERRE");  
         // console.log("TYPE OFF YEAAARRR   " + typeof Number(moment(booking.DepartureDate).format("YYYY")));
         // console.log("DAAAY  " + Number(moment(booking.DepartureDate).format("DD")));
        if((booking.DepartureDate == undefined)||   
          (Number(moment(booking.DepartureDate).format("YYYY")) < Number(moment(new Date()).format("YYYY"))) || 
          ((Number(moment(booking.DepartureDate).format("MM")) < Number(moment(new Date()).format("MM"))) && 
          	    (Number(moment(booking.DepartureDate).format("YYYY")) == Number(moment(new Date()).format("YYYY")))) || 
          ((Number(moment(booking.DepartureDate).format("DD")) < Number(moment(new Date()).format("DD"))) && 
          	 (Number(moment(booking.DepartureDate).format("MM")) == Number(moment(new Date()).format("MM"))) &&
          	 (Number(moment(booking.DepartureDate).format("YYYY")) == Number(moment(new Date()).format("YYYY"))))) { 

                err += "Please enter a valid departure date"; 
                valid = false;
        }


        if(booking.trip == "round"){ 

           if((booking.ReturnDate == undefined)||   
          (Number(moment(booking.ReturnDate).format("YYYY")) < Number(moment(new Date()).format("YYYY"))) || 
          ((Number(moment(booking.ReturnDate).format("MM")) < Number(moment(new Date()).format("MM"))) && 
                (Number(moment(booking.ReturnDate).format("YYYY")) == Number(moment(new Date()).format("YYYY")))) || 
          ((Number(moment(booking.ReturnDate).format("DD")) < Number(moment(new Date()).format("DD"))) && 
             (Number(moment(booking.ReturnDate).format("MM")) == Number(moment(new Date()).format("MM"))) &&
             (Number(moment(booking.ReturnDate).format("YYYY")) == Number(moment(new Date()).format("YYYY"))))){

              err += "Please enter a valid return date"; 
              valid = false;

        
           } 

        } 

         if(booking.NumberOfAdults == undefined){ 
             err+= "Please select number of adults";
             valid = false;

        }   

        if(booking.NumberOfChildren == undefined){ 
            err+="Please select number of children";
            valid = false;
        } 

        if(booking.Class == undefined){  
        	err += "Please select the seating class"; 
        	valid = false;

        } 

        if(booking.Email == undefined || !(evalid.test(booking.Email))) { 
           err += "Please enter a valid email"; 
           valid = false;


        }

                  
         
      if(valid == true){ 
           err=null;
      } 

      cb(err);


}