app.controller('ConfirmationCtrl', function($scope, $location,confirmationSrv) {


  console.log("CONFIRMATIONCTRL");
  confirmationSrv.test("Confirmation from confirmationSrv");

});

app.factory('confirmationSrv',function ($http){ 
    return{
         test:function(text){
              console.log(text);
         }
    }
}); 