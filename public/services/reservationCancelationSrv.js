
app.factory('cancelationReservation',function($http){
   return {
       getReservation : function(refNum,cb) {
          var req = {
              method: 'GET',
              url: '/api/getReservation/' + refNum
          };

                  return $http(req).then(function mySucces(response) {
               cb(response.data);
            }, function myError(response) {
                 cb(response.statusText);
            });
         }
     };  
});
