app.factory('flightSrv', function ($http) {
      var inFlights = [];
      var outFlights = [];
      var flightsFromOtherAirlines = [];
      var ReturnflightsFromOtherAirlines = [];
     return {
         getFlights : function(cb) {
          var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/flights',
            headers:
              {
                'x-access-token':response
              }
          };

          return $http(req).then(
            function mySucces(response) {
                    cb(response.data);
     },      function myError(response) {
                 cb(response.statusText);
                  });
          
          }).error(function(response){
               console.log(response.statusText);
               alert("An error occured please try again");
          })
        },
          insertFlight : function(inFlight_id,ouFlight_id,cb){
                var tokenReq = {
                      method: 'GET',
                      url: '/getToken'
                    };
              return $http(tokenReq).success(function(response){
                  var flightsID = {
                    inFlight_id:inFlight_id,
                    ouFlight_id:ouFlight_id
                  };
                 var req = {
                   method:'POST',
                   url:'/api/insertFlight',

                   data:{flightsID: flightsID},
                   headers:
                          {
                            'x-access-token':response
                          }
                 };
              return $http(req).then(
              function success(response){
                console.log("flights ids added to sessions");
                cb(null);
              }, function error(response){
                 console.log("error");
                 cb("something went wrong please try again");
              });   
         }).error(function(response){
               console.log(response.statusText);
               alert("An error occured please try again");
         });
  },
        setFlightsFromOtherAirlines: function(flights){
          flightsFromOtherAirlines = flights;
         
        },

        getFlightsFromOtherAirlines: function(){
          
          return flightsFromOtherAirlines;
        },
        setReturnFlightsFromOtherAirlines: function(flights){
        ReturnflightsFromOtherAirlines = flights;
        },

        getReturnFlightsFromOtherAirlines: function(){
          
          return ReturnflightsFromOtherAirlines;
        }  
}
 });

app.factory('FlightsSrv', function ($http) {
     return {

         getFlights : function(cb) {
                  var tokenReq = {
                      method: 'GET',
                      url: '/getToken'
                    };
              return $http(tokenReq).success(function(response){
                         var req = {
                               method: 'GET',
                               url: '/api/flightsForTimetable',
                               headers:
                                  {
                                    'x-access-token':response
                                  }
                         };

                        return $http(req)

                              .success(function(data, status, headers, config) {
                                  // return data;
                                  cb(data)
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
