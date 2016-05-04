app.controller('timeTableCtrl', function($scope, $location,timeTableSrv) {
$scope.limit=0;
  console.log("TIMETABLE");
  timeTableSrv.getFlights(function (array) {
  	 	var i=0;
  
  	 	$scope.arr=array.outF.concat(array.inF);
  	 	// console.log($scope.arr.length);
  	 		for(i=0; i< $scope.arr.length;i++){
  	 			console.log(i<$scope.arr.length)

  	 		$scope.arr[i].img="../img/"+$scope.arr[i].origin+".jpg";
  	 		$scope.arr[i].arrivalDateTime=$scope.arr[i].arrivalDateTime.substring(0,24);
  	 		$scope.arr[i].departureDateTime=$scope.arr[i].departureDateTime.substring(0,24);
  	 		var today = new Date()
  	 		if(Date.parse(today)<Date.parse($scope.arr[i].arrivalDateTime)){
                        if(Date.parse(today)<Date.parse($scope.arr[i].departureDateTime)){
                            $scope.arr[i].status="Scheduled";
                        }
                        else{
                             $scope.arr[i].status="Flying";
                        }
                        
                      }

                      else{  
                        $scope.arr[i].status="Arrived";
                      }
  	 	}
  	 	// $scope.empty=[];
  	 	// $scope.empty.push()

  });


   $scope.loadMore = function() {
    	
	$scope.limit+=6;
    $scope.$broadcast('scroll.infiniteScrollComplete');

    
  };


});



app.factory('timeTableSrv',function ($http){ 
      return {

         getFlights : function(cb) {
                  var tokenReq = {
                      method: 'GET',
                      url: 'http://52.26.173.245/getToken'
                    };
              return $http(tokenReq).success(function(response){
                         console.log("the response -------------->");
                         console.log(response);
                         var req = {
                               method: 'GET',
                               url: 'http://52.26.173.245/api/flightsForTimetable?wt='+response
                              
                         };

                        return $http(req)

                              .success(function(data, status, headers, config) {
                                  // return data;
                                  cb(data)
                              })
                              .error(function(data, status, headers, config) {
                                 return "error";
                              });
        }).error(function(response){
               console.log(response.statusText);
               alert("An error occured please try again");
        });
        }
     };
}); 