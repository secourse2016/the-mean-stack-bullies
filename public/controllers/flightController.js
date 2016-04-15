app.controller('flightCtrl', function($scope, flightSrv) {
console.log("in flight controller");
var flightData = [
{
destination:"CAI",
origin :"JED",
departureDateTime :new Date()
}];

  flightSrv.getFlights(flightData,function (returnedFlights)
   {


      for (var i =0;i<returnedFlights.length;i++)
      {
        var date = new Date(   returnedFlights[i].departureDateTime );
        returnedFlights[i].departureDateTime =  date.getDate() + "/" + date.getMonth() +"/" 
        + date.getFullYear() + " " + date.getHours() + ":" +date.getMinutes();

          date = new Date(   returnedFlights[i].arrivalDateTime );
        returnedFlights[i].arrivalDateTime =  date.getDate() + "/" + date.getMonth() +"/" 
        + date.getFullYear() + " " + date.getHours() + ":" +date.getMinutes();
    
      }
            $scope.arr = returnedFlights;
   });

});