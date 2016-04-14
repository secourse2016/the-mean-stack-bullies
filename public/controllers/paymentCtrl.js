app.controller('paymentCtrl', function($scope, $location,paySrv) {
		$scope.clicktest=function() {
     		var pa=[{
     			visa:true,
      			MasterCard: false,
     			CardHolderName: "Aly Ameeeeeen",
      			CardHolderNo: 13552354567467,
     			Cvv: 321,
      			ExpiryDate: "06 JAN 2017"
     		}];
     		paySrv.insertPayment(pa);
     		console.log("kiko");
  		}
  		
});