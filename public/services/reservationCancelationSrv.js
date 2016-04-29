
app.factory('cancelationReservation',function($http){
   return {
       getReservation : function(refNum,cb) {
        var tokenReq = {
        method: 'GET',
        url: '/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/getReservation/' + refNum,
              headers:
              {
                'x-access-token':response
              }
          };

                  return $http(req).then(function mySucces(response) {

               cb(response.data);
            }, function myError(response) {
                 cb(response.statusText);
            });
            }).error(function(response){
               console.log(response.statusText);
               alert("An error occured please try again");
            });      
         }
         ,
          cancelReservation : function(refNum,cb) {
            var tokenReq = {
                method: 'GET',
                url: '/getToken'
              };
      return $http(tokenReq).success(function(response){
         var req = {
              method: 'POST',
              url: '/api/cancelReservation',
              data: { ref: refNum }
                 ,headers:
              {
                'x-access-token':response
              }
          };


             return $http(req).success(function(data, status, headers, config) {
                  cb(data);
              })
              .error(function(data, status, headers, config) {
                      cb("Error while trying to cancel your reservation, please try again later");
          });
            }).error(function(response){
              console.log(response.statusText);
               alert("An error occured please try again");
            })
         }
     };  
});
