app.factory('paySrv', function ($http) { 
    var publicKey = 'pk_test_ULcStxFLM4quhm4JacResvRo';
    var payData = null;
    var amount =0;
    var outGoingFlightbookingReferenceID = null;
    var returnFLightBookingReferenceID = null;
     return {

         insertPayment : function(stripeToken,pa,cb) {
          var tokenReq = {
        method: 'GET',
        url: '/getToken'
      };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: '/api/insertpayment',
              data: { payment: pa , 
                       token : stripeToken}
                 ,headers:
              {
                'x-access-token':response
              }
          };

          return $http(req)

              .success(function(data, status, headers, config) {
                  console.log("payment added to sessions");
                  var req2 = {
                      method: 'GET',
                      url: '/api/completeBookingData',
                       headers:
                                {
                                  'x-access-token':response
                                }
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
                url: '/getToken'
                 };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'GET',
              url: '/api/getPaymentAmount',
               headers:
              {
                'x-access-token':response
              }
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
       },


       getStripePublicKeyOfOtherAirline: function(airlineName,cb){
        
         var airlines = [];
          airlines["Austrian"] = "http://52.90.41.197";
          airlines["Lufthansa"]="http://ec2-54-152-123-100.compute-1.amazonaws.com";
          airlines["KLM"]="http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com";
          airlines["Turkish Airlines"]="http://52.27.150.19/";

            var tokenReq = {
                method: 'GET',
                url: '/getToken'
                 };
             return $http(tokenReq).success(function(token){
              var getPublickeyRequest = {
                method : 'GET',
                url:airlines[airlineName]+"/stripe/pubkey?wt="+token
              };
                return $http(getPublickeyRequest).success(function(newPublicKey){

                 cb(newPublicKey);
                }).error(function(err){
                  console.log(err);
                  alert("An error occured please try again");
                });


             }).error(function(err){
              console.log(err);
              alert("An error occured please try again");
             })

       },

      

       sendBookingToOtherAirline: function(bookingData,airlineName,cb){
        console.log(bookingData);
         var airlines = [];
          airlines["Austrian"] = "http://52.90.41.197";
          airlines["Lufthansa"]="http://ec2-54-152-123-100.compute-1.amazonaws.com";
          airlines["KLM"]="http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com";
          airlines["Turkish Airlines"]="http://52.27.150.19/";

            var tokenReq = {
                method: 'GET',
                url: '/getToken'
                 };
           return $http(tokenReq).success(function(token){
              var bookingFromOtherAirlineRequest = {
                method : 'POST',
                url:airlines[airlineName]+"/booking?wt="+token,
                data:bookingData
              };
              return $http(bookingFromOtherAirlineRequest).success(function(response){
                console.log("response-->");
                console.log(response)
                cb(response);
              }).error(function(err){
                console.log(err);

              });
       

           }).error(function(err){
            console.log(err);
            alert("An error occured please try again");

           });
        
          },

          setPaymentData:function(paymentData){
            payData = paymentData;
          },
          getPaymentData: function(){
            return payData[0];
          },
          setamount:function(newAmount){
            console.log("last set  " + newAmount);
            amount = newAmount;
          },
          getamount: function(){
                    console.log("last get  " + amount);
            return amount;
          },
          setOutgoingFlightBookingReferenceID:function(newBookingReferenceID){
            outGoingFlightbookingReferenceID = newBookingReferenceID;
          },
          getOutgoingFlightBookingReferenceID: function(){
            return outGoingFlightbookingReferenceID;
          },
          setReturnFlightBookingReferenceID:function(newBookingReferenceID){
            returnFLightBookingReferenceID = newBookingReferenceID;
          },
          getReturnFlightBookingReferenceID : function(){
            return returnFLightBookingReferenceID;
          }
     };
 });