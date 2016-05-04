app.controller('reservationCtrl', function($scope, $location,reservationSrv) {
  $scope.notFound=false;
  $scope.Found=false;
  $scope.canceled=false;
  id=null;

  console.log("RESERVATION");

  $scope.getReservation=function(searched)
  {
  	// var test=$scope.SearchResult;

 
  	
  	reservationSrv.getReservation(searched,function(data){
  		if(data=="not found"|| data.booking==undefined)
      {
        console.log("NOT");
        $scope.notFound=true;
         $scope.Found=false;
         $scope.canceled=false;


      }
      else
      {
        console.log("FOUND");
        $scope.notFound=false;
         $scope.Found=true;
         $scope.canceled=false;
        console.log(data);
        $scope.From=data.booking.from;
        $scope.To=data.booking.To;
        $scope.DepartureDate=data.booking.DepartureDate.substring(0,10);
        $scope.DepartureTime=data.booking.DepartureDate.substring(11,16);
        $scope.Email=data.booking.Email;
        $scope.Adults=data.booking.NumberOfAdults;
        $scope.Children=data.booking.NumberOfChildren;
        $scope.ReturnDate=data.booking.ReturnDate.substring(0,10);
        $scope.ReturnTime=data.booking.DepartureDate.substring(11,16);
        id=data.booking._id;

      }
  	});
  }
  $scope.CancelReservation=function(canceled)
  {
    reservationSrv.cancelReservation(id,function(data) {
        $scope.notFound=false;
         $scope.Found=false;
         $scope.canceled=true;
    });
  }

});

















app.factory('reservationSrv',function ($http){ 
    return {
       getReservation : function(refNum,cb) {
        var tokenReq = {
        method: 'GET',
        url: 'http://52.26.173.245/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/getReservation/' + refNum+'?wt='+response
            
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
         },
         cancelReservation : function(refNum,cb) {
            var tokenReq = {
                method: 'GET',
                url: 'http://52.26.173.245/getToken'
              };
      return $http(tokenReq).success(function(response){
         var req = {
              method: 'POST',
              url: 'http://52.26.173.245/api/cancelReservation?wt='+response,
              data: { ref: refNum }
                 
          };


             return $http(req).success(function(data, status, headers, config) {
                  cb(data);
              })
              .error(function(data, status, headers, config) {
                      cb("Error while trying to cancel your reservation, please try again later");
          });
            }).error(function(response){
              console.log(response.statusText);
               alert("An error occured please try again");
            })
         }
         
     };  
         
}); 