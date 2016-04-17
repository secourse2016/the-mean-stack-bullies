app.factory('bookingSrv',function ($http){ 
  
  return { 
     

     insertbooking : function(booking){  

      var req = {  
        method : 'POST', 
      	url : '/api/booking', 
      	data : {booking: booking} 

        
      };  

       console.log("in service");

       return $http(req);
    } 

  }  
   

});