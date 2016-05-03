app.factory('ConfirmationSrv', function($http){ 

       return {

         getallInfo : function(cb) {
          var tokenReq = {
        method: 'GET',
        url: '/getToken'
           };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/PaymentInfocomfirmation',
               headers:
              {
                'x-access-token':response
              }
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
                url: '/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/BookingInfocomfirmation',
               headers:
              {
                'x-access-token':response
              }
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
                url: '/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/sendBookingId',
               headers:
              {
                'x-access-token':response
              }
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
                  url: '/getToken'
                     };
             return $http(tokenReq).success(function(response){
             var req = {
              method: 'GET',
              url: '/api/getPersonInfocomfirmation',
               headers:
              {
                'x-access-token':response
              }
              
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