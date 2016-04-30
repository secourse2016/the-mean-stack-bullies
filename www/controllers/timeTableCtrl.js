app.controller('timeTableCtrl', function($scope, $location,timeTableSrv) {


  console.log("TIMETABLE");
  timeTableSrv.test("TimeTable from timeTableSrv");

});


app.factory('timeTableSrv',function ($http){ 
    return{
         test:function(text){
              console.log(text);
         }
    }
}); 