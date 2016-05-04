app.controller('ConfirmationCtrl', function($scope, $location,ConfirmationSrv,paySrv) {
console.log("in conf"); 
console.log($scope.arrd);
  		 $scope.showThankYou=true; 
        

  		 ConfirmationSrv.getallInfo(function(data)
  		 {
  		 	console.log("new");
  		 			console.log(data);
  		 			$scope.payments = data;
  		 });


      paySrv.getAmount(function(amount){
        $scope.amount=amount;
      });

  		  ConfirmationSrv.getPersonInfo(function(data)
  		 {
        
        console.log(data);
  		 	
  		 			
  		 			$scope.personArray = data;
            console.log($scope.personArray);
            for(var i=0;i< $scope.personArray.length;i++){
            $scope.personArray[i].expiryDate=$scope.personArray[i].expiryDate.substring(0,10);
            $scope.personArray[i].issueDate=$scope.personArray[i].issueDate.substring(0,10);
          }

  		 });

        ConfirmationSrv.getbookingnfo(function(data)
       {
        console.log("bokoing data");
            console.log(data);
            $scope.booking = data;
            $scope.booking.from=$scope.booking.from.slice(0,$scope.booking.from.indexOf(","));
            $scope.booking.To=$scope.booking.To.slice(0,$scope.booking.To.indexOf(","));
            $scope.booking.DepartureDate=$scope.booking.DepartureDate.substring(0,10);



       }); 

       ConfirmationSrv.getbookingID(function(id){ 
               console.log(id); 
               $scope.bookId = id;


       });


 // $scope.reservations =  ConfirmationSrv.getReservation(); 
 // $scope.payments = ConfirmationSrv.getPayments();  
 
 $scope.close =function()
 {
 	 $scope.showThankYou=false;
 }

});

app.factory('ConfirmationSrv', function($http){ 

       return {

         getallInfo : function(cb) {
          var tokenReq = {
        method: 'GET',
        url: 'http://52.26.173.245/getToken'
           };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/PaymentInfocomfirmation?wt='+response
          };



          return $http(req).success(function(response) {
            cb(response);
          })
          .error(function(){
            cb("An error occured please try again");
          });
         }).error(function(response){
                  console.log(response.statusText);
                  alert("An error occured please try again");
         });
       },

          getbookingnfo : function(cb) {
              var tokenReq = {
                method: 'GET',
                url: 'http://52.26.173.245/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/BookingInfocomfirmation?wt='+response
          };



          return $http(req).success(function(response) {
                                      cb(response);
                                    })
                           .error(function(response){
                                   console.log(response.statusText);
                                    alert("An error occured please try again");
                                  });
           
         
         }).error(function(response){
                 console.log(response.statusText);
                  alert("An error occured please try again");
         });
       },



          getbookingID : function(cb) {
              var tokenReq = {
                method: 'GET',
                url: 'http://52.26.173.245/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/sendBookingId?wt='+response
          };



          return $http(req).success(function(response) {
                                      cb(response);
                                    })
                           .error(function(response){
                                   console.log(response.statusText);
                                    alert("An error occured please try again");
                                  });
           
         
         }).error(function(response){
                 console.log(response.statusText);
                  alert("An error occured please try again");
         });
       },


         getPersonInfo: function(cb){
           var tokenReq = {
                  method: 'GET',
                  url: 'http://52.26.173.245/getToken'
                     };
             return $http(tokenReq).success(function(response){
             var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/getPersonInfocomfirmation?wt='+response
              
          };


           return $http(req).success(function(response) {
            cb(response);
             }).error(function(response){
                 console.log(response.statusText);
                  alert("An error occured please try again");
             });
           

         }).error(function(response){
                    console.log(response.statusText);
                  alert("An error occured please try again");
         });



      }

}
});




app.factory('paySrv', function ($http) { 
  
     return {


         insertPayment : function(stripeToken,pa,cb) {

          var tokenReq = {
        method: 'GET',
        url: 'http://52.26.173.245/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: 'http://52.26.173.245/api/insertpayment?wt='+response,

              data: { payment: pa , 
                       token : stripeToken}

          };

          return $http(req)

              .success(function(data, status, headers, config) {
                  console.log("payment added to sessions");
                  var req2 = {
                      method: 'GET',
                      url: 'http://52.26.173.245/api/completeBookingData?wt='+response
                    };
                              return $http(req2).then(
                          function mySucces(response) {
                            console.log("succeeed in completeBookingData http get request"+response);
                            cb(true);
                            
                                
                       },function myError(response) {
                              console.log(response.statusText);
                               alert("An error occured please try again");
                                });  
              })
              .error(function(data, status, headers, config) {
                 return "error";
              });
            }).error(function(){
                 console.log(response.statusText);
                 alert("An error occured please try again");
            })

         },
         getAmount : function(cb) {
              var tokenReq = {
                method: 'GET',
                url: 'http://52.26.173.245/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: 'http://52.26.173.245/api/getPaymentAmount?wt='+response
          };



          return $http(req).success(function(response) {
                                      console.log("this is the response of getPaymentAmount "+response)
                                      cb(response);
                                    })
                           .error(function(response){
                                   console.log(response.statusText);
                                    alert("An error occured please try again");
                                  });
           
         
         }).error(function(response){
                 console.log(response.statusText);
                  alert("An error occured please try again");
         });
       }

           

     };
 });