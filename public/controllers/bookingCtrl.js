app.controller('bookingCtrl', function($scope, $location,airportSrv,flightSrv,FlightsSrv,bookingSrv,airlineSrv) {
 
 $scope.checkAllAirlines = function(){
  if($scope.trippp == "one"){
        var bookingData = [{ 
          from: $scope.selectedOrigin,
          To: $scope.selectedDestination,
          DepartureDate: $scope.depDate
         }];  
     airlineSrv.getOneTripFlightsFromOtherAirlines(bookingData[0],function(economyOutFlights,businessOutFlights){

       

        var flightsFromOtherAirlines = customizingFlightsFromOtherAirlines(economyOutFlights,businessOutFlights);
        console.log(flightsFromOtherAirlines);
        flightSrv.setFlightsFromOtherAirlines(flightsFromOtherAirlines);
        book(); 
        });
        
     
   }else{
     var bookingData = [{ 
          from: $scope.selectedOrigin,
          To: $scope.selectedDestination,
          DepartureDate: $scope.depDate,
          arrivalDate:$scope.retDate
         }];  
         airlineSrv.getRoundTripFlightsFromOtherAirlines(bookingData[0],function(economyFlights,businessFlights){
         // console.log("length = "+AllRoundTripFLights.length);
          var economyoutgoingflightsFromOtherAirlines = [];
          var businessoutgoingflightsFromOtherAirlines = [];
          var economyreturnflightsFromOtherAirlines = [];
          var businessreturnflightsFromOtherAirlines = [];

           for(var i=0; (i<economyFlights.length)||(i<businessFlights.length);i++){
            if(economyFlights[i]){
               var economyOutgoingFlights = {
                outgoingFlights:economyFlights[i].outgoingFlights
                };
                var economyReturnFlights = {
                  outgoingFlights:economyFlights[i].returnFlights 
                  };
             economyoutgoingflightsFromOtherAirlines.push(economyOutgoingFlights);
             economyreturnflightsFromOtherAirlines.push(economyReturnFlights);
            }
           
            if(businessFlights[i]){

            var businessOutgoingFlights = {
            outgoingFlights:businessFlights[i].outgoingFlights
            };
            var businessReturnFlights = {
            outgoingFlights:businessFlights[i].returnFlights 
            };
           
            businessoutgoingflightsFromOtherAirlines.push(businessOutgoingFlights);
            
            businessreturnflightsFromOtherAirlines.push(businessReturnFlights);
            }
            
           }
              // console.log(economyoutgoingflightsFromOtherAirlines);
              // console.log(businessoutgoingflightsFromOtherAirlines);
              // console.log(economyreturnflightsFromOtherAirlines);
              // console.log(economyreturnflightsFromOtherAirlines);
          var outgoingflightsFromOtherAirlines = customizingFlightsFromOtherAirlines(economyoutgoingflightsFromOtherAirlines,businessoutgoingflightsFromOtherAirlines);
          var returnflightsFromOtherAirlines =  customizingFlightsFromOtherAirlines(economyreturnflightsFromOtherAirlines,businessreturnflightsFromOtherAirlines);
          // console.log(outgoingflightsFromOtherAirlines);
          // console.log(returnflightsFromOtherAirlines);
        flightSrv.setFlightsFromOtherAirlines(outgoingflightsFromOtherAirlines);
        flightSrv.setReturnFlightsFromOtherAirlines(returnflightsFromOtherAirlines);
        book();
         });
   }
    }

  

  $scope.date= new Date();
  $scope.limit=6;
  $scope.hideBookButton = false; 
  airportSrv.getAirports(function(airports) {
    //First function handles success
    if(airports){
         $scope.airports = airports;
        // console.log(airports[0]);
      console.log("responded");
    }else{
       console.log("not responded");
    } 
  });
     
  $scope.$watch('dateString',function(dateString){
    $scope.date=new Date(dateString);
  });

  $scope.hideReturnedDate=function(){
    $scope.hidedate=false;
    
  }
  $scope.Book=function()
  {
      $location.url('/passenger');
  }
  $scope.showReturnedDate=function(){
    $scope.hidedate=true;
  }
 var book = $scope.bookFlight=function(){   

     var errMessage = bookingFormValidation(); 
     var empty=true; 
          if(errMessage&&errMessage.length > 50){  
            $scope.alertme = "You entered invalid data!";
             $scope.bookalert = true;
             $scope.$apply();

          }
          if(errMessage&&errMessage.length < 50){  
             $scope.alertme = errMessage;
             $scope.bookalert = true;
             $scope.$apply(); 

          }
       
    else{ 
      var adult=parseInt( $scope.adultsss);
      var child= parseInt($scope.children);
     var data = [{ 
    
    trip: $scope.trippp,
    from: $scope.selectedOrigin,
    To: $scope.selectedDestination,
    DepartureDate: $scope.depDate, 
    ReturnDate: $scope.retDate,
    NumberOfAdults: adult,
    NumberOfChildren: child,
    Class: $scope.class,
    Email:$scope.email
    }]; 
    // console.log("test nullsss in ctrl----------->"+data[0].NumberOfAdults) ; 
    // console.log("test nullsss in ctrl----------->"+data[0].NumberOfChildren) ;  

   
     bookingSrv.insertbooking(data,function(response){

               if(response.outFlights.length >0){
                $location.url('/book');
              }
              else{
                alert("no flights with criteria avialable");
              }
       });   

  }
}

  $scope.bookButton=function(){

  $scope.click5();
 
  }
  $scope.filterTableDate=function(){
    var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){
          var d=new Date(array[i].date);
          if(d.getDate()==$scope.date.getDate()){
             if(d.getMonth()==$scope.date.getMonth()){
                 if(d.getYear()==$scope.date.getYear()){
                     result.push(array[i]);
                 }
            }      
          }

       }
       if(result.length==0){
         $scope.hideTable=true;
       }
       $scope.arr = result;
  }
  $scope.changeTable=function(iata){
  
    $scope.hideTable=false;
    if(iata===undefined){
      // $scope.destination="";
      $scope.destination=null;
          $scope.hide=false;
          $scope.hideBookButton=true;
          // FlightsSrv.getFlights().success(function(flights) {
                FlightsSrv.getFlights(function(data){
                    var dweee=data.outF.concat(data.inF);
                    $scope.arr=dweee;
                    var x;
                    
                    for(x=0;x< $scope.arr.length;x++)
                    {
                      var today=new Date();
                      var d=new Date($scope.arr[x].departureDateTime);
                      if((d.getYear()<today.getYear()) || (d.getYear()==today.getYear && d.getMonth()<today.getMonth()) || (d.getYear()==today.getYear && d.getMonth()==today.getMonth() && d.getDate()<today.getDate()))
                      {
                          $scope.arr.splice(x,1);
                          x--;
                      }
                    
                      if(Date.parse(today)<Date.parse($scope.arr[x].arrivalDateTime)){
                        if(Date.parse(today)<Date.parse($scope.arr[x].departureDateTime)){
                            $scope.arr[x].status="Not Yet";
                        }
                        else{
                             $scope.arr[x].status="Flying";
                        }
                        
                      }

                      else{  
                        $scope.arr[x].status="Arrived";
                      }
                    }
                     $scope.image="../images/paris2.jpg"; 
                     $scope.datedivbool=false;
                     
                });
    }      
    else{
       
       var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){
          if(array[i].origin==iata){
            result.push(array[i]);
          }

          var today=new Date();
          if(Date.parse(today)<Date.parse($scope.arr[i].arrivalDateTime)){
                        if(Date.parse(today)<Date.parse($scope.arr[i].departureDateTime)){
                            $scope.arr[i].status="Not Yet";
                        }
                        else{
                             $scope.arr[i].status="Flying";
                        }
                        
                      }

                      else{  
                        $scope.arr[i].status="Arrived";
                      }

       }
       $scope.arr = result;
       $scope.datedivbool=true;
       if(result.length!=0){
        $scope.image="../images/"+iata+".jpg"; 
       }
       else{
        $scope.hideTable=true;
       }


    }
  }
  $scope.showMore=function(){
    $scope.limit+=6;
  }
 
  function bookingFormValidation(){  
      var valid= true; 
      var err="";
     var evalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if($scope.trippp == undefined){ 
             err+= "Please select your trip type"; 
              valid = false;
        }

        if($scope.selectedOrigin == undefined){  
             err += "Please enter your origin airport \n";
                valid = false; 
        } 
        if($scope.selectedDestination == undefined){ 
               err+= "Please enter your destination \n"; 
               valid = false;
         } 
       if($scope.depDate && ($scope.depDate.getFullYear() > new Date().getFullYear()+1)) { 
            err+="You can not book a flight more than 1 year ahead \n"; 
            valid = false;
       }

        if(($scope.depDate == undefined)||   
          ($scope.depDate.getFullYear() < new Date().getFullYear()) || 
          ($scope.depDate.getMonth()+1 < new Date().getMonth()+1) && 
                ($scope.depDate.getFullYear() == new Date().getFullYear()) || 
          ($scope.depDate.getDate() < new Date().getDate()) && 
             ($scope.depDate.getMonth()+1 == new Date().getMonth()+1) &&
             ($scope.depDate.getFullYear() == new Date().getFullYear())) { 

                err+= "Please enter a valid departure date \n"; 
                valid = false;
        }


        if($scope.trippp == "round"){ 

           if(($scope.retDate== undefined)||   
          ($scope.retDate.getFullYear() < new Date().getFullYear()) || 
          ($scope.retDate.getMonth()+1 < new Date().getMonth()+1) && 
                ($scope.retDate.getFullYear() == new Date().getFullYear()) || 
          ($scope.retDate.getDate() < new Date().getDate()) && 
             ($scope.retDate.getMonth()+1 == new Date().getMonth()+1) &&
             ($scope.retDate.getFullYear() == new Date().getFullYear())){

              err+= "Please enter a valid return date \n"; 
              valid = false;

        
           } 

        } 

         if($scope.adultsss == undefined){ 
             err+= "Please select number of adults \n";
             valid = false;

        }   

        if($scope.children == undefined){ 
            err+="Please select number of children \n";
            valid = false;
        } 

        if($scope.class == undefined){  
          err+= "Please select the seating class \n"; 
          valid = false;

        } 

        if($scope.email == undefined || !(evalid.test($scope.email))) { 
           err+= "Please enter a valid email \n"; 
           valid = false;


        }

                  
         
      if(valid == true){ 
           err=null;
      } 

      return(err);

  }




 });



function customizingFlightsFromOtherAirlines (economyOutFlights,businessOutFlights){
         var flightsFromOtherAirlines = [];
        /**
         * getting the economy and business objects that contains all flights from all other airlines
         * it will check for objects in the two arrays which has the same airline and then call the
         * addBusinessAndEconomyOfTheSameFlightsOfTheSameAirline method that will return back an array
         * of pairs one pair represent business and economy class of one flight for this airline
         */
 
        while(economyOutFlights.length != 0 ){
           if(economyOutFlights[0] &&  economyOutFlights[0] != undefined && economyOutFlights[0].outgoingFlights.length != 0 && economyOutFlights[0].outgoingFlights != undefined){
             var economyAirline = economyOutFlights[0].outgoingFlights[0].Airline;
             var flag = false;

             for(var j=0; j<businessOutFlights.length; j++){
              if(businessOutFlights[j] &&  businessOutFlights[j] != undefined && businessOutFlights[j].outgoingFlights.length != 0 && businessOutFlights[j].outgoingFlights !=undefined ){
                var businessAirline = businessOutFlights[j].outgoingFlights[0].Airline;
                if(economyAirline == businessAirline){
                  flag =true;
;
                 var returnedArray =  addBusinessAndEconomyOfTheSameFlightsOfTheSameAirline(economyOutFlights[0].outgoingFlights,businessOutFlights[j].outgoingFlights);
                 flightsFromOtherAirlines = flightsFromOtherAirlines.concat(returnedArray);
                 businessOutFlights.splice(j,1);
                 break;
                } 
             }else{
              businessOutFlights.splice(j,1);
             } 
        }
        if(flag == false){
        flightsFromOtherAirlines = flightsFromOtherAirlines.concat(economyOutFlights[0].outgoingFlights);
        }
        economyOutFlights.splice(0,1);
      }else{
        economyOutFlights.splice(0,1);
      }
    }
    for(var k=0;k<businessOutFlights.length;k++){
      if(businessOutFlights[k] &&  businessOutFlights[k] != undefined && businessOutFlights[k].outgoingFlights.length != 0 && businessOutFlights[k].outgoingFlights !=undefined ){
        flightsFromOtherAirlines = flightsFromOtherAirlines.concat(businessOutFlights[k].outgoingFlights);
      }
    }    

          /**
           * this method takes the economy flights array and business flights array 
           * and it returns an array that contains pairs where each piar is the business and economy flights of
           * a specific flight based on the same ID or the same flight number
           */
  
         function addBusinessAndEconomyOfTheSameFlightsOfTheSameAirline(airlineEconomyFlights,airlineBusinessFlights){
           console.log(airlineEconomyFlights);
           console.log(airlineBusinessFlights);
            var returnedArray = [];
            while(airlineEconomyFlights.length !=0){
              if(airlineEconomyFlights[0] && airlineEconomyFlights[0] != undefined){
                 var economyFlightID = 0;
                if(airlineEconomyFlights[0]._id){
                   var economyFlightID = airlineEconomyFlights[0]._id;
                }
               
                var economyFlightNumber = airlineEconomyFlights[0].flightNumber;
                returnedArray.push(airlineEconomyFlights[0]);
                airlineEconomyFlights.splice(0,1);

                  for(var i=0 ; i<airlineBusinessFlights.length; i++){
                    if(airlineBusinessFlights[i] && airlineBusinessFlights[i] != undefined){
                      var businessFlightID = 0;
                      if(airlineBusinessFlights[i]._id){
                        businessFlightID = airlineBusinessFlights[i]._id
                      }
                      var businessFlightNumber = airlineBusinessFlights[i].flightNumber;
                      if(economyFlightID == businessFlightID  && economyFlightNumber == businessFlightNumber ){
                        returnedArray.push(airlineBusinessFlights[i]);
                        airlineBusinessFlights.splice(j,1);
                        break;
                      }
                    }else{
                       airlineBusinessFlights.splice(j,1);
                       
                    }
                  }
              }else{
                airlineEconomyFlights.splice(0,1);
              }
              
            }
            if(airlineBusinessFlights.length >0){
              returnedArray = returnedArray.concat(airlineBusinessFlights);
            }
            return returnedArray ;
         }
         return flightsFromOtherAirlines;
}
