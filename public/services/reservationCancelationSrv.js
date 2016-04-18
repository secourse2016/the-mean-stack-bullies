
app.factory('cancelationReservation',function($http){
   return {
       getReservation : function(refNum,cb) {
          var req = {
              method: 'GET',
              url: '/api/getReservation/' + refNum,
              headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

              }
          };

                  return $http(req).then(function mySucces(response) {

               cb(response.data);
            }, function myError(response) {
                 cb(response.statusText);
            });
         }
         ,
          cancelReservation : function(refNum,cb) {

         var req = {
              method: 'POST',
              url: '/api/cancelReservation',
              data: { ref: refNum }
          };


             return $http(req).success(function(data, status, headers, config) {
                  return data;
              })
              .error(function(data, status, headers, config) {
                 return "error";
          });
         }
     };  
});
