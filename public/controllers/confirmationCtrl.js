

App.controller('confirmationCtrl',function($scope,ConfirmationSrv){ 


 $scope.showThankYou=true;
  $scope.reservations =  ConfirmationSrv.getReservation(); 
  $scope.payments = ConfirmationSrv.getPayments();  
 
 $scope.close =function()
 {
 	 $scope.showThankYou=false;
 }


  

});
     

  

