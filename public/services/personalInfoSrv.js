app.factory('personalInfoSrv', function ($http) {
     return {
         insertPerson : function(pe,cb) {
          var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: '/api/insertperson',
              data: { people: pe }
                 ,headers:
              {
                'x-access-token':response
              }
          };
          
          return $http(req)

              .success(function(response) {
                console.log("hereeeeee"+response);
                   cb(response);
              })
              .error(function(data, status, headers, config) {
                  console.log(response.statusText);
                  alert("An error occured please try again");
          });
            }).error(function(response){
                console.log(response.statusText);
                alert("An error occured please try again");
            });

         },
     getBookingNumberOfAdultsAndChildren : function(){
        var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
        var req = {
          method: 'Get',
          url: '/api/getBookingNumberOfAdultsAndChildren',
          
          headers:
          {
            'x-access-token':response
          }
      };

        return $http(req)
              .success(function(data, status, headers, config) {
                    // console.log("test---------------->"+data);
                    return data;
              })
              .error(function(data, status, headers, config) {
                   return "error";
              });
            }).error(function(response){
                console.log(response.statusText);
                alert("An error occured please try again");
            });
         }

     };
 });