// Ionic Starter App

app = angular.module('starter', ['ionic', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   
  .state('confirmation', {
    url: '/confirmation',
    templateUrl: 'templates/confirmation.html',
    controller: 'ConfirmationCtrl'
     
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
    .state('payment', {
      url: '/payment',
      templateUrl: 'templates/payment.html',
      controller:'paymentCtrl'
          
       
    })
    .state('stats', {
      url: '/stats',
      templateUrl: 'templates/statistics.html',
    
          
       
    })

  // // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
   // Stripe.setPublishableKey('pk_test_ULcStxFLM4quhm4JacResvRo'); 
});


