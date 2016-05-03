
app.controller('reservationsController', function($scope,cancelationReservation)
{
	$scope.searchReservations = function()
	{
	   // $http.get("./reservation.json")
    //   .then(function(response) {

      	     cancelationReservation.getReservation($scope.enteredReferenceNum,function(reservationData)
            {
           
                if (reservationData.reservation != undefined)
                {


              console.log("name " + reservationData.reservation.firstName);
                   $scope.reservationExist = true;
                        $scope.names = ["First Name : " + reservationData.person.firstName
                        ,"Last Name : " + reservationData.person.secondName,
                        "Passport number : " + reservationData.person.passportNumber,
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
    
	 }

   $scope.cancelReservation = function()
  {
            cancelationReservation.cancelReservation($scope.enteredReferenceNum,function(returned)
            {
              console.log("callback");
              alert(returned );
            
                   $scope.reservationExist = false;
                   $scope.names = [""];
                   $scope.flightDetails = [""];
            });
    
   }
   


});