  app.controller('flightCtrl', function($scope,$location, flightSrv,ConfirmationSrv) {
    console.log("in flight controller");
    $scope.outgoingFlights = [];
    $scope.returnedFlights = [];
    $scope.newof=[];
    $scope.newof2=[];
    $scope.show=false;
    
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



             if($scope.outgoingFlights[ind].Airline==$scope.outgoingFlights[ind+1].Airline)
             {
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



          }





        } 










      }
      console.log($scope.newof);




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



              $scope.show=true;
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


      
    }

    $scope.radioActionOrigin=function(id,airline,classs,cost)
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

    
  });