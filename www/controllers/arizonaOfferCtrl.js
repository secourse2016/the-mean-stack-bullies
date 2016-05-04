app.controller('arizonaOfferCtrl', function($scope,$state) {
	
$scope.next = function(){ 

  $state.go('nepalOffer');

} 

$scope.prev = function(){ 

 $state.go('berlinOffer');

}

}); 

