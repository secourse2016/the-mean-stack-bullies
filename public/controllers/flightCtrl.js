app.controller('flightCtrl', function($scope, flightSrv) {
console.log("in flight controller");
var flightData = [
{
destination:"CAI",
origin :"JED",
departureDateTime :new Date(),
arrivalDateTime :"17 APR 2016"
}];

   $scope.arr =flightSrv.getFlights(flightData);

      
});