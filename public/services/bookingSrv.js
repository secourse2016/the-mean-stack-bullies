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
                                        }) ;                         


// <<<<<<< HEAD
//        console.log("in service");
//        console.log("test nullsss in service ----------->"+booking[0].NumberOfAdults) ; 
//        console.log("test nullsss in service ----------->"+booking[0].NumberOfChildren) ; 
//        return $http(req)

//               .success(function(response) {
//                 console.log("response --> "+response);
//                   cb(response);
//               })
//               .error(function(response) {
//                  return "error";
//           });
// =======
// >>>>>>> 23245027426c299d64d798310a72cc486498bdac
    } 
  }  
});