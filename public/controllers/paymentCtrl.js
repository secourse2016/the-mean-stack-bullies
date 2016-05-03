app.controller('paymentCtrl', function($scope, $location,paySrv,chargeSrv) {
     /**
      * validating payment form
      */
      paySrv.getAmount(function(amount){
        $scope.amount=amount;
      });
      
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
		$scope.submitPaymentForm=function(stripeKey,cb) {
        
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

          /*publishable key is set here instead of setting it in core.js 
            to be able to reset it*/ 

           Stripe.setPublishableKey("pk_test_ULcStxFLM4quhm4JacResvRo"); 

            Stripe.card.createToken({
            number: $scope.CardN,
            cvc: $scope.CVV,
            exp_month: getMonthNumber($scope.expirymonth),
            exp_year: $scope.expiryyear
            
            }, stripeResponseHandler); 
              
            
} 
}

    stripeResponseHandler = function(status,response){ 
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

               console.log(response);
            var pa=[{
            visa:boolea,
            MasterCard: (!boolea),
            CardHolderName: $scope.holderN,
            CardHolderNo: $scope.CardN,
            Cvv: $scope.CVV,
            ExpiryDate: date
          }]; 
           
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