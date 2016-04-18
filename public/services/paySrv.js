app.factory('paySrv', function ($http) { 
  
     return {
         insertPayment : function(pa,cb) {
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa }
          };

          return $http(req)

              .success(function(data, status, headers, config) {
                  console.log("payment added to sessions");
                  var req2 = {
                      method: 'GET',
                      url: '/api/completeBookingData'
                    };
                              return $http(req2).then(
                          function mySucces(response) {
                            cb(true);
                            console.log("succeeed in completeBookingData http get request"+response)
                                
                       },function myError(response) {
                                console.log("error")
                                 cb(false);
                                });  
              })
              .error(function(data, status, headers, config) {
                 return "error";
              });
         }

     };
 });