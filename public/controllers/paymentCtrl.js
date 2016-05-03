app.controller('paymentCtrl', function($scope, $location,paySrv,chargeSrv,personalInfoSrv,flightSrv) {
     /**
      * validating payment form
      */
       var flightsFromOtherAirlinesTotalCost = 0;
       var inFlightData = flightSrv.getInFLightData();
       var outFlightData = flightSrv.getOutFLightData();
       var NumberOfPassengers = personalInfoSrv.getPersonArray().length;
       console.log(outFlightData);
       console.log(inFlightData);
       if(outFlightData != null && outFlightData.FlightCost !=null){
        console.log("here1");
        flightsFromOtherAirlinesTotalCost+= outFlightData.FlightCost*NumberOfPassengers;
       }

       if(inFlightData != null && inFlightData.FlightCost !=null){
        console.log("here2");
        flightsFromOtherAirlinesTotalCost+= inFlightData.FlightCost*NumberOfPassengers;

       }
        console.log(flightsFromOtherAirlinesTotalCost);
        paySrv.setamount(flightsFromOtherAirlinesTotalCost);
        $scope.amount = flightsFromOtherAirlinesTotalCost;
       if(outFlightData != null && outFlightData.FlightAirline=="AirFrance" || inFlightData != null&& inFlightData.FlightAirline =="AirFrance" ){
          paySrv.getAmount(function(amount){
          console.log(amount);
          paySrv.setamount(amount+flightsFromOtherAirlinesTotalCost);
          flightsFromOtherAirlinesTotalCost+=amount;
          $scope.amount = flightsFromOtherAirlinesTotalCost;
      });
       }
    
    
      
      function paymentValidations(){
        var isvalid =true;
        var errMessage = "";
         if($scope.holderN == null||!(/^[a-z ,.'-]+$/i.test($scope.holderN))){
          errMessage+="Please enter a valid card name \n";
          isvalid = false;
          }
         if($scope.CardN == null||!(/^[0-9]{16}$/.test($scope.CardN))){
           errMessage+="Please enter a valid card number \n";
           isvalid = false;
          }
         if(($scope.CVV == null)||!(/^[0-9]{3}$/.test($scope.CVV))){
           errMessage+="Please enter a valid CVV \n";
           isvalid =false;
          }
         if($scope.radioButton== null){
           errMessage+="Please choose either Visa or MasterCard \n";
           isvalid = false;
          } 

         if($scope.expiryyear== null){
           errMessage+="Please choose expiry year \n";
           isvalid =false;
          } 

         if($scope.expirymonth== null){
           errMessage+="Please choose choose expiry month \n";
           isvalid =false;
          }

         if(isvalid == true){
          errMessage = null;
         }
         return errMessage;
       }

       /**
        * payment form submitting function
        */
		$scope.submitPaymentForm=function() {
        
        var errMessage = paymentValidations();
        if(errMessage&&errMessage.length > 50){
          $scope.alertMe = "You entered invalid data!";
               $scope.payAlert = true;
               $scope.$apply();
        }


        if(errMessage&&errMessage.length < 50){
          $scope.alertMe =errMessage;
               $scope.payAlert = true;
               $scope.$apply();
        }
        else{
               
             if(outFlightData != null && outFlightData.FlightAirline!="AirFrance"){
                paySrv.getStripePublicKeyOfOtherAirline(outFlightData.FlightAirline,function(key){
                    console.log(key);
                    Stripe.setPublishableKey(key); 

                    Stripe.card.createToken({
                    number: $scope.CardN,
                    cvc: $scope.CVV,
                    exp_month: getMonthNumber($scope.expirymonth),
                    exp_year: $scope.expiryyear
                    
                    }, stripeResponseHandlerForOutgoingFlightsPayment); 


               //      if(inFlightData != null && inFlightData.FlightAirline !="AirFrance"){
               //   paySrv.getStripePublicKeyOfOtherAirline(inFlightData.FlightAirline,function(publickey){
                           
               //              console.log(publickey);
               //              Stripe.setPublishableKey('publickey'); 

               //              Stripe.card.createToken({
               //              number: $scope.CardN,
               //              cvc: $scope.CVV,
               //              exp_month: getMonthNumber($scope.expirymonth),
               //              exp_year: $scope.expiryyear
                            
               //              }, stripeResponseHandler); 
               //   });
               
               // }else{
               //   Stripe.setPublishableKey("pk_test_ULcStxFLM4quhm4JacResvRo"); 

               //              Stripe.card.createToken({
               //              number: $scope.CardN,
               //              cvc: $scope.CVV,
               //              exp_month: getMonthNumber($scope.expirymonth),
               //              exp_year: $scope.expiryyear
                            
               //              }, stripeResponseHandler); 
               // }
                });

               
               }else{
                console.log("heresss");
                 Stripe.setPublishableKey("pk_test_ULcStxFLM4quhm4JacResvRo"); 

                            Stripe.card.createToken({
                            number: $scope.CardN,
                            cvc: $scope.CVV,
                            exp_month: getMonthNumber($scope.expirymonth),
                            exp_year: $scope.expiryyear
                            
                            }, stripeResponseHandlerForOutgoingFlightsPayment); 
               }

               

            
              
            
} 
}

    stripeResponseHandlerForOutgoingFlightsPayment = function(status,response){ 
      console.log("DAAAMMIIT"); 
      $scope.payAlert = false;
            if(response.error){  
               $scope.alertMe =response.error.message;
               $scope.payAlert = true;
               $scope.$apply();
            } 

            else{   
            var boolea=false;
          if($scope.radioButton=="visa"){
            boolea=true;
          }
          else{
            boolea=false;
          }

          var date ="01 "+$scope.expirymonth+" "+$scope.expiryyear;

            var inFlightData = flightSrv.getInFLightData();
            var outFlightData = flightSrv.getOutFLightData();

            var pa=[{
                      visa:boolea,
                      MasterCard: (!boolea),
                      CardHolderName: $scope.holderN,
                      CardHolderNo: $scope.CardN,
                      Cvv: $scope.CVV,
                      ExpiryDate: date
                            }]; 
              paySrv.setPaymentData(pa);
            if(outFlightData != null &&outFlightData.FlightAirline!="AirFrance"){
              customizeBookingFromOtherAirlineRequestObject(outFlightData,response.id,function(returnedData){
                console.log(returnedData);
                console.log(inFlightData);
                paySrv.setOutgoingFlightBookingReferenceID(returnedData.refNum);
                 if(inFlightData.FlightAirline != null ){
                  if (inFlightData.FlightAirline !="AirFrance" && inFlightData.FlightAirline !=null){
              paySrv.getStripePublicKeyOfOtherAirline(inFlightData.FlightAirline,function(publickey){
                           
                            console.log(publickey);
                            Stripe.setPublishableKey(publickey); 

                            Stripe.card.createToken({
                            number: $scope.CardN,
                            cvc: $scope.CVV,
                            exp_month: getMonthNumber($scope.expirymonth),
                            exp_year: $scope.expiryyear
                            
                            }, stripeResponseHandlerForReturnFlightsPayment); 
                 });
                        }else{
                          console.log("in the else part ");
                            Stripe.setPublishableKey("pk_test_ULcStxFLM4quhm4JacResvRo"); 

                            Stripe.card.createToken({
                            number: $scope.CardN,
                            cvc: $scope.CVV,
                            exp_month: getMonthNumber($scope.expirymonth),
                            exp_year: $scope.expiryyear
                            
                            }, stripeResponseHandlerForReturnFlightsPayment); 
                         }
            }else{
              
              $location.url('/confirm');
            }
              });
            

            
                }else{
                        
                             
                      paySrv.insertPayment(response.id,pa,
                           function(flag) {
                                 if(flag == true){
                                    console.log("here in the payment controlller");
                                    $location.url('/confirm');
                                   }
                                   else{
                                    alert("something went wrong please try again");
                                   }
                });
             }
             


      
        
        }
      } 


      stripeResponseHandlerForReturnFlightsPayment = function(status,response){ 
      console.log("DAAAMMIIT"); 
      console.log(response.id);
      $scope.payAlert = false;
            if(response.error){  
               $scope.alertMe =response.error.message;
               $scope.payAlert = true;
               $scope.$apply();
            } 

            else{   
            var boolea=false;
          if($scope.radioButton=="visa"){
            boolea=true;
          }
          else{
            boolea=false;
          }

          var date ="01 "+$scope.expirymonth+" "+$scope.expiryyear;

            var inFlightData = flightSrv.getInFLightData();


            var pa=[{
                      visa:boolea,
                      MasterCard: (!boolea),
                      CardHolderName: $scope.holderN,
                      CardHolderNo: $scope.CardN,
                      Cvv: $scope.CVV,
                      ExpiryDate: date
                            }]; 
              paySrv.setPaymentData(pa);
            
         
            if(inFlightData != null &&inFlightData.FlightAirline!="AirFrance"){

            customizeBookingFromOtherAirlineRequestObject(inFlightData,response.id,function(returnedData){
                console.log(returnedData);
               paySrv.setReturnFlightBookingReferenceID(returnedData.refNum);
                    $location.url('/confirm');
            });
            }else{    
                        console.log(response.id);
                      paySrv.insertPayment(response.id,pa,
                           function(flag) {
                                 if(flag == true){
                                    console.log("here in the payment controlller");
                                    $location.url('/confirm');
                                   }
                                   else{
                                    alert("something went wrong please try again");
                                   }
                });
            }
                        
                             
              
             }
        
        }
       
   

   customizeBookingFromOtherAirlineRequestObject = function(flightData,paymentToken,cb){
      var personArray = personalInfoSrv.getPersonArray();
      var passengerDetails = [];
      for(var i=0;i<personArray.length;i++){
        var person = {
        firstName: personArray[i].firstName, 
        lastName: personArray[i].secondName, 
        passportNum: personArray[i].passportNumber,
        passportExpiryDate: personArray[i].expiryDate.getTime(), 
        dateOfBirth: new Date().getTime(), 
        nationality: personArray[i].nationality, 
        email: "hatemmorgan17@gmail.com" 
         }
       passengerDetails.push(person);  
      }

      FlightDatareqData = {
      passengerDetails:passengerDetails,
      class:flightData.FlightClass,
      cost:flightData.FlightCost,
      outgoingFlightId:flightData.FlightID,
      returnFlightId:null,
      paymentToken:paymentToken
     };
   
     
      
  

     paySrv.sendBookingToOtherAirline(FlightDatareqData,flightData.FlightAirline,function(response){
      console.log("in customizeBookingFromOtherAirlineRequestObject method");
      console.log(response);
      cb(response);
  
      
     });
    }

    getMonthNumber = function(month){ 
         
         switch(month){ 
            
            case "JAN" : return 01;
            case "FEB" : return 02;
            case "MAR" : return 03; 
            case "APR" : return 04;
            case "MAY" : return 05;
            case "JUN" : return 06; 
            case "JUL" : return 07; 
            case "AUG" : return 08;
            case "SEP" : return 09; 
            case "OCT" : return 10; 
            case "NOV" : return 11; 
            case "DEC" : return 12;


           }

    }

});