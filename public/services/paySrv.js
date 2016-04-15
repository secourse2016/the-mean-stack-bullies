app.factory('paySrv', function ($http) {
     return {
         insertPayment : function(pa) {
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa }
          };

          return $http(req);
         }
        
     };
 });