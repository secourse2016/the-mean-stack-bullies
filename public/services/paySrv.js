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
                              return $http(req).then(
                          function mySucces(response) {
                                  return data;
                       },function myError(response) {
                                 cb(console.log("error"));
                                });  
              })
              .error(function(data, status, headers, config) {
                 return "error";
              });
         }

     };
 });