app.factory('contactUsSrv', function ($http) {
     return {
         submitContactUsFormToServer : function(newContactUs,cb) {
          var req = {
              method: 'POST',
              url: '/api/contactUs',
              data: { newContactUs: newContactUs }
                 ,
                 headers:
              {
                'x-access-token':
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjA5ODU3MzQsImV4cCI6MTQ5MjUyMTczNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.cBVsJtA9S-5vRW_-0bcNBqks-L2EUD_9-vV61LF19oo'

              }
          };
            console.log("in the client controller");  
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