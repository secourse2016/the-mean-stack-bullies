exports.validateBooking = function(booking, cb){ 
     
     var valid= true; 
     var err;  

        if(booking.trip == null){ 
              err = "Please select your trip type"; 
              valid = false;
        }

        if(booking.from == null){  
        	    err = "Please enter your origin airport";
                valid = false; 
        } 
        if(booking.to == null){ 
               err = "Please enter your destination"; 
               valid = false;
         } 
        if(booking.DepartureDate == null) ||   
          (booking.DepartureDate.getFullYear() < new Date().getFullYear()) || 
          ((booking.DepartureDate.getMonth()+1 < new Date().getMonth+1) && 
          	    (booking.DepartureDate.getFullYear() == new Date().getFullYear())) || 
          ((booking.DepartureDate.getMonth+1 < new Date().getMonth+!) && 
          	     (booking.DepartureDate.getFullYear() > new Date().getFullYear()+1))
                  
          









}