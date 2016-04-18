app.controller('flightCtrl', function($scope,$location, flightSrv) {
console.log("in flight controller");
  $scope.outgoingFlights = [];
  $scope.returnedFlights = [];
   flightSrv.getFlights(function(response){
       if(response.err){
         alert("somthing went wrong please try again");
       }else{
         if(response.outFlights){
            //console.log("in booking controller "+response.outFlights[0].origin);
            $scope.outgoingFlights = response.outFlights;
          }
            if(response.inFlights){
              //console.log("in booking controller "+response.outFlights[0].origin);
               $scope.returnedFlights = response.inFlights;
            };
       }
   });
  
  $scope.Book=function()
  {
     $location.url('/passenger');
  }

});