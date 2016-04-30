app.controller('reservationCtrl', function($scope, $location,reservtionSrv) {
  $scope.notFound=false;

  console.log("RESERVATION");

  $scope.getReservation=function(searched)
  {
  	// var test=$scope.SearchResult;

 
  	
  	reservtionSrv.getReservation(searched,function(data){
  		if(data=="not found")
      {
        console.log("NOT");
        $scope.notFound=true;

      }
      else
      {
        console.log("FOUND");
        $scope.notFound=false;
        console.log(data.booking.DepartureDate);
        $scope.Departure=data.booking.DepartureDate;

      }
  	});
  }

});

















app.factory('reservtionSrv',function ($http){ 
    return {
       getReservation : function(refNum,cb) {
        var tokenReq = {
        method: 'GET',
        url: '/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/getReservation/' + refNum,
              headers:
              {
                'x-access-token':response
              }
          };

                  return $http(req).then(function mySucces(response) {

               cb(response.data);
            }, function myError(response) {
                 cb(response.statusText);
            });
            }).error(function(response){
               console.log(response.statusText);
               alert("An error occured please try again");
            });      
         }
         
     };  
         
}); 