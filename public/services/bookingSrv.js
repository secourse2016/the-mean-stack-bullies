app.factory('bookingSrv',function ($http){ 
  
  return { 
     

     insertbooking : function(booking,cb){  
      var tokenReq = {
        method: 'GET',
        url: '/getToken'
      };
      return $http(tokenReq).success(function(response){
                                    console.log("token--->"+response);

                                      var req = {  
                                        method : 'POST', 
                                        url : '/api/booking', 
                                        data : {booking: booking} ,
                                       headers:
                                              {
                                                'x-access-token': response
                                              }
                                      };  
                                       return $http(req)

                                              .success(function(response) {
                                                //console.log("response --> "+response);
                                                  cb(response);
                                              })
                                              .error(function(response) {
                                                  console.log(response.statusText);
                                                  alert("An error occured please try again");
                                          });
                                 })
                              .error(function(response){
                              console.log(response.statusText);
                               alert("An error occured please try again");
                              })                          


    } 
  }  
});