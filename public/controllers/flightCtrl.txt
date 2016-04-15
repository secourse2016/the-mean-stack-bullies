app.controller('flightCtrl', function($scope, flightSrv) {
console.log("in flight controller");
var flightData = [
{
destination:"CAI",
origin :"JED",
departureDateTime :new Date(),
arrivalDateTime :"17 APR 2016"
}];

  flightSrv.getFlights(flightData,function (returnedFlights)
   {
      $scope.arr = returnedFlights;
       console.log($scope.arr)
   });

});