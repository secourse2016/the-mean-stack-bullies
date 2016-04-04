app.factory('airportSrv',function($http){
   return {
   	getAirports : function(){
   		return $http({
    	method:"GET",
    	url: "https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json"
    });
   	}
   	
   };
});

app.filter("airportsFilters",function(){
 return function(airports,search){
       var count =0;
      var filteredAirports = [];
   if(search){
   	angular.forEach(airports,function(airport){
   		     if(airport.name || airport.iata || airport.iso ){
              if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1
                && airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1 ){
                   console.log("hereee");
                  filteredAirports[count]=airport;
               count++;
               
              }else{
                if(airport.iata && angular.lowercase(airport.iata).indexOf(angular.lowercase(search))!=-1){
          
              filteredAirports[count]=airport;
               count++;
            }else{
            
                if(airport.name && angular.lowercase(airport.name).indexOf(angular.lowercase(search))!=-1){
                    filteredAirports[count]=airport;
                    count++;
                }
              
            }
              }

           
            
        }
   	});

   } 
   return filteredAirports;   
 };
});

