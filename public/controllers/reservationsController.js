
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
    
	 }

   $scope.cancelationReservation = function()
  {
            cancelationReservation.cancelationReservation($scope.enteredReferenceNum,function(returned)
            {
              alert(returned );
            
                   $scope.reservationExist = false;
                   $scope.names = [""];
                   $scope.flightDetails = [""];
            });
    
   }
   


});