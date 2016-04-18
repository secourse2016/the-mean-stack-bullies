
app.controller('reservationsController', function($scope,cancelationReservation)
{
	$scope.searchReservations = function()
	{
	   // $http.get("./reservation.json")
    //   .then(function(response) {


           found = false;
           choosenReservation = 0;
      	   reservations =  cancelationReservation.getReservation($scope.enteredReferenceNum,function(reservationData)
            {
              console.log("data " + reservationData);
                if (reservationData.length != 0)
                {

                   $scope.reservationExist = true;
                        $scope.names = ["First Name : " + reservationData[0].firstName
                        ,"Last Name : " + reservationData[0].lastName,
                        "Passport number : " + reservationData[0].passport,
                       "Booking reference number : " + reservationData[0].bookingRefNumber];

                       $scope.flightDetails = ["From " + reservationData[0].from
                       + " To " + reservationData[0].To ,"Date : " + reservationData[0].DepartureDate];
                }
                else

                {
                   $scope.reservationExist = false;
                   $scope.names = ["Reference Number Not Found, Please check it and try again."];
                   $scope.flightDetails = [""];
                }
            });

      	   for ( i = 0;i<reservations.length;i++)
      	   { 
      	   	 if (reservations[i].bookingRefNumber == $scope.enteredReferenceNum)
      	   	 {
              choosenReservation = i;
        
   	 	    	found = true;
                


   	 	    	break;
      
      	   	 }
           }

    
	}


});