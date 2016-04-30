app.controller('paymentCtrl', function($scope, $location,paymentSrv) {


  console.log("PAYMENT");
  paymentSrv.test("Payment from paymentSrv");


});

app.factory('paymentSrv',function ($http){ 
    return{
         test:function(text){
              console.log(text);
         }
    }
}); 