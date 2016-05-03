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

           var flightsFromOtherAirlines = flightSrv.getFlightsFromOtherAirlines();
           console.log("hereeee -->"+flightsFromOtherAirlines.length);
           var AllFlights = flightsFromOtherAirlines.concat(response.outFlights);
            $scope.outgoingFlights = AllFlights;
              $scope.newof=[];
             var newi=0;
             for(var ind=0;ind<$scope.outgoingFlights.length;ind+=2)
             {

             if($scope.outgoingFlights[ind]!= undefined && $scope.outgoingFlights[ind+1]!=undefined){

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

                "aircraftType":$scope.outgoingFlights[ind].aircraftType,
                "Airline":$scope.outgoingFlights[ind].Airline
              }
              newi++;
            }
            else if($scope.outgoingFlights[ind]== undefined && $scope.outgoingFlights[ind+1]!=undefined)
            {
                 $scope.newof[newi]={
                "e_id":0,
                "b_id":$scope.outgoingFlights[ind+1]._id,
                "origin":$scope.outgoingFlights[ind+1].origin,
                "eseats":0,
                "bseats":$scope.outgoingFlights[ind+1].seats,
                "departureDateTime":$scope.outgoingFlights[ind+1+1].departureDateTime,
                "ecost":0,
                "bcost":$scope.outgoingFlights[ind+1].cost,
                "destination":$scope.outgoingFlights[ind+1].destination,
                "arrivalDateTime":$scope.outgoingFlights[ind+1].arrivalDateTime,
                "currency":$scope.outgoingFlights[ind+1].currency,
                "flightNumber":$scope.outgoingFlights[ind+1].flightNumber,
                "aircraftType":$scope.outgoingFlights[ind+1].aircraftType,
                "Airline":$scope.outgoingFlights[ind+1].Airline
              }
              newi++;
            }
            else if($scope.outgoingFlights[ind]!= undefined && $scope.outgoingFlights[ind+1]==undefined)
            {
                $scope.newof[newi]={
                "e_id":$scope.outgoingFlights[ind]._id,
                "b_id":0,
                "origin":$scope.outgoingFlights[ind].origin,
                "eseats":$scope.outgoingFlights[ind].seats,
                "bseats":0,
                "departureDateTime":$scope.outgoingFlights[ind].departureDateTime,
                "ecost":$scope.outgoingFlights[ind].cost,
                "bcost":0,
                "destination":$scope.outgoingFlights[ind].destination,
                "arrivalDateTime":$scope.outgoingFlights[ind].arrivalDateTime,
                "currency":$scope.outgoingFlights[ind].currency,
                "flightNumber":$scope.outgoingFlights[ind].flightNumber,
                "aircraftType":$scope.outgoingFlights[ind].aircraftType,
                "Airline":$scope.outgoingFlights[ind].Airline
              }
              newi++;
            }
            else{
              $scope.newof[newi]={
                "e_id":0,
                "b_id":0,
                "origin":0,
                "eseats":0,
                "bseats":0,
                "departureDateTime":0,
                "ecost":0,
                "bcost":0,
                "destination":0,
                "arrivalDateTime":0,
                "currency":0,
                "flightNumber":0,
                "aircraftType":0,
                "Airline":0
              }
              newi++;
            }

             }

            
             
              
             
          }
            if(response.inFlights){

            var retunflightsFromOtherAirlines = flightSrv.getReturnFlightsFromOtherAirlines();
            console.log("hereee1--->"+retunflightsFromOtherAirlines.length);      
           var AllFlights = retunflightsFromOtherAirlines.concat(response.inFlights);
               $scope.returnedFlights =AllFlights;
             $scope.newof2=[];

           
             var newi=0;  
             for(var ind=0;ind<$scope.returnedFlights.length;ind+=2)
             {

              console.log($scope.returnedFlights[ind]);
              if($scope.returnedFlights[ind]!=undefined && $scope.returnedFlights[ind+1]!=undefined)
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

                "aircraftType":$scope.returnedFlights[ind].aircraftType,
                "Airline":$scope.returnedFlights[ind].Airline
              }
              newi++;
            }
            else if($scope.returnedFlights[ind]==undefined && $scope.returnedFlights[ind+1]!=undefined)
            {
              $scope.newof2[newi]={
                "e_id":0,
                "b_id":$scope.returnedFlights[ind+1]._id,
                "origin":$scope.returnedFlights[ind+1].origin,
                "eseats":0,
                "bseats":$scope.returnedFlights[ind+1].seats,
                "departureDateTime":$scope.returnedFlights[ind+1].departureDateTime,
                "ecost":0,
                "bcost":$scope.returnedFlights[ind+1].cost,
                "destination":$scope.returnedFlights[ind+1].destination,
                "arrivalDateTime":$scope.returnedFlights[ind+1].arrivalDateTime,
                "currency":$scope.returnedFlights[ind+1].currency,
                "flightNumber":$scope.returnedFlights[ind+1].flightNumber,
                "aircraftType":$scope.returnedFlights[ind+1].aircraftType,
                "Airline":$scope.returnedFlights[ind+1].Airline
              }
              newi++;
            }
            else if($scope.returnedFlights[ind]!=undefined && $scope.returnedFlights[ind+1]==undefined)
            {
             $scope.newof2[newi]={
                "e_id":$scope.returnedFlights[ind]._id,
                "b_id":0,
                "origin":$scope.returnedFlights[ind].origin,
                "eseats":$scope.returnedFlights[ind].seats,
                "bseats":0,
                "departureDateTime":$scope.returnedFlights[ind].departureDateTime,
                "ecost":$scope.returnedFlights[ind].cost,
                "bcost":0,
                "destination":$scope.returnedFlights[ind].destination,
                "arrivalDateTime":$scope.returnedFlights[ind].arrivalDateTime,
                "currency":$scope.returnedFlights[ind].currency,
                "flightNumber":$scope.returnedFlights[ind].flightNumber,
                "aircraftType":$scope.returnedFlights[ind].aircraftType,
                "Airline":$scope.returnedFlights[ind].Airline
              }
              newi++;
            }
            else if($scope.returnedFlights[ind]==undefined && $scope.returnedFlights[ind+1]==undefined)
            {
             $scope.newof2[newi]={
                "e_id":0,
                "b_id":0,
                "origin":0,
                "eseats":0,
                "bseats":0,
                "departureDateTime":0,
                "ecost":0,
                "bcost":0,
                "destination":0,
                "arrivalDateTime":0,
                "currency":0,
                "flightNumber":0,
                "aircraftType":0,
                "Airline":0
              }
              newi++;
            }


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


   $scope.viewFlight=function(number)
  {
    
    if(number==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
   $scope.viewFlight2=function(number,number2)
  {
    
    if(number==0 && number2==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  $scope.radioActionDest=function(id)
  {
      // console.log("dest");
      // console.log(id);
    inFlightID = id;
  }

});