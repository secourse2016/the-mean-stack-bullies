app.factory('bookingSrv',function ($http){ 
  
  return { 
     

     insertbooking : function(booking,cb){  

      var req = {  
        method : 'POST', 
        url : '/api/booking', 
        data : {booking: booking} 

        
      };  

       console.log("in service");

       return $http(req)

              .success(function(response) {
                console.log("response --> "+response);
                  cb(response);
              })
              .error(function(response) {
                 return "error";
          });
    } 

  }  
   

});