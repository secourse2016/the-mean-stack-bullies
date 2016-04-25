app.factory('contactUsSrv', function ($http) {
     return {
         submitContactUsFormToServer : function(newContactUs,cb) {
          var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
        return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: '/api/contactUs',
              data: { newContactUs: newContactUs }
                 ,
                 headers:
              {
                'x-access-token':response
              }
          };
          return $http(req).then(function successCallback(response){
                if(response){
                
                  cb(response);
                }else{
                   cb(null);
                }
            },
            function errorCallback(response) {
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