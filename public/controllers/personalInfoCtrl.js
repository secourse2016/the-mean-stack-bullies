app.controller('personalInfoCtrl', function($scope, $location,personalInfoSrv) {

	$scope.submitpersonFrom=function() {
		        
        // var errMessage = paymentValidations();
        // if(errMessage){
        //   alert(errMessage);
        // }
        // else{
        //   var boolea=false;
        //   if($scope.radioButton=="visa"){
        //     boolea=true;
        //   }
        //   else{
        //     boolea=false;
        //   }
          // var date =$scope.expiryday+" "+$scope.expirymonth+" "+$scope.expiryyear;
          var person=[{
               firstName      : "Ahmed Ashraf",
     		   secondName    : "Nazyh",
    		   age            : 21,
    		   nationality    : "Egyptian",
      		   passportNumber: "A30014DE",
     		   issueDate      : "06 JAN 2013",
     		   expiryDate     : "05 JAN 2023"
          }];

          personalInfoSrv.insertPerson(person).then(
               function(result) {
                     if(result.data=="person added to the database"){
                        console.log(result.data);
                        $location.url('/pay');
                     }
                     else{
                      alert(result.data);
                     }
                }
          );
        }
});