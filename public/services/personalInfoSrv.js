app.factory('personalInfoSrv', function ($http) {
     return {
         insertPerson : function(pe) {
          var req = {
              method: 'POST',
              url: '/api/insertperson',
              data: { person: pe }
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