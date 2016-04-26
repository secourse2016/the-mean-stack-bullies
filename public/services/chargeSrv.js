app.factory('chargeSrv', function ($http) {  

  return{
tokenizePayment : function(token,cb){ 
           console.log("I'M IN TOKENIZE PAYMENT");
               var req = { 
                   
                   method : 'POST',
                   url :    '/api/charge', 
                   data : {token : token}

               }; 
                 console.log(req);
               return $http(req) 
                    .success(function(response){ 

                      console.log("STRIPE RESPONSE >>>" +response);
                      cb(response);

                    }) 
                    .error(function(response){ 

                         return "ERROR";
                    })

         } 
     
     };
      
});