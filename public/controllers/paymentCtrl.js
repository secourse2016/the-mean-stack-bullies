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
<<<<<<< HEAD
     		var errMessage = paymentValidations();
=======
        
        var errMessage = paymentValidations();
>>>>>>> b49124efd31e8a37bf4ed2ab8cdbb63150534eb6
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
<<<<<<< HEAD
          var date =$scope.expiryday+" "+$scope.expirymonth+" "+$scope.expiryyear;
          console.log(date);
          var pa=[{
       			visa:boolea,
        		MasterCard: (!boolea),
       			CardHolderName: $scope.holderN,
        		CardHolderNo: $scope.CardN,
       			Cvv: $scope.CVV,
        		ExpiryDate: date
       		}];
       		paySrv.insertPayment(pa);
    		}
  		}
=======

          var date ="01 "+$scope.expirymonth+" "+$scope.expiryyear;

          var pa=[{
            visa:boolea,
            MasterCard: (!boolea),
            CardHolderName: $scope.holderN,
            CardHolderNo: $scope.CardN,
            Cvv: $scope.CVV,
            ExpiryDate: date
          }];

          paySrv.insertPayment(pa).then(
               function(result) {
                     if(result.data=="payment added to the database"){
                        
                        $location.url('/confirm');
                     }
                     else{
                      alert(result.data);
                     }
                }
          );
        }
      }
>>>>>>> b49124efd31e8a37bf4ed2ab8cdbb63150534eb6
});