app.controller('paymentCtrl', function($scope, $location,paymentSrv,chargeSrv) {


 paymentSrv.getAmount(function(amount){
        $scope.amount=amount;
      });

      function paymentValidations(){
        var isvalid =true;
        var errMessage = "";
         if($scope.holderN == null||!(/^[a-z ,.'-]+$/i.test($scope.holderN))){
          errMessage+="please enter a valid card name \n";
          isvalid = false;
          }
         if($scope.CardN == null||!(/^[0-9]{16}$/.test($scope.CardN))){
           errMessage+="please enter a valid card number \n";
           isvalid = false;
          }

         if(($scope.CVV == null)||!(/^[0-9]{3}$/.test($scope.CVV))){

           errMessage+="please enter a valid CVV \n";
           isvalid =false;
          }
         if($scope.radioButton== null){
           errMessage+="please choose either Visa or MasterCard \n";
           isvalid = false;
          } 


         if(isvalid == true){
          errMessage = null;
         }
         return errMessage;
       }

       /**
        * payment form submitting function
        */
		$scope.submitPaymentForm=function() {
        
        var errMessage = paymentValidations();
        if(errMessage){
          alert(errMessage);
        }
        else{

            

            Stripe.card.createToken({
            number: $scope.CardN,
            cvc: $scope.CVV,
            exp_month: getMonthNumber($scope.expirymonth),
            exp_year: $scope.expiryyear
            
            }, stripeResponseHandler); 
              
            
} 
}

    stripeResponseHandler = function(status,response){ 
      console.log("DAAAMMIIT");
            if(response.error){ 
               console.log(response);
               console.log("STRIPE ERRR");
            } 

            else{  
            var boolea=false;

          if($scope.radioButton=="visa"){
            boolea=true;
          }
          else{
            boolea=false;
          }

          var date ="01 "+$scope.expirymonth+" "+$scope.expiryyear;


               console.log(response);
            var pa=[{

            visa:boolea,
            MasterCard: (!boolea),
            CardHolderName: $scope.holderN,
            CardHolderNo: $scope.CardN,
            Cvv: $scope.CVV,
            ExpiryDate: date
            
          }]; 
           
          paymentSrv.insertPayment(response.id,pa,

               function(flag) {
                     if(flag == true){
                        console.log("here in the payment controlller");
                        $location.url('/home');
                     }
                     else{
                      alert("something went wrong please try again");
                     }

                });
        
        }
      } 
    
   

    getMonthNumber = function(month){ 
         
         switch(month){ 
            
            case "JAN" : return 01;
            case "FEB" : return 02;
            case "MAR" : return 03; 
            case "APR" : return 04;
            case "MAY" : return 05;
            case "JUN" : return 06; 
            case "JUL" : return 07; 
            case "AUG" : return 08;
            case "SEP" : return 09; 
            case "OCT" : return 10; 
            case "NOV" : return 11; 
            case "DEC" : return 12;


           }

    }


});

app.factory('paymentSrv',function ($http){ 
   
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
                  alert("An error occured please try again33");
         });
       }

           

     };
}); 
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