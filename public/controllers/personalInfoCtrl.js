app.controller('personalInfoCtrl', function($scope, $location,personalInfoSrv) {

	function presonValidations(){
        var isvalid =true;
        var errMessage = "";
         if($scope.firstName == null||!(/^[a-z ,.'-]+$/i.test($scope.firstName))){
          errMessage+="please enter a valid First name \n";
          isvalid = false;
          }
         if($scope.lastName == null||!(/^[a-z ,.'-]+$/i.test($scope.lastName))){
          errMessage+="please enter a valid Last name \n";
          isvalid = false;
          }
          if($scope.Nationality == null||!(/^[a-z ,.'-]+$/i.test($scope.Nationality))){
          errMessage+="please enter a valid Nationality \n";
          isvalid = false;
          }
         if(($scope.age == null)||!(/^[0-9]{2}$/.test($scope.age ))){
           errMessage+="please enter a valid age \n";
           isvalid =false;
          }
         if($scope.passportnum == null||!(/^[0-9]{8}$/.test($scope.passportnum))){
          errMessage+="please enter a valid Passport Number \n";
          isvalid = false;
          }
         if($scope.issueDate== null){
           errMessage+="please choose the issue date \n";
           isvalid =false;
          } 
         if($scope.expiryDate== null){
           errMessage+="please choose choose expiry date \n";
           isvalid =false;
          }
         if(isvalid == true){
          errMessage = null;
         }
         return errMessage;
    }




	$scope.submitpersonFrom=function() {
		        
        var errMessage = presonValidations();
        if(errMessage){
          alert(errMessage);
        }
        else{
          
          var person=[{
               firstName      : $scope.firstName,
     		       secondName    : $scope.lastName,
    		   age            : $scope.age,
    		   nationality    : $scope.Nationality,
      		   passportNumber: $scope.passportnum,
     		   issueDate      : $scope.issueDate,
     		   expiryDate     : $scope.expiryDate
          }];
          
          personalInfoSrv.insertPerson(person,function(result){
            if(result=="person added to the session"){
                        console.log(result);
                        $location.url('/pay');
                     }
                     else{
                      alert("An error occured please try again");
                     }
          });
           
        }
    }
});