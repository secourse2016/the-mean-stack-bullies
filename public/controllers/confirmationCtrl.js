app.controller('confirmationCtrl', function($scope, $location,ConfirmationSrv,paySrv) {
		//$scope.clicktest=function() {

console.log("in conf");
  		 $scope.showThankYou=true;

  		 ConfirmationSrv.getallInfo(function(data)
  		 {
  		 	console.log("new");
  		 			console.log(data);
  		 			$scope.payments = data;
  		 });

      paySrv.getAmount(function(amount){
        $scope.amount=amount;
      });

  		  ConfirmationSrv.getPersonInfo(function(data)
  		 {
        console.log("new22");
        console.log("this is the array yarabbbbb");
        console.log(data);
  		 	console.log("new22");
  		 			
  		 			$scope.personArray = data;
            console.log($scope.personArray);
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
     

  

