app.controller('ContactUsController',function($scope,contactUsSrv){
	$scope.submitContactForm = function(){
		var newContactForm = {
			 firstName : $scope.firstName,
			 lastName  : $scope.lastName,
			 email     : $scope.email,
			 message   : $scope.message
		};
		contactUsSrv.submitContactUsFormToServer(newContactForm,function(err){
              if(err){

              }else{
              	
              }
		});
	}
}); 