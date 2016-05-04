// Ionic Starter App

app = angular.module('starter', ['ionic', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   
  .state('confirmation', {
    url: '/confirmation',
    templateUrl: 'templates/confirmation.html',
    controller: 'ConfirmationCtrl'
     
  })

  .state('chooseAirport', {
    url: '/chooseAirport',
    templateUrl: 'templates/searchTrips.html',
    controller: 'bookingFormCtrl'
     
  })

  .state('book', {
    url: '/book',
    templateUrl: 'templates/bookingFormIon.html',
    controller: 'bookingFormCtrl'
     
  })

    .state('reservation', {
    url: '/reservation',
    templateUrl: 'templates/ReservationDetails.html',
    controller: 'reservationCtrl'
      })
    
     .state('passenger', {
    url: '/passenger',
    templateUrl: 'templates/personalInformation.html',
    controller: 'personalInfoCtrl'
      })

  .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller:'HomeCtrl'
       
    })
  .state('timetable', {
      url: '/timetable',
      templateUrl: 'templates/timetable.html',
       controller:'timeTableCtrl'
       
    })
  .state('about', {
      url: '/aboutUs',
      templateUrl: 'templates/aboutUs.html'
       
    })
   .state('flights', {
      url: '/flights',
      templateUrl: 'templates/Flights.html',
      controller:'flightCtrl'
       
    })
    .state('payment', {
      url: '/payment',
      templateUrl: 'templates/payment.html',
      controller:'paymentCtrl'
          
       
    })
    .state('stats', {
      url: '/stats',
      templateUrl: 'templates/statistics.html',
    
          
       
    }) 
    .state('berlinOffer', {
      url: '/berlinOffer',
      templateUrl: 'templates/berlinOffer.html',
      controller :'berlinOfferCtrl'
       
    }) 
    .state('arizonaOffer', {
      url: '/arizonaOffer',
      templateUrl: 'templates/arizonaOffer.html',
      controller :'arizonaOfferCtrl'
       
    }) 
    .state('nepalOffer', {
      url: '/nepalOffer',
      templateUrl: 'templates/nepalOffer.html',
      controller :'nepalOfferCtrl'
       
    })


  // // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
   // Stripe.setPublishableKey('pk_test_ULcStxFLM4quhm4JacResvRo'); 
});


