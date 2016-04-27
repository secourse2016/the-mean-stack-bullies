/* Create Angular App Instance */
app = angular.module('mainApp', ['ionic']);

/**
 * Angular Routes
 */
app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                templateUrl: '/partials/home.html',
                controller: 'HomeCtrl'
            })        

            .state('confirmation', {
                url: '/confirmation',
                templateUrl: '/partials/confirmation.html',
                controller: 'ConfirmationCtrl'
            })

            .state('timetable', {
                url: '/timetable',
                templateUrl: '/partials/timetable.html',
                controller: 'timeTableCtrl'
            })

            .state('reservation', {
                url: '/reservation',
                templateUrl: '/partials/ReservationDetails.html',
                controller: 'reservationCtrl'
            })
             .state('payment', {
                url: '/',
                templateUrl: '/partials/payment.html'
                // controller: 'ConfirmationCtrl'
            })   
              .state('passenger', {
                url: '/',
                templateUrl: '/partials/personalInformation.html'
                // controller: 'ConfirmationCtrl'
            }) ;  

        $urlRouterProvider.otherwise('/#');

});




// /**
//  * Main Controller
//  */
// app.controller('mainCtrl', function($scope, $state, FlightsSrv) {

//   /* Retrieve List of Airports Codes */
//   function AirportCodes() {
//     FlightsSrv.getAirportCodes().success(function(airports) {
//         console.log('[airports codes=>', airports);
//          $scope.Airports = airports;
//      });
//   };

//   /* Record User's Selected Origin Airport  */
//   SetOriginAirport = function(originAirport) {
//     console.log("[originAirport]=>", originAirport);
//     FlightsSrv.setSelectedOriginAirport(originAirport);
//   };

//   /* Record User's Selected Destination Airport  */
//   SetDestinationAirport = function(destinationAirport) {
//     console.log("[destAirport]=>", destinationAirport);
//     FlightsSrv.setSelectedDestinationAirport(destinationAirport);
//   };

//   /* Find All Available Flights  */
//   $scope.SearchFlights = function(origin, destination) {
//     SetOriginAirport(origin);
//     SetDestinationAirport(destination);
//     $state.go('flights');
//   };

//   /* Get Airports on page render  */
//   AirportCodes();

// });



// /**
//  * Flights Controller
//  */
// app.controller('flightsCtrl', function($scope, FlightsSrv) {

//   /* Retrieve Selected Airports Codes */
//   $scope.flight = {
//     origin      : FlightsSrv.getSelectedOriginAirport(),
//     destination : FlightsSrv.getSelectedDestinationAirport()
//   };

// });


// /**
//  * Flights Service
//  */
// app.factory('FlightsSrv', function ($http) {
//      return {
//          getAirportCodes : function() {
//             console.log('[flightsSrv]=>getAirportCodes');
//            return $http.get('http://localhost:3000/api/data/codes');
//          },
//          setSelectedOriginAirport: function(value) {
//            this.selectedOriginAirport = value;
//          },
//          getSelectedOriginAirport: function() {
//            return this.selectedOriginAirport;
//          },
//          setSelectedDestinationAirport: function(value) {
//            this.selectedDestinationAirport = value;
//          },
//          getSelectedDestinationAirport: function() {
//            return this.selectedDestinationAirport;
//          }
//      };
//  });
