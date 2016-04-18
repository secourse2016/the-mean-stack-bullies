app.controller('bookingCtrl', function($scope, $location,airportSrv,flightSrv,FlightsSrv,bookingSrv) {

    
  $scope.date= new Date();
  $scope.limit=6;
  $scope.hideBookButton = false; 
      airportSrv.getAirports().then(function(response) {
        //First function handles success
      
         $scope.airports = response.data;
          console.log("responded");
        
    }, function(response) {
        //Second function handles error
        console.log("not responded");
    
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
  $scope.bookFlight=function(){   

   
    /*form data is retrieved here*/ 
     var data = [{  
    
    trip: $scope.trippp,
    from: $scope.selectedOrigin,
    To: $scope.selectedDestination,
    DepartureDate: $scope.depDate, 
    ReturnDate: $scope.retDate,
    NumberOfAdults: $scope.adultsss,
    NumberOfChildren: $scope.children,
    Class: $scope.tclass,
    Email:$scope.email

    }];    
    // console.log(data[0].DepartureDate);
    // console.log(data[0].DepartureDate.getFullYear());
    // console.log(data);
    /*form data is passed to the bookin service*/ 
     bookingSrv.insertbooking(data,function(response){
      if(response.err){
        alert("err occured please try again");
      }else{
        if(response.outFlights){
            //console.log("in booking controller "+response.outFlights[0].origin);
            flightSrv.setOutgoingFlights(response.outFlights);
          }
            if(response.inFlights){
              console.log("in booking controller "+response.outFlights[0].origin);
              flightSrv.setIngoingFlights(response.inFlights);
            } 
        
          $location.url('/book');
      }
   });  
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
    if(iata==undefined){
      $scope.destination=null;
          $scope.hide=false;
          $scope.hideBookButton=true;
          // FlightsSrv.getFlights().success(function(flights) {
                $scope.arr = FlightsSrv.getFlights();
                var x;
                var today=new Date();
                for(x=0;x< $scope.arr.length;x++)
                {
                  var d=new Date($scope.arr[x].date);
                  if((d.getYear()<today.getYear()) || (d.getYear()==today.getYear && d.getMonth()<today.getMonth()) || (d.getYear()==today.getYear && d.getMonth()==today.getMonth() && d.getDate()<today.getDate()))
                  {
                      $scope.arr.splice(x,1);
                      x--;
                  }

                }

       //   });
        
       $scope.image="../images/paris2.jpg"; 
       $scope.datedivbool=false;
    }      
    else{

       var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){
          if(array[i].destinationIata==iata){
            result.push(array[i]);
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
 });




