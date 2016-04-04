


//handling clicking events to show the relevant material 

//start handling section
app.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('beginning');

      // call $anchorScroll()
      $anchorScroll('beginning');
    };

    $scope.goToContactUs = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('contactUsDiv');

      // call $anchorScroll()
      $anchorScroll('contactUsDiv');
    };


  }]);

app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm) {
      $elm.on('click', function() {
        $("body").animate({scrollTop: $elm.offset().top}, "slow");
      });
    }
  }
});

 app.controller('myCtrl', ['$scope', '$location', '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('cvv');

      // call $anchorScroll()
      $anchorScroll();
    };
  }]);


app.controller('myCtrl', function($scope) {
  $scope.showMe=false;
  $scope.showBooking=false;
 $scope.showBooking2=false;
 $scope.showBooking3=false;
 $scope.showPay=false;
$scope.showTag=false;
  $scope.click1= function()
  {
  	$scope.showMe=true;
  	$scope.showManage=false;
    $scope.showBooking2=false;
  	 $scope.showBooking=true;
     $scope.showBooking3=false;

  }
   $scope.click2= function()
  {
  	$scope.showMe=true;
  	$scope.showBooking=false;
  	$scope.showManage=false;
    $scope.showBooking2=true;
    $scope.showBooking3=false;

  }
  $scope.click3=function()
  {
  	$scope.showMe=true;
    $scope.showBooking=false;
  	$scope.showManage=true;
    $scope.showBooking2=false;
    $scope.showBooking3=false;

  }


   $scope.click4= function()
  {
    $scope.showMe=true;
    $scope.showBooking=false;
    $scope.showManage=false;
    $scope.showBooking2=false;
    $scope.showBooking3=true;

  }
   $scope.click5= function()
  {
    $scope.showPay=true;
   
    
  }
  $scope.tag=function()
  {
    $scope.showTag=true;

  }
    
   $scope.close= function()
  {
  	$scope.showMe=false;
  }
});
//End handling section
/**
 * Main Controller
 */
/**
 * Main Controller
 */
app.controller('bookingCtrl', function($scope, $location,airportSrv,FlightsSrv) {

    
  $scope.date= new Date();
  $scope.limit=6;
  $scope.hideBookButton = false; 
      airportSrv.getAirports().then(function(response) {
        //First function handles success
      
         $scope.airports = response.data;
          console.log("responded");
        
    }, function(response) {
        //Second function handles error
        console.log("not responded");
    
    });
     
  $scope.$watch('dateString',function(dateString){
    $scope.date=new Date(dateString);
  });

  $scope.hideReturnedDate=function(){
    $scope.hidedate=false;
    
  }
  $scope.showReturnedDate=function(){
    $scope.hidedate=true;
  }
  $scope.bookFlight=function(){
    
    $scope.click4();
  }

  $scope.bookButton=function(){

  $scope.click5();

  
 
  }
  $scope.filterTableDate=function(){
    var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){
          var d=new Date(array[i].date);
          if(d.getDate()==$scope.date.getDate()){
             if(d.getMonth()==$scope.date.getMonth()){
                 if(d.getYear()==$scope.date.getYear()){
                     result.push(array[i]);
                 }
            }      
          }

       }

       $scope.arr = result;;
  }
  $scope.changeTable=function(city,flag){
    if(city==undefined){

       if(result.length==0){
         $scope.hideTable=true;
       }
       $scope.arr = result;
  }
  $scope.changeTable=function(iata){
    
    if(iata==undefined){
      $scope.destination=null;

          $scope.hide=false;
          $scope.hideBookButton=true;
          // FlightsSrv.getFlights().success(function(flights) {
                $scope.arr = FlightsSrv.getFlights();
                var x;
                var today=new Date();
                for(x=0;x< $scope.arr.length;x++)
                {
                  var d=new Date($scope.arr[x].date);
                  if((d.getYear()<today.getYear()) || (d.getYear()==today.getYear && d.getMonth()<today.getMonth()) || (d.getYear()==today.getYear && d.getMonth()==today.getMonth() && d.getDate()<today.getDate()))
                  {
                      $scope.arr.splice(x,1);
                      x--;
                  }

                }

       //   });
        
       $scope.image="../images/default.jpg"; 
       $scope.datedivbool=false;
    }      
    else{

       var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){

          if(array[i].destinationCity==city){

          if(array[i].destinationIata==iata){

            result.push(array[i]);
          }
       }
       $scope.arr = result;
       $scope.datedivbool=true;

       console.log(city);
       $scope.image="../images/"+city+".jpg"; 

       if(result.length!=0){
        $scope.image="../images/"+iata+".jpg"; 
       }
       else{
        $scope.hideTable=true;
       }



    }
  }
  $scope.showMore=function(){
    $scope.limit+=6;
  }
});



app.controller('reservationsController', function($scope,cancelationReservation)
{
	$scope.searchReservations = function()
	{
	   // $http.get("./reservation.json")
    //   .then(function(response) {

      	   reservations =  cancelationReservation.getReservation();
      	   found = false;
           choosenReservation = 0;
      	   for ( i = 0;i<reservations.length;i++)
      	   {

      	   	 if (reservations[i].bookingRefNumber == $scope.enteredReferenceNum)
      	   	 {
              choosenReservation = i;
        
          	if (reservations[i].confirmed)
   	 	    		$scope.status = "Status : Confirmed";
   	 	    	else
   	 	    		$scope.status ="Status : Not Confirmed";
   	 	    	found = true;
                
   	 	    	break;
      
      	   	 }
           }
           if (!found)
           {
          	 $scope.reservationExist = false;

             $scope.names = ["Reference Number Not Found, Please check it and try again."];
             $scope.flightDetails = [""];
           }
           else
           {
              $scope.result= "";
              $scope.reservationExist = true;
             //  $http.get("./flights.json")
             // .then(function(flightsResponse) {
              flights = cancelationReservation.getFlights();
                for ( i = 0;i<flights.length;i++)
                {
             	    if (reservations[choosenReservation].flightNumber == flights[i].flightNumber.unique)
                  {
                        $scope.names = ["First Name : " + reservations[i].firstName
                        ,"Last Name : " + reservations[i].lastName,
                        "Passport number : " + reservations[i].passport_number,
                       "Booking reference number : " + reservations[i].bookingRefNumber];

                       $scope.flightDetails = ["From " + flights[i].originCity
                       + " To " + flights[i].destinationCity ,"Date : " + flights[i].date,"Duration : " + flights[i].duration + " hours"] ;
                       break; 
                  }
                }
          //  });
           }

    //   });
    
	}


});
app.controller('validateCtrl', function($scope) {
    $scope.CardNumber= "";
    $scope.holderName = "";
    $scope.CVV= "";

});
//End reservation controller

