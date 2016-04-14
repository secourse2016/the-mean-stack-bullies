


//handling clicking events to show the relevant material 

//start handling section
app.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('beginning');

      // call $anchorScroll()
      $anchorScroll('beginning');
    };

    $scope.goToContactUs = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('contactUsDiv');

      // call $anchorScroll()
      $anchorScroll('contactUsDiv');
    };


  }]);

app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm) {
      $elm.on('click', function() {
        $("body").animate({scrollTop: $elm.offset().top}, "slow");
      });
    }
  }
});

 app.controller('myCtrl', ['$scope', '$location', '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('cvv');

      // call $anchorScroll()
      $anchorScroll();
    };
  }]);


app.controller('myCtrl', function($scope) {
  $scope.showMe=false;
  $scope.showPay=false;
  $scope.showTag=false;
  
  
  $scope.click1= function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/bookingForm.html"
  }
   $scope.click2= function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/booking2.html"

  }
  $scope.click3=function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/checkreservation.html"

  }


   $scope.click4= function()
  {
    $scope.showMe=true;
    $scope.showBooking=false;
    $scope.showManage=false;
    $scope.showBooking2=false;
    $scope.showBooking3=true;
    console.log("hiiiiiiiiiiiiiitag");

  }
   $scope.click5= function()
  {
    $scope.showPay=true;
   
    
  }
  $scope.tag=function()
  {
    $scope.showTag=true;

  }
    
   $scope.close= function()
  {
  	$scope.showMe=false;
  }
});
//End handling section
/**
 * Main Controller
 */
/**
 * Main Controller
 */



app.controller('reservationsController', function($scope,cancelationReservation)
{
	$scope.searchReservations = function()
	{
	   // $http.get("./reservation.json")
    //   .then(function(response) {
      	   reservations =  cancelationReservation.getReservation();
      	   found = false;
           choosenReservation = 0;
      	   for ( i = 0;i<reservations.length;i++)
      	   {

      	   	 if (reservations[i].bookingRefNumber == $scope.enteredReferenceNum)
      	   	 {
              choosenReservation = i;
        
          	if (reservations[i].confirmed)
   	 	    		$scope.status = "Status : Confirmed";
   	 	    	else
   	 	    		$scope.status ="Status : Not Confirmed";
   	 	    	found = true;
                
   	 	    	break;
      
      	   	 }
           }
           if (!found)
           {
          	 $scope.reservationExist = false;

             $scope.names = ["Reference Number Not Found, Please check it and try again."];
             $scope.flightDetails = [""];
           }
           else
           {
              $scope.result= "";
              $scope.reservationExist = true;
             //  $http.get("./flights.json")
             // .then(function(flightsResponse) {
              flights = cancelationReservation.getFlights();
                for ( i = 0;i<flights.length;i++)
                {
             	    if (reservations[choosenReservation].flightNumber == flights[i].flightNumber.unique)
                  {
                        $scope.names = ["First Name : " + reservations[i].firstName
                        ,"Last Name : " + reservations[i].lastName,
                        "Passport number : " + reservations[i].passport_number,
                       "Booking reference number : " + reservations[i].bookingRefNumber];

                       $scope.flightDetails = ["From " + flights[i].originCity
                       + " To " + flights[i].destinationCity ,"Date : " + flights[i].date,"Duration : " + flights[i].duration + " hours"] ;
                       break; 
                  }
                }
          //  });
           }

    //   });
    
	}


});
app.controller('validateCtrl', function($scope) {
    $scope.CardNumber= "";
    $scope.holderName = "";
    $scope.CVV= "";

});
//End reservation controller

