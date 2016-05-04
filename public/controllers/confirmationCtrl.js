
app.controller('confirmationCtrl', function($scope, $location,ConfirmationSrv,paySrv,flightSrv,personalInfoSrv,paySrv) {

		//$scope.clicktest=function() {

  		 $scope.showThankYou=true; 
        var outFLightData = flightSrv.getOutFLightData();
        var inFlightData = flightSrv.getInFLightData();
        console.log(outFLightData);
        console.log(inFlightData);
      
        // one way flight from other airline
        if((outFLightData != null && outFLightData.FlightAirline!="AirFrance")&&(inFlightData.FlightAirline ==null)){
          getComfirmationDataFromServices();
        }else{
          // one way flight from our airline
        if((outFLightData != null && outFLightData.FlightAirline=="AirFrance")&&(inFlightData.FlightAirline ==null)){
            getComfirmationDataFromSessions(false);
          }else{
             // round way flights both from other airline
            if((outFLightData != null && outFLightData.FlightAirline!="AirFrance")&&(inFlightData !=null && inFlightData.FlightAirline !="AirFrance")){
              getComfirmationDataFromServices();
            }else{
               // round way flights both from our airline
              if((outFLightData != null && outFLightData.FlightAirline=="AirFrance")&&(inFlightData !=null && inFlightData.FlightAirline =="AirFrance")){
                getComfirmationDataFromSessions(false);
              }else{
                // round way flights outgoing flight from our airline and return flight from other airline
                if((outFLightData != null && outFLightData.FlightAirline=="AirFrance")&&(inFlightData !=null && inFlightData.FlightAirline !="AirFrance")){
                  getComfirmationDataFromServices();
                  getComfirmationDataFromSessions(false);
                  }else{
                // round way flights return flight from our airline and outgoing flight from other airline                    
                    if((outFLightData != null && outFLightData.FlightAirline!="AirFrance")&&(inFlightData !=null && inFlightData.FlightAirline =="AirFrance")){
                         getComfirmationDataFromServices();
                         getComfirmationDataFromSessions(true);
                    }
                  }
                }
              }
            }
          }

        

  
function getComfirmationDataFromServices(){
           $scope.payments = paySrv.getPaymentData();
           console.log(paySrv.getamount())
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

function getComfirmationDataFromSessions (returnFlightFlag){
        ConfirmationSrv.getallInfo(function(data)
         {

              console.log(data);
              $scope.payments = data;
         });
        $scope.amount = paySrv.getamount();
   console.log($scope.amount);
    

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
        if(returnFlightFlag == true){
           ConfirmationSrv.getbookingID(function(id){ 
               console.log(id); 
               $scope.returnBookID = id;

       });
        }else{
           ConfirmationSrv.getbookingID(function(id){ 
               console.log(id); 
               $scope.bookId = id;


       });
        }
      
        }

 // $scope.reservations =  ConfirmationSrv.getReservation(); 
 // $scope.payments = ConfirmationSrv.getPayments();  
 
 $scope.close =function()
 {
 	 $scope.showThankYou=false;
 }



  		
});
     

  

