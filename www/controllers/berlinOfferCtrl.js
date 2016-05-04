app.controller('berlinOfferCtrl', function($scope,$state) {
	
	$scope.next = function(){ 
      
       $state.go('arizonaOffer');
	} 

	$scope.prev = function(){

		$state.go('nepalOffer');
	} 

	
}); 

