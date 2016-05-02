app.factory('chargeSrv', function ($http) {  
  var airlines =  [    
              //"http://www.swiss-air.me",
              "http://52.90.41.197", 
            "http://ec2-54-152-123-100.compute-1.amazonaws.com",
            "http://52.27.150.19",
            "http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
            //"http://52.90.46.68",
            //"http://52.34.160.140",
            //"http://52.36.195.124",
            //"http://52.25.15.124",
            //"http://52.36.250.55",
            //"http://54.187.208.145",
            //"http://sebitsplease.com.s3-website-us-east-1.amazonaws.com",
            //"http://52.58.46.74",
            "http://54.93.36.94",
            //"http://54.191.202.17",
            //"http://54.213.157.185",
            //"http://52.28.246.230",
            //"http://mynksh.com",
            //"http://52.207.211.179",
            //"http://52.32.109.147",
            //"http://52.36.169.206",
            //"http://ec2-52-91-94-227.compute-1.amazonaws.com"
          ];
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

         },
  getStripekey : function(airline, cb){ 
       var tokenReq = {
        method: 'GET',
        url: '/getToken'
      }; 

      var incomingPublishablekey;

      return $http(tokenReq).success(function(token){
          var req = {
              method: 'GET',
              url: airline+'/api//stripe/pubkey'
          }; 


       return $http(req).success(function(key){ 

         incomingPublishablekey = key; 
         

       }).error(function(response){
                     console.log(response);
                     alert("ERROR GETTING THE KEY");
                 });


  }

     
     }
      
});