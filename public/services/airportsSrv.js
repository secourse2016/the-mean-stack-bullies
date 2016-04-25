app.factory('airportSrv',function($http){
   return {
   	getAirports : function(){
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
   	
   };
});

app.filter("airportsFilters",function(){
 return function(airports,search){
       var count =0;
      var filteredAirports = [];
   if(search){
   	angular.forEach(airports,function(airport){
   		     if(airport.name || airport.iata || airport.city ){
              if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                  && airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 
                  && airport.city && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1  ){
                   
                  filteredAirports[count]=airport;
               count++;
               
              }else{
                if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                   && airport.city && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1){
          
              filteredAirports[count]=airport;
               count++;
            }else{
            
                if(airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 
                   && airport.city && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1  ){
                    filteredAirports[count]=airport;
                    count++;
                }else{
                  if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                     && airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1  ){
                       filteredAirports[count]=airport;
                        count++;
                  }else{
                  if(airport.city && angular.lowercase(airport.city).indexOf(angular.lowercase(search))!=-1){
                    filteredAirports[count]=airport;
                    count++;
                  }else{
                    if(airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 ){
                    filteredAirports[count]=airport;
                    count++;
                  }else{
                    if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1){
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
   return filteredAirports;   
 };
});

