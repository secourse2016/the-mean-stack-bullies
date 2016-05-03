app.controller('flightCtrl', function($scope,$location, flightSrv) {
console.log("in flight controller");
  $scope.outgoingFlights = [];
  $scope.returnedFlights = [];
  $scope.newof=[];
  $scope.newof2=[];
  $scope.show=false;

  $scope.startindex=0;
  $scope.endindex=2;

  $scope.airlines=[
      {
        name:"AirFrance",
        class:""
      },
      {
        name:"SwissAir",
        class:""
      },
      {
        name:"EgyptAir",
        class:""
      },
      {
        name:"Lufthansa",
        class:""
      },
      {
        name:"Alitalia",
        class:""
      },
      {
        name:"Olympic",
        class:""
      },
      {
        name:"birdsAirways",
        class:""
      },
      {
        name:"BritishAirways",
        class:""
      }
  ];
  
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
             $scope.arr1=[];
             var ind=0;
             for(ind=0;ind<$scope.newof.length;ind++){
                 $scope.arr1[ind]=$scope.newof[ind]; 
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
             $scope.arr2=[];
             ind=0;
             for(ind=0;ind<$scope.newof2.length;ind++){
                 $scope.arr2[ind]=$scope.newof2[ind]; 
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
  $scope.nextAirline=function(){
     if($scope.endindex==$scope.airlines.length-1){
        alert("no next airlines");
      }
      else{
          $scope.startindex=$scope.startindex+3;
           $scope.endindex=$scope.endindex+3;
           if($scope.endindex>$scope.airlines.length-1){
                $scope.startindex=$scope.airlines.length-4;
                $scope.endindex=$scope.airlines.length-1;
           }
          $scope.arr1=[];
           var ind=0;
           for(ind=0;ind<$scope.newof.length;ind++){
                console.log("hoba");
               $scope.arr1[ind]=$scope.newof[ind]; 
               console.log( $scope.arr1[ind]);
           }


           $scope.arr2=[];
           ind=0;
           for(ind=0;ind<$scope.newof2.length;ind++){
               console.log("hoba2");
               $scope.arr2[ind]=$scope.newof2[ind];
               console.log( $scope.arr2[ind]); 
           }
           // $scope.arr1=$scope.newof;
           // $scope.arr2=$scope.newof2;
            console.log("new of ");
       console.log($scope.newof);
       console.log("new of 2 ");
       console.log($scope.newof2);
       console.log("arr1 ");
       console.log($scope.arr1);
       console.log("arr2 ");
       console.log($scope.arr2);

           var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+2].name)){
                  $scope.arr1.splice(i,1);
                  i--;
              }
            }
            i=0;
            for(i=0;i<$scope.arr2.length;i++){
              if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+2].name)){
                  $scope.arr2.splice(i,1);
                  i--;
              }
            }

      }
     


  }
  $scope.previousAirline=function(){
      if($scope.startindex==0){
        alert("no previous airlines");
      }
      else{
       $scope.startindex=$scope.startindex-3;
       $scope.endindex=$scope.endindex-3;
       if($scope.startindex<0){
            $scope.startindex=0;
            $scope.endindex=2;
       }
       $scope.arr1=[];
       var ind=0;
       for(ind=0;ind<$scope.newof.length;ind++){
           $scope.arr1[ind]=$scope.newof[ind]; 
           console.log( $scope.arr1[ind]); 
       }




       $scope.arr2=[];
       ind=0;
       for(ind=0;ind<$scope.newof2.length;ind++){
           $scope.arr2[ind]=$scope.newof2[ind];
           console.log( $scope.arr2[ind]);  
       }


            var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+2].name)){          
                  $scope.arr1.splice(i,1);
                  i--;
              }
            }
            i=0;
            for(i=0;i<$scope.arr2.length;i++){
              if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+2].name)){
                  $scope.arr2.splice(i,1);
                  i--;
              }
            }
     } 
  }

});