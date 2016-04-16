
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