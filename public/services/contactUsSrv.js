app.factory('contactUsSrv', function ($http) {
     return {
         submitContactUsFormToServer : function(newContactUs,cb) {
          var req = {
              method: 'POST',
              url: '/api/contactUs',
              data: { newContactUs: newContactUs }
          };

          return $http(req).then(function successCallback(response){
                if(response){
                  console.log(response);
                  cb(response);
                }else{
                   cb(null);
                }
            },
            function errorCallback(response) {
              console.log(response);
            });;
         }
  
     };
 });