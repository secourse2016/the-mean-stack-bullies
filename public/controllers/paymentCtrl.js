app.controller('paymentCtrl', function($scope, $location,paySrv) {
     
		$scope.submitPaymentForm=function() {
     		
        if($scope.holderN == null||!(/^[a-z ,.'-]+$/i.test($scope.holderN))){
          alert("please enter a valid card name");
        }else if($scope.CardN == null||!(/^[0-9]{16}$/.test($scope.CardN))){
           alert("please enter a valid card number");

        }else if(($scope.CVV == null)||!(/^[0-9]{3}$/.test($scope.CVV ))){
           alert("please enter a valid CVV");

        }else if($scope.radioButton== null){
           alert("please choose either Visa or MasterCard");

        }else if($scope.expiryyear== null){
           alert("please choose expiry year");

        }else if($scope.expirymonth== null){
           alert("please choose choose expiry month");

        }else if($scope.expiryday== null){
           alert("please choose choose expiry day");

        }
        else{
          var boolea=false;
          if($scope.radioButton=="visa"){
            boolea=true;
          }
          else{
            boolea=false;
          }
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
});