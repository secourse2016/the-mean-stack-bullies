
app.controller('bookingFormCtrl', function($scope,$state, $location,bookingSrv,airportSrv) {
   console.log("ctrl");
  $scope.NAdults;
  $scope.NChildren;
  $scope.one=true;
  $scope.bus=true;
  OneWay=true;
  $scope.limit=10;
  Generated=false;

  

  airportSrv.getAirports(function(airports){
 
    $scope.airports=airports;
    $scope.filteredairports=airports;
    Generated=true;
  });
  
  $scope.search=function(x){
  
    var count =0;
    var airport;
    $scope.filteredairports = [];
    for(var i=0;i<$scope.airports.length;i++){
      airport=$scope.airports[i];
     if(airport.name || airport.iata || airport.city ){

      if(airport.iata && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(x))!=-1
        && airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(x))!=-1 
        && airport.city  && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(x))!=-1  ){

        $scope.filteredairports[count]=airport;
      count++;

    }else{
      if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(x))!=-1
       && airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(x))!=-1){

        $scope.filteredairports[count]=airport;
      count++;
    }else{

      if(airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(x))!=-1 
       && airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(x))!=-1  ){
       $scope. filteredairports[count]=airport;
      count++;
    }else{
      if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(x))!=-1
       && airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(x))!=-1  ){
       $scope.filteredairports[count]=airport;
     count++;
   }else{
    if(airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(x))!=-1){
      $scope.filteredairports[count]=airport;
      count++;
    }else{
      if(airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(x))!=-1 ){
        $scope.filteredairports[count]=airport;
        count++;
      }else{
        if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(x))!=-1){
          $scope.filteredairports[count]=airport;
          count++;
        }
      }
    }
  }

}
}
}

}   
}
}


$scope.bookingPage = function(city, name,iata)
{
  console.log(originFlag);
 if(originFlag){
  Origin=city+' '+name+' ('+iata+')';
  console.log(Origin);
    $( '#from' ).text(Origin);

  $state.go('book');
  }
  else{
    Destination=city+' '+name+' ('+iata+')';
    $( '#to' ).text(Destination);
      $state.go('book');
  }
}

$scope.cancel = function()
{
  $state.go('book');
}
$scope.searchAirport1= function()
{
  originFlag=true;
  $state.go('chooseAirport');
}
$scope.searchAirport2= function()
{
  originFlag=false;
  $state.go('chooseAirport');

}

$scope.book=function(){
  console.log("hobaaaä");
}



$scope.class=function(){
  $scope.bus=!$scope.bus;
}

$scope.trip=function(){
  $scope.one=!$scope.one;
  OneWay=$scope.one;
  console.log($scope.one);
}

$scope.loadMore= function()
{
  console.log(Generated);
  if(!Generated){
    setTimeout(function(){ $scope.$broadcast('scroll.infiniteScrollComplete'); }, 3000);
  }
  else{
    console.log("increase");
  $scope.limit+=10;
  $scope.$broadcast('scroll.infiniteScrollComplete');
  }

}

$scope.bookFlight=function(){


  if(OneWay)
  {
    trip="one";
  }
  else
  {
    trip="round";
  }
  
  
  var err= bookingFormValidation();
if(err)
{
  alert(err);
}
else{

  var data = [{ 

    trip: trip,
    from: Origin,
    To: Destination,
    DepartureDate: $scope.DDate, 
    ReturnDate: $scope.RDate,
    NumberOfAdults: $scope.NAdults,
    NumberOfChildren: $scope.NChildren,
    Email:$scope.email,
    Class:"Economy"

    }]; 
    console.log(data[0]);
    bookingSrv.insertbooking(data,function(response){
      
      console.log(response);
           if(response.outFlights){
            bookingSrv.setFlightFromService(response);
            $state.go('flights');


    }
    else{


      alert("no flights with criteria avialable");
    }
  });      
}
}

function bookingFormValidation(){  

  var valid= true; 
  var err="";
  var evalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(trip == undefined){ 
   err+= "Please select your trip type"; 
   valid = false;
 }

 if(typeof Origin == 'undefined' || Origin == undefined){  
 
   err += "Please enter your origin airport \n";
   valid = false; 
 } 
 if(typeof Destination == 'undefined' || Destination == undefined){ 
   err+= "Please enter your destination \n"; 
   valid = false;
 } 
 if(typeof $scope.DDate == 'undefined')
 {
  err+="Please enter a Departure Date \n"; 
  valid = false;
 }
 else if(( $scope.DDate && ($scope.DDate.getFullYear() > new Date().getFullYear()+1))) { 
  err+="You can not book a flight more than 1 year ahead \n"; 
  valid = false;
}

if(($scope.DDate == undefined)||   
  ($scope.DDate.getFullYear() < new Date().getFullYear()) || 
  ($scope.DDate.getMonth()+1 < new Date().getMonth()+1) && 
  ($scope.DDate.getFullYear() == new Date().getFullYear()) || 
  ($scope.DDate.getDate() < new Date().getDate()) && 
  ($scope.DDate.getMonth()+1 == new Date().getMonth()+1) &&
  ($scope.DDate.getFullYear() == new Date().getFullYear())) { 

  err+= "Please enter a valid departure date \n"; 
valid = false;
}


if(trip == "round"){ 

 if(($scope.RDate== undefined)||   
  ($scope.RDate.getFullYear() < new Date().getFullYear()) || 
  ($scope.RDate.getMonth()+1 < new Date().getMonth()+1) && 
  ($scope.RDate.getFullYear() == new Date().getFullYear()) || 
  ($scope.RDate.getDate() < new Date().getDate()) && 
  ($scope.RDate.getMonth()+1 == new Date().getMonth()+1) &&
  ($scope.RDate.getFullYear() == new Date().getFullYear())){

  err+= "Please enter a valid return date \n"; 
valid = false;


} 

} 


if($scope.NAdults == undefined){ 
 err+= "Please select number of adults \n";
 valid = false;

}   


if($scope.NChildren == undefined){ 
  err+="Please select number of children \n";
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

app.factory('bookingSrv',function ($http){ 
  var flights = null;
  return{
    insertbooking : function(booking,cb){  
      var tokenReq = {
        method: 'GET',
        url: 'http://52.26.173.245/getToken'
      };
      return $http(tokenReq).success(function(response){
        console.log("token--->"+response);

        var req = {  
          method : 'POST', 
          url : 'http://52.26.173.245/api/booking?wt='+response, 
          data : {booking: booking} 
        };  
        return $http(req)

        .success(function(response) {
                                                      //console.log("response --> "+response);
                                                      cb(response);
                                                    })
        .error(function(response) {
          console.log(response.statusText);
          alert("An error occured please try again");
        });
      })
      .error(function(response){
        console.log(response.statusText);
        alert("An error occured please try again");
      }) ;                         
    }, 
    getFlightFromService:function(){
      return flights;
    },
    setFlightFromService:function(flightArray){
      flights = flightArray;
    }
  }    
  
});





app.factory('airportSrv',function ($http){ 
  return {
    getAirports : function(cb){
      var tokenReq = {
        method: 'GET',
        url: 'http://52.26.173.245/getToken'
      };
      return $http(tokenReq).success(function(response){
        var req = {
          method: 'GET',
          url: 'http://52.26.173.245/api/airports?wt='+response
        };

        return $http(req).then(
          function mySucces(response) {
             // console.log("in the airport server response = "+response.data[0].iata);
             cb(response.data);
           },      function myError(response) {

             console.log(response.statusText);
             alert("An error occured please try again");
           });

      }).error(function(response){
       console.log(response.statusText);
       alert("An error occured please try again");
     })
    }
    
  }
});

