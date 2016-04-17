app.factory('ConfirmationSrv', function($http){ 

console.log("in facto");
       return {
         getallInfo : function(cb) {
          var req = {
              method: 'GET',
              url: '/api/getallInfo'
              
          };



          return $http(req).then(function back(response) {
            cb(response.data);
          },
            function myError(response) {
            cb(response.statusText);
            });
         
         },

         getPersonInfo: function(cb){
             var req = {
              method: 'GET',
              url: '/api/getPersonInfo'
              
          };

           return $http(req).then(function back(response) {
            cb(response.data);
             },
            function myError(response) {
            cb(response.statusText);
            });

         }


      };
  });