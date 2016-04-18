app.controller('flightCtrl', function($scope,$location, flightSrv) {
console.log("in flight controller");
// var flightData = [
// {
// destination:"CAI",
// origin :"JED",
// departureDateTime :new Date()
// }];
   flightSrv.getOutgoingFlights(function(outFlights){
    console.log("outFlight Controller "+outFlights);
    $scope.outgoingFlights = outFlights;
     flightSrv.getIngoingFlights(function(inFlights){
     console.log("inFlight Controller "+inFlights);
     $scope.returnedFlights = inFlights;

     });
     
   });
  // flightSrv.getFlights(flightData,function (returnedFlights)
  //  {


  //     for (var i =0;i<returnedFlights.length;i++)
  //     {
  //       var date = new Date(   returnedFlights[i].departureDateTime );
  //       returnedFlights[i].departureDateTime =  date.getDate() + "/" + date.getMonth() +"/" 
  //       + date.getFullYear() + " " + date.getHours() + ":" +date.getMinutes();

  //         date = new Date(   returnedFlights[i].arrivalDateTime );
  //       returnedFlights[i].arrivalDateTime =  date.getDate() + "/" + date.getMonth() +"/" 
  //       + date.getFullYear() + " " + date.getHours() + ":" +date.getMinutes();
    
  //     }
  //           $scope.arr = returnedFlights;
  //  });

    $scope.Book=function()
  {
     $location.url('/passenger');
  }

});