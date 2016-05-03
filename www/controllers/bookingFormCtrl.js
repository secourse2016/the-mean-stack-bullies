app.controller('bookingFormCtrl', function($scope,$state, $location,bookingSrv,airportSrv) {
  $scope.NAdults;
  $scope.one=true;
  $scope.bus=true;
  OneWay=true;
  trip="";
$scope.book=function(){
    console.log("hobaaaä");
  }
  $scope.class=function(){
    $scope.bus=!$scope.bus;
  }
    $scope.children=function(x){
    console.log(x);
  }
$scope.trip=function(){
    $scope.one=!$scope.one;
      OneWay=$scope.one;
       console.log($scope.one);
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
     console.log(trip);
    var data = [{ 
    
    trip: trip,
    from: "Jeddah, King Abdulaziz International Airport (JED)",
    To: "Cairo, Cairo International Airport (CAI)",
    DepartureDate: $scope.DDate, 
    ReturnDate: $scope.RDate,
    NumberOfAdults: $scope.NAdults,
    NumberOfChildren: $scope.NChildren,
    Class: "Economy",
    Email:"xyz@hotmail.com"
    }]; 
    console.log(data[0]);
    bookingSrv.insertbooking(data,function(response){
      
      console.log(response);
           if(response.outFlights){
            // $location.url('/book');
            $state.go('flights');

          }
          else{

            alert("no flights with criteria avialable");
          }
    });  
    // console.log("goingtoFlights");    

    

    // console.log("went"); 


  }

 }); 

app.factory('bookingSrv',function ($http){ 
    return{
          insertbooking : function(booking,cb){  
            var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
            return $http(tokenReq).success(function(response){
                                          console.log("token--->"+response);

                                            var req = {  
                                              method : 'POST', 
                                              url : '/api/booking', 
                                              data : {booking: booking} ,
                                             headers:
                                                    {
                                                      'x-access-token': response
                                                    }
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
          } 
      }    
  
});





app.factory('airportSrv',function ($http){ 
    return {
    getAirports : function(cb){
      var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/airports',
            headers:
              {
                'x-access-token':response
              }
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
           err+= "Please enter a valid email \m"; 
           valid = false;


        }


                  
         
      if(valid == true){ 
           err=null;
      } 

      return(err);

  }
app.filter("airportsFilters",function(){
 return function(airports,search){
       var count =0;
      var filteredAirports = [];
   if(search){
    angular.forEach(airports,function(airport){
             // console.log("name ->"+airport.name);
           if(airport.name || airport.iata || airport.city ){

              if(airport.iata && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                  && airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 
                  && airport.city  && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1  ){
                   
                  filteredAirports[count]=airport;
               count++;
               
              }else{
                if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                   && airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1){
          
              filteredAirports[count]=airport;
               count++;
            }else{
            
                if(airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 
                   && airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1  ){
                    filteredAirports[count]=airport;
                    count++;
                }else{
                  if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                     && airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1  ){
                       filteredAirports[count]=airport;
                        count++;
                  }else{
                  if(airport.city && (airport.city!=null) && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1){
                    filteredAirports[count]=airport;
                    count++;
                  }else{
                    if(airport.name  && (airport.name!=null) && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 ){
                    filteredAirports[count]=airport;
                    count++;
                  }else{
                    if(airport.iata  && (airport.iata!=null) && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1){
                        filteredAirports[count]=airport;
                        count++;
                    }
                  }
                  }
                }
              
            }
              }

           
         }   
        }
    });

   } 
   console.log(filteredAirports.length);
   return filteredAirports;   
 } 
  
});
