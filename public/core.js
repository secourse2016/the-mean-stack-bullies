var app = angular.module('mainApp',['ui.bootstrap','ngRoute']);
/**
 * Angular Routes
 */
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/partials/home.html',
            controller  : 'myCtrl'
        })
        .when('/book', {
            templateUrl : '/partials/booking.html',
            controller  : 'bookingCtrl'
        })
        // .when('/bookForm', {
        //     templateUrl : '/partials/bookingForm.html',
        //     controller  : 'bookingCtrl'
        // })
        // .when('/bookForm2', {
        //     templateUrl : '/partials/bookingForm.html',
        //     controller  : 'bookingCtrl'
        // })
          .when('/contact', {
            templateUrl : '/partials/contactUs.html',
            controller  : 'ContactUsController'
        });
        
      
       
});


