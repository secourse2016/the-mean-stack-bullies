


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
          if(array[i].destinationIata==iata){
            result.push(array[i]);
          }
       }
       $scope.arr = result;
       $scope.datedivbool=true;
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
/*
(function(e,t,n,r){function o(t,n){this.$element=e(t);this.settings=e.extend({},s,n);this.init()}var i="floatlabel",s={slideInput:true,labelStartTop:"20px",labelEndTop:"10px",transitionDuration:.3,transitionEasing:"ease-in-out",labelClass:"",typeMatches:/text|password|email|number|search|url/};o.prototype={init:function(){var e=this;var n={"-webkit-transition":"all "+this.settings.transitionDuration+"s "+this.settings.transitionEasing,"-moz-transition":"all "+this.settings.transitionDuration+"s "+this.settings.transitionEasing,"-o-transition":"all "+this.settings.transitionDuration+"s "+this.settings.transitionEasing,"-ms-transition":"all "+this.settings.transitionDuration+"s "+this.settings.transitionEasing,transition:"all "+this.settings.transitionDuration+"s "+this.settings.transitionEasing};if(this.$element.prop("tagName").toUpperCase()!=="INPUT"){return}if(!this.settings.typeMatches.test(this.$element.attr("type"))){return}var r=this.$element.attr("id");if(!r){r=Math.floor(Math.random()*100)+1;this.$element.attr("id",r)}var i=this.$element.attr("placeholder");var s=this.$element.data("label");var o=this.$element.data("class");if(!o){o=""}if(!i||i===""){i="You forgot to add placeholder attribute!"}if(!s||s===""){s=i}this.inputPaddingTop=parseFloat(this.$element.css("padding-top"))+10;this.$element.wrap('<div class="floatlabel-wrapper" style="position:relative"></div>');this.$element.before('<label for="'+r+'" class="label-floatlabel '+this.settings.labelClass+" "+o+'">'+s+"</label>");this.$label=this.$element.prev("label");this.$label.css({position:"absolute",top:this.settings.labelStartTop,left:this.$element.css("padding-left"),display:"none","-moz-opacity":"0","-khtml-opacity":"0","-webkit-opacity":"0",opacity:"0"});if(!this.settings.slideInput){this.$element.css({"padding-top":this.inputPaddingTop})}this.$element.on("keyup blur change",function(t){e.checkValue(t)});t.setTimeout(function(){e.$label.css(n);e.$element.css(n)},100);this.checkValue()},checkValue:function(e){if(e){var t=e.keyCode||e.which;if(t===9){return}}var n=this.$element.data("flout");if(this.$element.val()!==""){this.$element.data("flout","1")}if(this.$element.val()===""){this.$element.data("flout","0")}if(this.$element.data("flout")==="1"&&n!=="1"){this.showLabel()}if(this.$element.data("flout")==="0"&&n!=="0"){this.hideLabel()}},showLabel:function(){var e=this;e.$label.css({display:"block"});t.setTimeout(function(){e.$label.css({top:e.settings.labelEndTop,"-moz-opacity":"1","-khtml-opacity":"1","-webkit-opacity":"1",opacity:"1"});if(e.settings.slideInput){e.$element.css({"padding-top":e.inputPaddingTop})}},50)},hideLabel:function(){var e=this;e.$label.css({top:e.settings.labelStartTop,"-moz-opacity":"0","-khtml-opacity":"0","-webkit-opacity":"0",opacity:"0"});if(e.settings.slideInput){e.$element.css({"padding-top":parseFloat(e.inputPaddingTop)-10})}t.setTimeout(function(){e.$label.css({display:"none"})},e.settings.transitionDuration*1e3)}};e.fn[i]=function(t){return this.each(function(){if(!e.data(this,"plugin_"+i)){e.data(this,"plugin_"+i,new o(this,t))}})}})(jQuery,window,document)

$(document).ready(function(){
  //Floatlabel
  $('input').floatlabel();
  $('a, button').click(function(e){
    e.preventDefault();
  });
});*/
