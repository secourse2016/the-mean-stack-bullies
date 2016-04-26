app.factory('airportSrv',function($http){
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
   	
   };
});

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
 };
});

