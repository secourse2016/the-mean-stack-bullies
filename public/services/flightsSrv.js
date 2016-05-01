app.factory('flightSrv', function ($http) {
      var inFlights = [];
      var outFlights = [];
      var flightsFromOtherAirlines = [];
      var ReturnflightsFromOtherAirlines = [];

      var airlinesNameIpAddresses = [];
      airlinesNameIpAddresses["Austrian"] = "http://52.90.41.197";
      airlinesNameIpAddresses["KLM"]="http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com";
      airlinesNameIpAddresses["Lufthansa"]="http://ec2-54-152-123-100.compute-1.amazonaws.com";
      airlinesNameIpAddresses["Turkish_Airlines"]="http://52.27.150.19";
      airlinesNameIpAddresses["Hawaiian"]="http://54.93.36.94";
   
     return {
         getFlights : function(cb) {
          var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
             console.log("services1");
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/flights',
            headers:
              {
                'x-access-token':response
              }
          };
          console.log("services2");
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
        }, 

        bookflightFromOtherAirline: function(inputData,cb){

         var ipAddress =  airlinesNameIpAddresses[inputData.Airline] ;
         var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
          return $http(tokenReq).success(function(token){
          var req = {
            method:'POST',
            url: '/booking',
            data:{
              passengerDetails:inputData.passengerDetails,
              class:inputData.class,
              cost:inputData.cost,
              outgoingFlightId:inputData.outgoingFlightId,
              returnFlightId:inputData.returnFlightId
            },
             headers:
                      {
                        'x-access-token':token
                      }

          }
          $http(req).success(function(response){
            if(response.errorMessage){
              alert(response.errorMessage);
            }else{
              cb(response.refNum);
            }
          });
        });
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
