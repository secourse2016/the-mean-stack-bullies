app.controller('myCtrl', function($scope) {
  $scope.showMe=false;
  $scope.showPay=false;
  $scope.showTag=false;
  
  
  $scope.click1= function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/bookingForm.html"
  }
   $scope.click2= function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/booking2.html"

  }
  $scope.click3=function()
  {
  	$scope.showMe=true;
    $scope.include="../partials/checkreservation.html"

  }


   $scope.click4= function()
  {
    $scope.showMe=true;
    $scope.showBooking=false;
    $scope.showManage=false;
    $scope.showBooking2=false;
    $scope.showBooking3=true;
    console.log("hiiiiiiiiiiiiiitag");

  }
   $scope.click5= function()
  {
    $scope.showPay=true;
   
    
  }
  $scope.tag=function()
  {
    $scope.showTag=true;

  }
    
   $scope.close= function()
  {
  	$scope.showMe=false;
  }
});