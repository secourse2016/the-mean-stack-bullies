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

        .when('/cal', {
            templateUrl : '/partials/calendar.html',
            controller  : 'calendarCtrl'
        })
        .when('/book', {
            templateUrl : '/partials/booking.html',
            controller  : 'flightCtrl'
        })
        .when('/pay', {
            templateUrl : '/partials/payment.html',
            controller  : 'paymentCtrl'
        })
        .when('/passenger', {
            templateUrl : '/partials/personalInformation.html',
            controller  : 'personalInfoCtrl'
        })  
          .when('/contact', {
            templateUrl : '/partials/contactUs.html',
            controller  : 'ContactUsController'
        })
        .when('/confirm', {
            templateUrl : '/partials/confirmation.html',
            controller  : 'confirmationCtrl'
        })
        .when('/team', {
            templateUrl : '/partials/team.html',
            controller  : 'TeamController'
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master

        }) 
        .when('/timetable', {
            templateUrl : '/partials/timeTable.html',
            controller  : 'bookingCtrl'
        });
<<<<<<< HEAD

=======
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
>>>>>>> master
        
        

     
       
});

