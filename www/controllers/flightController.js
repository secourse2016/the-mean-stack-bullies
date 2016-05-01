var app = angular.module('myApp', []);
  app.controller('flightCtrl', function($scope,$location, flightSrv) {
console.log("in flight controller");
  $scope.outgoingFlights = [];
  $scope.returnedFlights = [];
  $scope.newof=[];
  $scope.newof2=[];
  $scope.show=false;
  
  var inFlightID = null ;
  var outFlightID = null ;

   flightSrv.getFlights(function(response){
       if(response.err){
         alert("somthing went wrong please try again");
       }else{
         if(response.outFlights ){
            //console.log("in booking controller "+response.outFlights[0].origin);
            $scope.outgoingFlights = response.outFlights;
              $scope.newof=[];
            console.log($scope.outgoingFlights);
             var newi=0;
             for(var ind=0;ind<$scope.outgoingFlights.length;ind+=2)
             {
              $scope.newof[newi]={
                "e_id":$scope.outgoingFlights[ind]._id,
                "b_id":$scope.outgoingFlights[ind+1]._id,
                "origin":$scope.outgoingFlights[ind].origin,
                "eseats":$scope.outgoingFlights[ind].seats,
                "bseats":$scope.outgoingFlights[ind+1].seats,
                "departureDateTime":$scope.outgoingFlights[ind].departureDateTime,
                "ecost":$scope.outgoingFlights[ind].cost,
                "bcost":$scope.outgoingFlights[ind+1].cost,
                "destination":$scope.outgoingFlights[ind].destination,
                "arrivalDateTime":$scope.outgoingFlights[ind].arrivalDateTime,
                "currency":$scope.outgoingFlights[ind].currency,
                "flightNumber":$scope.outgoingFlights[ind].flightNumber,
                "aircraftType":$scope.outgoingFlights[ind].aircraftType
              }
              newi++;
             }
              console.log($scope.newof);
            
             
              
             
          }
            if(response.inFlights){
              //console.log("in booking controller "+response.outFlights[0].origin);
               $scope.returnedFlights = response.inFlights;
                 $scope.newof2=[];
           
             var newi=0;  
             for(var ind=0;ind<$scope.returnedFlights.length;ind+=2)
             {
              $scope.newof2[newi]={
                "e_id":$scope.returnedFlights[ind]._id,
                "b_id":$scope.returnedFlights[ind+1]._id,
                "origin":$scope.returnedFlights[ind].origin,
                "eseats":$scope.returnedFlights[ind].seats,
                "bseats":$scope.returnedFlights[ind+1].seats,
                "departureDateTime":$scope.returnedFlights[ind].departureDateTime,
                "ecost":$scope.returnedFlights[ind].cost,
                "bcost":$scope.returnedFlights[ind+1].cost,
                "destination":$scope.returnedFlights[ind].destination,
                "arrivalDateTime":$scope.returnedFlights[ind].arrivalDateTime,
                "currency":$scope.returnedFlights[ind].currency,
                "flightNumber":$scope.returnedFlights[ind].flightNumber,
                "aircraftType":$scope.returnedFlights[ind].aircraftType
              }
              newi++;
             }
             $scope.show=true;
            };
       }
   });
  
  $scope.Book=function()
  {    
    console.log(inFlightID+"  "+outFlightID);
       if(!inFlightID && !outFlightID){
        alert("you have to choose a flight");
       }else{
          if(inFlightID && outFlightID || outFlightID){
            console.log("hereeeee");
            flightSrv.insertFlight(inFlightID,outFlightID,function(err){
                if(err){
                  alert(err);
                }else{
                  $location.url('/passenger');
                }
            });
          }

         
       }
    
  }

  $scope.radioActionOrigin=function(id)
  {
      // console.log("origin");
      // console.log(id);
      outFlightID = id;
  }
  $scope.radioActionDest=function(id)
  {
      // console.log("dest");
      // console.log(id);
    inFlightID = id;
  }
    $ionicPopover.fromTemplateUrl('../partials/details.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {  
   $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
 // Perform Action on destroy
   $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Perform action on hide popover
  $scope.$on('popover.hidden', function() {
    // Perform action
  });
  // Perform action on remove popover
  $scope.$on('popover.removed', function() {
    // Perform action
  });

});