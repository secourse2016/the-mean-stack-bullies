app.factory('paySrv', function ($http) { 
  
     return {

         insertPayment : function(stripeToken,pa,cb) {
          var tokenReq = {
        method: 'GET',
        url: '/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa , 
                       token : stripeToken}
                 ,headers:
              {
                'x-access-token':response
              }
          };

          return $http(req)

              .success(function(data, status, headers, config) {
                  console.log("payment added to sessions");
                  var req2 = {
                      method: 'GET',
                      url: '/api/completeBookingData',
                       headers:
                                {
                                  'x-access-token':response
                                }
                    };
                              return $http(req2).then(
                          function mySucces(response) {
                            console.log("succeeed in completeBookingData http get request"+response);
                            cb(true);
                            
                                
                       },function myError(response) {
                              console.log(response.statusText);
                               alert("An error occured please try again");
                                });  
              })
              .error(function(data, status, headers, config) {
                 return "error";
              });
            }).error(function(){
                 console.log(response.statusText);
                 alert("An error occured please try again");
            })
         },
         getAmount : function(cb) {
              var tokenReq = {
                method: 'GET',
                url: '/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/getPaymentAmount',
               headers:
              {
                'x-access-token':response
              }
          };



          return $http(req).success(function(response) {
                                      console.log("this is the response of getPaymentAmount "+response)
                                      cb(response);
                                    })
                           .error(function(response){
                                   console.log(response.statusText);
                                    alert("An error occured please try again");
                                  });
           
         
         }).error(function(response){
                 console.log(response.statusText);
                  alert("An error occured please try again");
         });
       }

      
           
        

     };
 });