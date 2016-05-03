app.controller('bookingCtrl', function($scope, $location,airportSrv,flightSrv,FlightsSrv,bookingSrv,airlineSrv) {
  // $scope.showCal=false;
  // $scope.cal="../partials/calendar.html";
 

 $scope.checkAllAirlines = function(){
  if($scope.trippp == "one"){
        var bookingData = [{ 
          from: $scope.selectedOrigin,
          To: $scope.selectedDestination,
          DepartureDate: $scope.depDate
         }];  
     airlineSrv.getOneTripFlightsFromOtherAirlines(bookingData[0],function(outFlights){
      // console.log("outFlights lenght = "+outFlights.length);
        var flightsFromOtherAirlines = [];

        for(var i =0 ;i<outFlights.length;i++){

          for(var j=0;j<outFlights[i].outgoingFlights.length;j++){
            flightsFromOtherAirlines.push(outFlights[i].outgoingFlights[j]);
          }
        }
       // console.log("after modification length = "+flightsFromOtherAirlines.length);
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
         airlineSrv.getRoundTripFlightsFromOtherAirlines(bookingData[0],function(AllRoundTripFLights){
         // console.log("length = "+AllRoundTripFLights.length);
           var outgoingflightsFromOtherAirlines = [];
           var returnflightsFromOtherAirlines = [];
        for(var i =0 ;i<AllRoundTripFLights.length/2;i++){
          if(AllRoundTripFLights[i].outgoingFlights != undefined){
           for(var j=0;j<AllRoundTripFLights[i].outgoingFlights.length;j++){
           // if(AllRoundTripFLights[i].outgoingFlights[j] != undefined){
               outgoingflightsFromOtherAirlines.push(AllRoundTripFLights[i].outgoingFlights[j]);
             outgoingflightsFromOtherAirlines.push(AllRoundTripFLights[i+AllRoundTripFLights.length/2].outgoingFlights[j]);
         // }
            } 
          }
          
          if(AllRoundTripFLights[i].returnFlights != undefined){

            for(var k=0;k<AllRoundTripFLights[i].returnFlights.length;k++){
        
            if(AllRoundTripFLights[i].returnFlights[k] != undefined){
               returnflightsFromOtherAirlines.push(AllRoundTripFLights[i].returnFlights[k]);
            returnflightsFromOtherAirlines.push(AllRoundTripFLights[i+AllRoundTripFLights.length/2].returnFlights[k]);
          }
            }
          }  
          
           
        }
        // console.log("nooo -->"+returnflightsFromOtherAirlines.length);
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
     var depdateString=document.getElementById('retDateCalender').value;
     var retdateString=document.getElementById('depDateCalender').value;

     $scope.retDate=new Date (retdateString);
     $scope.depDate=new Date (depdateString);
     var errMessage = bookingFormValidation(); 
     var empty=true;
          if(errMessage){ 
              alert(errMessage);
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
    console.log("test nullsss in ctrl----------->"+data[0].NumberOfAdults) ; 
    // console.log("test nullsss in ctrl----------->"+data[0].NumberOfChildren) ;  

   
     bookingSrv.insertbooking(data,function(response){

               if(response.outFlights){
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
         console.log("date   ------------>");
         console.log($scope.depDate);
         console.log("date   ------------>");
         console.log($scope.retDate);
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
          console.log("date   ------------>"+$scope.depDate);
           // if(($scope.depDate == undefined)){
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
           err+= "Please enter a valid email \m"; 
           valid = false;


        }

                  
         
      if(valid == true){ 
           err=null;
      } 

      return(err);

  }




 });




