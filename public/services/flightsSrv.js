app.factory('flightSrv', function ($http) {
      var inFlights = [];
      var outFlights = [];
     return {
         getFlights : function(cb) {

          var req = {
              method: 'GET',
              url: '/api/flights',
            headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

              }
          };

          return $http(req).then(
            function mySucces(response) {
                    cb(response.data);
     },      function myError(response) {
                 cb(response.statusText);
                  });
          
          },
          insertFlight : function(inFlight_id,ouFlight_id,cb){
                  var flightsID = {
                    inFlight_id:inFlight_id,
                    ouFlight_id:ouFlight_id
                  };
                 var req = {
                   method:'POST',
                   url:'/api/insertFlight',

                   data:{flightsID: flightsID}
                      ,headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

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
          // setIngoingFlights : function(inGoingFlights){

          //      inFlights = inGoingFlights ;
          // },
          //  setOutgoingFlights : function(outGoingFlights){
          //   console.log("in flightSRv "+outGoingFlights);
          //      outFlights = outGoingFlights ;
          // },
          //  getIngoingFlights : function(cb){
          //  console.log("in get in flightSRv "+outFlights);
          //      cb(inFlights);
          // },
          //  getOutgoingFlights : function(cb){
          //   console.log("in get out flightSRv "+outFlights);
          //      cb(outFlights) ;
          // }

         }
         // getFlights : function() {
         //   return $http.get('/api/data/flights');
         // },
         // setSelectedOriginAirport: function(value) {
         //   this.selectedOriginAirport = value;
         // },
         // getSelectedOriginAirport: function() {
         //   return this.selectedOriginAirport;
         // },
         // setSelectedDestinationAirport: function(value) {
         //   this.selectedDestinationAirport = value;
         // },
         // getSelectedDestinationAirport: function() {
         //   return this.selectedDestinationAirport;
         // }
  }  
 });

app.factory('FlightsSrv', function ($http) {
     return {
         getFlights : function(cb) {
                         var req = {
                               method: 'GET',
                               url: '/api/flightsForTimetable',
                               headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

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
        }
     };
 });
