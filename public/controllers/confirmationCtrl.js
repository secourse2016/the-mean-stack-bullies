app.controller('confirmationCtrl', function($scope, $location,ConfirmationSrv) {
		//$scope.clicktest=function() {

console.log("in conf");
  		 $scope.showThankYou=true;

  		 ConfirmationSrv.getallInfo(function(data)
  		 {
  		 	console.log("new");
  		 			console.log(data);
  		 			$scope.payments = data;
  		 });

  		  ConfirmationSrv.getPersonInfo(function(data)
  		 {
  		 	console.log("new22");
  		 			console.log(data);
  		 			$scope.persons = data;
  		 });

        ConfirmationSrv.getbookingnfo(function(data)
       {
        console.log("bokoing data");
            console.log(data);
            $scope.booking = data;
       });


 // $scope.reservations =  ConfirmationSrv.getReservation(); 
 // $scope.payments = ConfirmationSrv.getPayments();  
 
 $scope.close =function()
 {
 	 $scope.showThankYou=false;
 }



  		
});
     

  

