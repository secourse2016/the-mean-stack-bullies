app.controller('paymentCtrl', function($scope, $location,paySrv) {
     /**
      * validating payment form
      */
      function paymentValidations(){
        var isvalid =true;
        var errMessage = "";
         if($scope.holderN == null||!(/^[a-z ,.'-]+$/i.test($scope.holderN))){
          errMessage+="please enter a valid card name \n";
          isvalid = false;
          }
         if($scope.CardN == null||!(/^[0-9]{16}$/.test($scope.CardN))){
           errMessage+="please enter a valid card number \n";
           isvalid = false;
          }
         if(($scope.CVV == null)||!(/^[0-9]{3}$/.test($scope.CVV ))){
           errMessage+="please enter a valid CVV \n";
           isvalid =false;
          }
         if($scope.radioButton== null){
           errMessage+="please choose either Visa or MasterCard \n";
           isvalid = false;
          } 

         if($scope.expiryyear== null){
           errMessage+="please choose expiry year \n";
           isvalid =false;
          } 

         if($scope.expirymonth== null){
           errMessage+="please choose choose expiry month \n";
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
        if(errMessage){
          alert(errMessage);
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
            
             

            Stripe.card.createToken({
            number: $scope.CardN,
            cvc: $scope.CVV,
            exp_month: getMonthNumber($scope.expirymonth),
            exp_year: $scope.expiryyear
            
            }, stripeResponseHandler); 
              
            var pa=[{
            visa:boolea,
            MasterCard: (!boolea),
            CardHolderName: $scope.holderN,
            CardHolderNo: $scope.CardN,
            Cvv: $scope.CVV,
            ExpiryDate: date
          }]; 


          paySrv.insertPayment(pa,
               function(flag) {
                     if(flag == true){
                        
                        $location.url('/confirm');
                     }
                     else{
                      alert("something went wrong please try again");
                     }
                }
          );
        }
      } 
    
    stripeResponseHandler = function(status,response){
            if(response.error){ 
               console.log(response);
               console.log("STRIPE ERRR");
            } 

            else{ 

               console.log(response);
              paySrv.tokenizePayment(response.id, function(status){ 
                  if(status=="OK"){ 
                     
                     console.log("PASSED FRONT END STRIPE");

                  } 
                  else{ 

                        alert("WRONG");
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