<<<<<<< HEAD
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
=======

  app.controller('flightCtrl', function($scope,$location, flightSrv,ConfirmationSrv) {
    console.log("in flight controller");
    $scope.outgoingFlights = [];
    $scope.returnedFlights = [];
    $scope.newof=[];
    $scope.newof2=[];
    $scope.show=false;

     $scope.startindex=0;
  $scope.endindex=1;

  $scope.airlines=[];
    $scope.airlinesTemp=[];
    
    var inFlightID = null ;
    var outFlightID = null ;

    var outFlightAirline = null;
    var inFlightAirline = null;

    var outFlightClass = null;
    var inFlightClass = null;

    var inFlightCost = null;
    var outFlightCost=null;

 console.log("OUT");
    flightSrv.getFlights(function(response){
     console.log("ALL");
     if(response.err){
       alert("somthing went wrong please try again");
     }
     else
     {
      console.log("INSIDE ELSE");

      if(response.outFlights ){
        console.log("INSIDE CONDITION");
              //console.log("in booking controller "+response.outFlights[0].origin);
              var flightsFromOtherAirlines = flightSrv.getFlightsFromOtherAirlines();
              console.log("hereeee -->"+flightsFromOtherAirlines.length);
              var AllFlights = flightsFromOtherAirlines.concat(response.outFlights);
              $scope.outgoingFlights = AllFlights;
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
              $scope.newof=[];
              var newi=0;
              console.log("new");
              console.log($scope.outgoingFlights);

              for(var ind=0;ind<$scope.outgoingFlights.length;ind++)
              {
               
               if(ind==(($scope.outgoingFlights.length)-1))
               {
                 if($scope.outgoingFlights[ind].class=="economy")
                 {
                   $scope.newof[newi]={
                    "e_id":$scope.outgoingFlights[ind]._id ||$scope.outgoingFlights[ind].flightId,
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
                    "Airline":$scope.outgoingFlights[ind].Airline,
                    "e_class": $scope.outgoingFlights[ind].class,
                    "b_class":0
                  }
                  newi++;

                }
                else
                {

                 $scope.newof[newi]={
                  "e_id":0,
                  "b_id":$scope.outgoingFlights[ind]._id ||$scope.outgoingFlights[ind].flightId,
                  "origin":$scope.outgoingFlights[ind].origin,
                  "eseats":0,
                  "bseats":$scope.outgoingFlights[ind].seats,
                  "departureDateTime":$scope.outgoingFlights[ind].departureDateTime,
                  "ecost":0,
                  "bcost":$scope.outgoingFlights[ind].cost,
                  "destination":$scope.outgoingFlights[ind].destination,
                  "arrivalDateTime":$scope.outgoingFlights[ind].arrivalDateTime,
                  "currency":$scope.outgoingFlights[ind].currency,
                  "flightNumber":$scope.outgoingFlights[ind].flightNumber,
                  "aircraftType":$scope.outgoingFlights[ind].aircraftType,
                  "Airline":$scope.outgoingFlights[ind].Airline,
                  "e_class": 0,
                  "b_class":$scope.outgoingFlights[ind].class
                }
                newi++;

              }

            } 
            else{


<<<<<<< HEAD
             if($scope.outgoingFlights[ind]!= undefined && $scope.outgoingFlights[ind+1]!=undefined){

=======

             if($scope.outgoingFlights[ind].Airline==$scope.outgoingFlights[ind+1].Airline)
             {
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
              $scope.newof[newi]={
                "e_id":$scope.outgoingFlights[ind]._id ||$scope.outgoingFlights[ind].flightId,
                "b_id":$scope.outgoingFlights[ind+1]._id||$scope.outgoingFlights[ind+1].flightId,
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
                "Airline":$scope.outgoingFlights[ind].Airline,
                "e_class": $scope.outgoingFlights[ind].class,
                "b_class":$scope.outgoingFlights[ind+1].class
              }
              newi++;
              ind++;
            }
            else
            {
              if($scope.outgoingFlights[ind].class=="economy")
              {
                $scope.newof[newi]={
                  "e_id":$scope.outgoingFlights[ind]._id||$scope.outgoingFlights[ind].flightId,
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
                  "Airline":$scope.outgoingFlights[ind].Airline,
                  "e_class": $scope.outgoingFlights[ind].class,
                  "b_class":0
                }
                newi++;

              }
              else
              {


               $scope.newof[newi]={
                "e_id":0,
                "b_id":$scope.outgoingFlights[ind]._id||$scope.outgoingFlights[ind].flightId,
                "origin":$scope.outgoingFlights[ind].origin,
                "eseats":0,
                "bseats":$scope.outgoingFlights[ind].seats,
                "departureDateTime":$scope.outgoingFlights[ind].departureDateTime,
                "ecost":0,
                "bcost":$scope.outgoingFlights[ind].cost,
                "destination":$scope.outgoingFlights[ind].destination,
                "arrivalDateTime":$scope.outgoingFlights[ind].arrivalDateTime,
                "currency":$scope.outgoingFlights[ind].currency,
                "flightNumber":$scope.outgoingFlights[ind].flightNumber,
                "aircraftType":$scope.outgoingFlights[ind].aircraftType,
                "Airline":$scope.outgoingFlights[ind].Airline,
                "e_class": 0,
                "b_class":$scope.outgoingFlights[ind].class
              }
              newi++;


            }

<<<<<<< HEAD
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
=======

          }





        } 
      }
             $scope.arr1=[];
             var ind=0;
             for(ind=0;ind<$scope.newof.length;ind++){
                 $scope.arr1[ind]=$scope.newof[ind]; 
                 var airlinetobe={
                    name:$scope.newof[ind].Airline,
                    class:""
                  }
                  $scope.airlinesTemp[ind]=airlinetobe;
             }
             ind=0;
             for(ind=0;ind<$scope.airlinesTemp.length;ind++){
                  var j=0;
                  var bool=0;
                  for(j=0;j<$scope.airlines.length;j++){
                    if($scope.airlines[j].name==$scope.airlinesTemp[ind].name){
                      bool=1;
                      break;
                    }
                  }
                  if(bool==0){
                    $scope.airlines.push($scope.airlinesTemp[ind]);
                  }
             }


             var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr1.splice(i,1);
                  i--;
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
              }
            }
            if($scope.arr2){
              i=0;
              for(i=0;i<$scope.arr2.length;i++){
                if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                    $scope.arr2.splice(i,1);
                    i--;
                }
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

    for(var ind=0;ind<$scope.returnedFlights.length;ind++)
    {
      if(ind==( ($scope.returnedFlights.length)-1) )
      {

        if($scope.returnedFlights[ind].class=="economy")
        {
          $scope.newof2[newi]={
            "e_id":$scope.returnedFlights[ind]._id||$scope.returnedFlights[ind].flightId,
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
            "Airline":$scope.returnedFlights[ind].Airline,
            "e_class": $scope.returnedFlights[ind].class,
            "b_class":0
          }
          newi++;

        }
        else
        {

         $scope.newof2[newi]={
          "e_id":0,
          "b_id":$scope.returnedFlights[ind]._id||$scope.returnedFlights[ind].flightId,
          "origin":$scope.returnedFlights[ind].origin,
          "eseats":0,
          "bseats":$scope.returnedFlights[ind].seats,
          "departureDateTime":$scope.returnedFlights[ind].departureDateTime,
          "ecost":0,
          "bcost":$scope.returnedFlights[ind].cost,
          "destination":$scope.returnedFlights[ind].destination,
          "arrivalDateTime":$scope.returnedFlights[ind].arrivalDateTime,
          "currency":$scope.returnedFlights[ind].currency,
          "flightNumber":$scope.returnedFlights[ind].flightNumber,
          "aircraftType":$scope.returnedFlights[ind].aircraftType,
          "Airline":$scope.returnedFlights[ind].Airline,
          "e_class": 0,
          "b_class":$scope.returnedFlights[ind].class
        }
        newi++;

      }





    }
    else
    {
      if($scope.returnedFlights[ind].Airline==$scope.returnedFlights[ind+1].Airline)
      {
        $scope.newof2[newi]={
          "e_id":$scope.returnedFlights[ind]._id||$scope.returnedFlights[ind].flightId,
          "b_id":$scope.returnedFlights[ind+1]._id||$scope.returnedFlights[ind+1].flightId,
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
          "Airline":$scope.returnedFlights[ind].Airline,
          "e_class": $scope.returnedFlights[ind].class,
          "b_class":$scope.returnedFlights[ind+1].class
        }
        newi++;
        ind++;
      }
      else
      {
        if($scope.returnedFlights[ind].class=="economy")
        {
          $scope.newof2[newi]={
            "e_id":$scope.returnedFlights[ind]._id||$scope.returnedFlights[ind].flightId,
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
            "Airline":$scope.returnedFlights[ind].Airline,
            "e_class": $scope.returnedFlights[ind].class,
            "b_class":0
          }
          newi++;

        }
        else
        {

         $scope.newof2[newi]={
          "e_id":0,
          "b_id":$scope.returnedFlights[ind]._id||$scope.returnedFlights[ind].flightId,
          "origin":$scope.returnedFlights[ind].origin,
          "eseats":0,
          "bseats":$scope.returnedFlights[ind].seats,
          "departureDateTime":$scope.returnedFlights[ind].departureDateTime,
          "ecost":0,
          "bcost":$scope.returnedFlights[ind].cost,
          "destination":$scope.returnedFlights[ind].destination,
          "arrivalDateTime":$scope.returnedFlights[ind].arrivalDateTime,
          "currency":$scope.returnedFlights[ind].currency,
          "flightNumber":$scope.returnedFlights[ind].flightNumber,
          "aircraftType":$scope.returnedFlights[ind].aircraftType,
          "Airline":$scope.returnedFlights[ind].Airline,
          "e_class": 0,
          "b_class":$scope.returnedFlights[ind].class
        }
        newi++;

      }



    }


  }

                //-----------------------------------------------------
                // console.log($scope.returnedFlights[ind]
               }
             $scope.arr2=[];
             ind=0;
             for(ind=0;ind<$scope.newof2.length;ind++){
                 $scope.arr2[ind]=$scope.newof2[ind];
                 var airlinetobe={
                    name:$scope.newof[ind].Airline,
                    class:""
                  }
                  $scope.airlinesTemp[ind]=airlinetobe; 
             }
             ind=0;
             for(ind=0;ind<$scope.airlinesTemp.length;ind++){
                  var j=0;
                  var bool=0;
                  for(j=0;j<$scope.airlines.length;j++){
                    if($scope.airlines[j].name==$scope.airlinesTemp[ind].name){
                      bool=1;
                      break;
                    }
                  }
                  if(bool==0){
                    $scope.airlines.push($scope.airlinesTemp[ind]);
                  }
             }

             var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr1.splice(i,1);
                  i--;
              }
            }
            i=0;
            for(i=0;i<$scope.arr2.length;i++){
              if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr2.splice(i,1);
                  i--;
              }
            }


<<<<<<< HEAD
             }
=======
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
             $scope.show=true;
            };
            }


          });
  $scope.Book=function()
  {    
        var inFlightData = {
          FlightID:inFlightID,
          FlightAirline:inFlightAirline,
          FlightClass:inFlightClass,
          FlightCost:inFlightCost
        };
        var outFlightData ={
          FlightID:outFlightID,
          FlightAirline:outFlightAirline,
          FlightClass:outFlightClass,
          FlightCost:outFlightCost
        };
         if(!inFlightID && !outFlightID){
          alert("you have to choose a flight");
        }else{
          if(inFlightID == null && outFlightID && outFlightAirline=="AirFrance"){
              flightSrv.setOutFLightData(outFlightData);
              flightSrv.setinFLightData(inFlightData);
              insertFlightInSession(null,outFlightID);
          }else{
            if(inFlightID == null && outFlightID && outFlightAirline!="AirFrance"){
              flightSrv.setOutFLightData(outFlightData);
              flightSrv.setinFLightData(inFlightData);
              $location.url('/passenger');
            }else{
              if(inFlightID != null &&inFlightAirline != "AirFrance" && outFlightID && outFlightID!="AirFrance"){
                flightSrv.setOutFLightData(outFlightData);
                flightSrv.setinFLightData(inFlightData);
                $location.url('/passenger');
              }else{
                if(inFlightID != null &&inFlightAirline == "AirFrance" && outFlightID && outFlightID=="AirFrance"){
                  flightSrv.setOutFLightData(outFlightData);
                  flightSrv.setinFLightData(inFlightData);
                  insertFlightInSession(inFlightID,outFlightID);
                }else{
                 if(inFlightID != null &&inFlightAirline != "AirFrance" && outFlightID && outFlightID=="AirFrance"){
                        flightSrv.setOutFLightData(outFlightData);
                        flightSrv.setinFLightData(inFlightData);
                        insertFlightInSession(null,outFlightID);
                  }else{
                    if(inFlightID != null &&inFlightAirline == "AirFrance" && outFlightID && outFlightID!="AirFrance"){
                        flightSrv.setOutFLightData(outFlightData);
                        flightSrv.setinFLightData(inFlightData);
                        insertFlightInSession(inFlightID,null);
                    }
                  } 
                }
              }
            }
          }
        }

        function insertFlightInSession (InID,OutID){
           flightSrv.insertFlight(InID,OutID,function(err){
              if(err){
                alert(err);
              }else{
                $location.url('/passenger');
              }
            });

        }

<<<<<<< HEAD

   $scope.viewFlight=function(number)
  {
    
    if(number==0)
=======
      
    }

    $scope.radioActionOrigin=function(id,airline,classs,cost)
>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83
    {
      console.log(id);
      console.log(airline);
      console.log(classs);
      console.log(cost);
      outFlightID = id;
      outFlightAirline = airline;
      outFlightClass = classs;
      outFlightCost = cost
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
    $scope.radioActionDest=function(id,airline,classs,cost)
    {
      console.log(id);
      console.log(airline);
      console.log(classs);
      console.log(cost);
      inFlightID = id;
      inFlightAirline = airline;
      inFlightClass = classs;
      inFlightCost = cost;
    }

  $scope.nextAirline=function(){
     if($scope.endindex==$scope.airlines.length-1){
        alert("no next airlines");
      }
      else{
          $scope.startindex=$scope.startindex+2;
           $scope.endindex=$scope.endindex+2;
           if($scope.endindex>$scope.airlines.length-1){
                $scope.startindex=$scope.airlines.length-2;
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
       //      console.log("new of ");
       // console.log($scope.newof);
       // console.log("new of 2 ");
       // console.log($scope.newof2);
       // console.log("arr1 ");
       // console.log($scope.arr1);
       // console.log("arr2 ");
       // console.log($scope.arr2);

           var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr1.splice(i,1);
                  i--;
              }
            }
            i=0;
            for(i=0;i<$scope.arr2.length;i++){
              if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr2.splice(i,1);
                  i--;
              }
            }

      }
     


  }
<<<<<<< HEAD

  $scope.radioActionDest=function(id)
  {
      // console.log("dest");
      // console.log(id);
    inFlightID = id;
  }
=======
  $scope.previousAirline=function(){
      if($scope.startindex==0){
        alert("no previous airlines");
      }
      else{
       $scope.startindex=$scope.startindex-2;
       $scope.endindex=$scope.endindex-2;
       if($scope.startindex<0){
            $scope.startindex=0;
            $scope.endindex=1;
       }
       $scope.arr1=[];
       var ind=0;
       for(ind=0;ind<$scope.newof.length;ind++){
           $scope.arr1[ind]=$scope.newof[ind]; 
           console.log( $scope.arr1[ind]); 
       }

>>>>>>> 2c7e742d345b38e6d774d62f2df35d439bdaaf83



       $scope.arr2=[];
       ind=0;
       for(ind=0;ind<$scope.newof2.length;ind++){
           $scope.arr2[ind]=$scope.newof2[ind];
           console.log( $scope.arr2[ind]);  
       }


            var i=0;
            for(i=0;i<$scope.arr1.length;i++){
              if(($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr1[i].Airline!=$scope.airlines[$scope.startindex+1].name)){          
                  $scope.arr1.splice(i,1);
                  i--;
              }
            }
            i=0;
            for(i=0;i<$scope.arr2.length;i++){
              if(($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex].name)&&($scope.arr2[i].Airline!=$scope.airlines[$scope.startindex+1].name)){
                  $scope.arr2.splice(i,1);
                  i--;
              }
            }
     } 
  }
    
  });
