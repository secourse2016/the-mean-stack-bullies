app.factory('paySrv', function ($http) { 
  
     return {
         insertPayment : function(pa) {
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa }
          };

          return $http(req)

              .success(function(data, status, headers, config) {
                  return data;
              })
              .error(function(data, status, headers, config) {
                 return "error";
              });
         }

     };
 });