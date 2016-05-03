app.factory('chargeSrv', function ($http) {  
  return{
  getStripekey : function(airline, cb){ 
       var tokenReq = {
        method: 'GET',
        url: '/getToken'
      }; 

      var incomingPublishablekey;

      return $http(tokenReq).success(function(token){
          var req = {
              method: 'GET',
              url: airline+'/stripe/pubkey'
          }; 


       return $http(req).success(function(key){ 

         incomingPublishablekey = key;  
         cb(incomingPublishablekey);
         

       }).error(function(response){
                     console.log(response);
                     alert("ERROR GETTING THE KEY");
                 });


  } 


     
     }
      
});