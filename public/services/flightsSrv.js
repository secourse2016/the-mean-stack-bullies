app.factory('flightSrv', function ($http) {
      var inFlights = [];
      var outFlights = [];
     return {
    //      getFlights : function(fl,cb) {

    //       var req = {
    //           method: 'GET',
    //           url: '/api/getFlight/' + fl[0].origin + '/' + fl[0].destination
    //           + '/' + fl[0].departureDateTime 
    //       };

    //       return $http(req).then(function mySucces(response) {
    //    cb(response.data);
    // }, function myError(response) {
    //      cb(response.statusText);
    // }),
          setIngoingFlights : function(inGoingFlights){

               inFlights = inGoingFlights ;
          },
           setOutgoingFlights : function(outGoingFlights){
            console.log("in flightSRv "+outGoingFlights);
               outFlights = outGoingFlights ;
          },
           getIngoingFlights : function(cb){
           console.log("in get in flightSRv "+outFlights);
               cb(inFlights);
          },
           getOutgoingFlights : function(cb){
            console.log("in get out flightSRv "+outFlights);
               cb(outFlights) ;
          }

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
    
 });

app.factory('FlightsSrv', function ($http) {
     return {
         getFlights : function(cb) {
                        // var req = {
                        //       method: 'GET',
                        //       url: '/api/flightsForTimetable'
                        // };

                        return $http.get('/api/flightsForTimetable')

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
