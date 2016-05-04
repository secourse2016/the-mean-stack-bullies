app.controller('HomeCtrl', function($scope, $location,$state,HomeSrv) {

console.log("HOME");
$scope.bookFlight = function()
{

	$state.go('book');
}
$scope.timeTable = function()
{
	$state.go('timetable');
}

$scope.manageBooking = function()
{
	$state.go('reservation');
}

$scope.statistics = function()
{
	$state.go('passenger');
}

$scope.about = function()
{
	$state.go('about');
}

$scope.payment = function()
{
	$state.go('payment');
} 
$scope.offers =function()
{ 
     $state.go('berlinOffer');
}
HomeSrv.test("Home From Srv");

 



});

app.factory('HomeSrv',function ($http){ 
    return{
         test:function(text){
              console.log(text);
         }
    }
}); 