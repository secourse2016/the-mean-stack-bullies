// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
app = angular.module('starter', ['ionic', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   
  .state('confirmation', {
    url: '/confirmation',
   
        templateUrl: 'templates/confirmation.html',
        controller: 'ConfirmationCtrl'
     
  })

    .state('reservation', {
    url: '/reservation',
   
        templateUrl: 'templates/ReservationDetails.html',
        controller: 'reservationCtrl'
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

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
