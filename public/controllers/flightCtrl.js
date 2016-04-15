app.controller('flightCtrl', function($scope, flightSrv) {
console.log("in flight controller");
var flightData = [
{
destination:"JED",
origin :"CAI",
departureDateTime :"17 APR 2016",
arrivalDateTime :"17 APR 2016"
}];

   $scope.arr =flightSrv.getFlights(flightData);

      
});