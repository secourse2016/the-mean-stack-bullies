app.controller('confirmationCtrl', function($scope, $location,ConfirmationSrv,paySrv,flightSrv,personalInfoSrv,paySrv) {
		//$scope.clicktest=function() {

  		 $scope.showThankYou=true; 
        var outFLightData = flightSrv.getOutFLightData();
        var inFlightData = flightSrv.getInFLightData();
        console.log(inFlightData);
        if((outFLightData != null && outFLightData.FlightAirline!="AirFrance") && ((inFlightData !=null && inFlightData.FlightAirline !="AirFrance")||(inFlightData ==null)) ){
            
          
        }else{

     
        }
        // one way flight from other airline
        if((outFLightData != null && outFLightData.FlightAirline!="AirFrance")&&(inFlightData ==null)){
          getComfirmationDataFromServices();
        }else{
          // one way flight from our airline
        if((outFLightData != null && outFLightData.FlightAirline=="AirFrance")&&(inFlightData ==null)){

        }
  
function getComfirmationDataFromServices(){
           $scope.payments = paySrv.getPaymentData();
           $scope.amount = paySrv.getamount();
           $scope.personArray = personalInfoSrv.getPersonArray();
           ConfirmationSrv.getbookingnfo(function(data)
               {
                   
                    $scope.booking = data;
               }); 
           console.log(paySrv.getOutgoingFlightBookingReferenceID());
           $scope.bookId = paySrv.getOutgoingFlightBookingReferenceID();
           $scope.returnBookID = paySrv.getReturnFlightBookingReferenceID();

}

function getComfirmationDataFromSessions (){
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
     

  

