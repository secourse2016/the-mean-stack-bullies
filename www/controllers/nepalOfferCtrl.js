app.controller('nepalOfferCtrl', function($scope,$state) { 

	$scope.next = function(){ 
     
     $state.go('berlinOffer');
 
	} 

	$scope.prev = function(){

     $state.go('arizonaOffer');

	} 


});