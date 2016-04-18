
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
              for(var key2 in reservationData.reservation) 
                    {
console.log(reservationData.reservation[key2]);
                        console.log(key2);
                    }

                if (reservationData.reservation.length != 0)
                {


console.log("name " + reservationData.reservation.firstName);
                   $scope.reservationExist = true;
                        $scope.names = ["First Name : " + reservationData.reservation.firstName
                        ,"Last Name : " + reservationData.reservation.lastName,
                        "Passport number : " + reservationData.reservation.passport,
                       "Booking reference number : " + reservationData.reservation.bookingRefNumber];

                       $scope.flightDetails = ["From " + reservationData.booking.from
                       + " To " + reservationData.booking.To ,"Date : " + reservationData.booking.DepartureDate];
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