app.factory('contactUsSrv', function ($http) {
     return {
         submitContactUsFormToServer : function(newContactUs) {
          var req = {
              method: 'POST',
              url: '/api/contactUs',
              data: { newContactUs: newContactUs }
          };

          return $http(req);
         }
  
     };
 });