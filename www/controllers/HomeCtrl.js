app.controller('HomeCtrl', function($scope, $location,$state) {

console.log("HOME");
$scope.bookFlight = function()
{
	$state.go('payment');
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
	$state.go('payment');
}

$scope.about = function()
{
	$state.go('payment');
}

$scope.offers = function()
{
	$state.go('payment');
}

 



});