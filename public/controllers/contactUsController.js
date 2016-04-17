<<<<<<< HEAD
app.controller('ContactUsController',function(){
	console.log("hereee");
=======
app.controller('ContactUsController',function($scope,contactUsSrv,$location){
	console.log("hereees");
	$scope.submitContactForm = function(){
		var newContactForm = [{
			 firstName : $scope.firstName,
			 lastName  : $scope.lastName,
			 email     : $scope.email,
			 message   : $scope.message
		}];
		console.log(newContactForm);
		contactUsSrv.submitContactUsFormToServer(newContactForm,function(err){
              if(err){
                 console.log(err);
              }else{

                $location.url('/');

              }
		});
	}
>>>>>>> b49124efd31e8a37bf4ed2ab8cdbb63150534eb6
}); 