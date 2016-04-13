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
          .when('/contact', {
            templateUrl : '/partials/contactUs.html',
            controller  : 'ContactUsController'
        });
         
       
});


