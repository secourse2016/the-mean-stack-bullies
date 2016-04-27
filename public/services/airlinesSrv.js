app.factory('airlineSrv',function ($http){ 
   var airlines =  [    
   						//"http://www.swiss-air.me",
   						"http://52.90.41.197", 
						"http://ec2-54-152-123-100.compute-1.amazonaws.com",
						"http://52.27.150.19",
						"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
						//"http://52.90.46.68",
						//"http://52.34.160.140",
						//"http://52.36.195.124",
						//"http://52.25.15.124",
						//"http://52.36.250.55",
						//"http://54.187.208.145",
						//"http://sebitsplease.com.s3-website-us-east-1.amazonaws.com",
						//"http://52.58.46.74",
						"http://54.93.36.94",
						//"http://54.191.202.17",
						//"http://54.213.157.185",
						//"http://52.28.246.230",
						//"http://mynksh.com",
						//"http://52.207.211.179",
						//"http://52.32.109.147",
						//"http://52.36.169.206",
						//"http://ec2-52-91-94-227.compute-1.amazonaws.com"
					];
	return{
		getOneTripFlightsFromOtherAirlines:function(booking,cb){
			 var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
            var count =0 ;
            var outFlights = [];
            var getEconomyOfOneTripFlightsFromOtherAirlines = function(count,cb){
            	if(count == airlines.length ){
            		return cb(true);
            	}else{
            		return $http(tokenReq).success(function(token){

 			    	var aiatFrom = booking.from; 
				    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
			        var aiatTo = booking.To;
				    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
				    var DepartureDate = booking.DepartureDate.getTime();
                		var req = {  
		                  method : 'GET', 
		                  url:""+airlines[count]+"/api/flights/search/"+origin+"/"+destination+"/"+DepartureDate+"/economy?wt="+token+""
					          };
                      return $http(req).success(function(economyFlights){
                      	outFlights = outFlights.concat(economyFlights);
                      	// console.log("hereeee");
                 
                      	// console.log(economyFlights);
                      	getEconomyOfOneTripFlightsFromOtherAirlines(count+1,cb);
                      }).error(function(response){
		                 console.log(response);
		                 alert("An error occured please try again");
		             });
      				});
            	}
            	
            }

                var getBussinessOfOneTripFlightsFromOtherAirlines = function(count,cb){
            	if(count == airlines.length ){
            		return cb(true);
            	}else{
            		return $http(tokenReq).success(function(token){

 			    	var aiatFrom = booking.from; 
				    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
			        var aiatTo = booking.To;
				    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
				    var DepartureDate = booking.DepartureDate.getTime();
                		var req = {  
		                  method : 'GET', 
		                  url:""+airlines[count]+"/api/flights/search/"+origin+"/"+destination+"/"+DepartureDate+"/business?wt="+token+""
					          };
                      return $http(req).success(function(economyFlights){
                      	outFlights = outFlights.concat(economyFlights);
                      	// console.log("hereeee");
                 
                      	// console.log(economyFlights);
                      	getBussinessOfOneTripFlightsFromOtherAirlines(count+1,cb);
                      }).error(function(response){
		                 console.log(response);
		                 alert("An error occured please try again");
		             });
      				});
            	}
            	
            }
          getEconomyOfOneTripFlightsFromOtherAirlines(count,function(flag){
          	// console.log(flag);
           //  console.log(outFlights[0].outgoingFlights[0]);
            
            getBussinessOfOneTripFlightsFromOtherAirlines(count,function(flag){
            	// console.log(flag);
            	// //console.log(outFlights.length);
            	//   cb(outFlights);
            })
          
          });
            
      	  
		},
	getRoundTripFlightsFromOtherAirlines:function(booking,cb){
		 var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
            var count =0 ;
            var outFlights = [];
    		var getEconomyOfRoundTripFlightsFromOtherAirlines = function(count,cb){
            	if(count == airlines.length ){
            		return cb(true);
            	}else{
            		return $http(tokenReq).success(function(token){
 						//console.log("heressss-------><"+booking.from);
 			    	var aiatFrom = booking.from; 
				    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
			        var aiatTo = booking.To;
				    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
				    var DepartureDate = booking.DepartureDate.getTime();
				    var ArrivalDate = booking.DepartureDate.getTime();

                		var req = {  
		                  method : 'GET', 
		                  url:""+airlines[count]+"/api/flights/search/"+origin+"/"+destination+"/"+DepartureDate+"/"+ArrivalDate+"/economy?wt="+token+""
					          };
					          
                      return $http(req).success(function(economyFlights){
                      	 
                      	outFlights = outFlights.concat(economyFlights); 
                      //	console.log("economy");                
                      //	console.log(economyFlights);
                      	getEconomyOfRoundTripFlightsFromOtherAirlines(count+1,cb);

                      }).error(function(response){
		                 console.log(response);
		                 alert("An error occured please try again");
		             });
      				});
            	}
            	
            }

                var getBussinessOfRoundTripFlightsFromOtherAirlines = function(count,cb){
            	if(count == airlines.length ){
            		return cb(true);
            	}else{
            		return $http(tokenReq).success(function(token){

 			    	var aiatFrom = booking.from; 
				    var origin = aiatFrom.substring(aiatFrom.length-4,aiatFrom.length-1); 
			        var aiatTo = booking.To;
				    var destination= aiatTo.substring(aiatTo.length-4,aiatTo.length-1); 
				    var DepartureDate = booking.DepartureDate.getTime();
				    var ArrivalDate = booking.DepartureDate.getTime();
                       //console.log(DepartureDate);
                       //console.log(ArrivalDate);
                		var req = {  
		                  method : 'GET', 
		                  url:""+airlines[count]+"/api/flights/search/"+origin+"/"+destination+"/"+DepartureDate+"/"+ArrivalDate+"/business?wt="+token+""
					          };
                      return $http(req).success(function(economyFlights){
                      	outFlights = outFlights.concat(economyFlights);
                      	
                 		//console.log("business");
                      	//console.log(economyFlights);
                      	getBussinessOfRoundTripFlightsFromOtherAirlines(count+1,cb);
                      }).error(function(response){
		                 console.log(response);
		                 alert("An error occured please try again");
		             });
      				});
            	}
            	
            }
          getEconomyOfRoundTripFlightsFromOtherAirlines(count,function(flag){
          	//console.log("hereee1 ---->"+flag);
           // console.log(outFlights[0].outgoingFlights[0]);
            
            getBussinessOfRoundTripFlightsFromOtherAirlines(count,function(flag){
            	//console.log("heree2 --->"+flag);
            	//console.log(outFlights.length);
            	  cb(outFlights);
            })
          
          });
	}	
	}
});					