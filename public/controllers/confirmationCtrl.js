app.controller('confirmationCtrl', function($scope, $location,ConfirmationSrv,paySrv,flightSrv,personalInfoCtrl,paySrv) {
		//$scope.clicktest=function() {

  		 $scope.showThankYou=true; 
        var outFLightData = flightSrv.getOutFLightData();
        var inFlightData = flightSrv.getInFLightData();
        if(outFLightData != null || inFlightData !=null ){
           $scope.payments = paySrv.getPaymentData();
           $scope.amount = paySrv.getamount();
           $scope.personArray = personalInfoCtrl.getPersonArray();
           ConfirmationSrv.getbookingnfo(function(data)
               {
                    $scope.booking = data;
               }); 
           $scope.bookId = paySrv.getOutgoingFlightBookingReferenceID();

        }else{
           ConfirmationSrv.getallInfo(function(data)
       {

            console.log(data);
            $scope.payments = data;
       });

      paySrv.getAmount(function(amount){
        $scope.amount=amount;
      });

        ConfirmationSrv.getPersonInfo(function(data)
       {

        console.log(data);

            
            $scope.personArray = data;
            console.log($scope.personArray);
       });

        ConfirmationSrv.getbookingnfo(function(data)
       {
        console.log("bokoing data");
            console.log(data);
            $scope.booking = data;
       }); 

       ConfirmationSrv.getbookingID(function(id){ 
               console.log(id); 
               $scope.bookId = id;

       });
        }
  		


 // $scope.reservations =  ConfirmationSrv.getReservation(); 
 // $scope.payments = ConfirmationSrv.getPayments();  
 
 $scope.close =function()
 {
 	 $scope.showThankYou=false;
 }



  		
});
     

  

