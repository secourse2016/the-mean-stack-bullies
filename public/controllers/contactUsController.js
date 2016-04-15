app.controller('ContactUsController',function($scope){
	$scope.submitContactForm = function(){
		var newContactForm = {
			 firstName : $scope.firstName,
			 lastName  : $scope.lastName,
			 email     : $scope.email,
			 message   : $scope.message
		};
	}
}); 