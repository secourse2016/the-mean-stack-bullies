app.factory('paySrv', function ($http) { 
  
     return {
         insertPayment : function(pa,cb) {
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa }
                 ,headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

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
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

              }
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