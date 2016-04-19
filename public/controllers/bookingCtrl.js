app.controller('bookingCtrl', function($scope, $location,airportSrv,flightSrv,FlightsSrv,bookingSrv) {

    
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
  $scope.Book=function()
  {
      $location.url('/passenger');
  }
  $scope.showReturnedDate=function(){
    $scope.hidedate=true;
  }
  $scope.bookFlight=function(){   

     var errMessage = bookingFormValidation(); 
     var empty=true;
          if(errMessage){ 
              alert(errMessage);
          }
       
    else{ 
      console.log("HEANA");
     var data = [{ 
    
    trip: $scope.trippp,
    from: $scope.selectedOrigin,
    To: $scope.selectedDestination,
    DepartureDate: $scope.depDate, 
    ReturnDate: $scope.retDate,
    NumberOfAdults: $scope.adultsss,
    NumberOfChildren: $scope.children,
    Class: $scope.tclass,
    Email:$scope.email

    }];    
   
     bookingSrv.insertbooking(data,function(response){

               if(response.outFlights){
                $location.url('/book');
              }else{
                alert("no flights with criteria avialable");
              }
       });   

  }
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
    $scope.hideTable=false;
    if(iata===undefined){
      // $scope.destination="";
      $scope.destination=null;
          $scope.hide=false;
          $scope.hideBookButton=true;
          // FlightsSrv.getFlights().success(function(flights) {
                FlightsSrv.getFlights(function(data){
                    var dweee=data.outF.concat(data.inF);
                    $scope.arr=dweee;
                    var x;
                    var today=new Date();
                    for(x=0;x< $scope.arr.length;x++)
                    {
                      var d=new Date($scope.arr[x].departureDateTime);
                      if((d.getYear()<today.getYear()) || (d.getYear()==today.getYear && d.getMonth()<today.getMonth()) || (d.getYear()==today.getYear && d.getMonth()==today.getMonth() && d.getDate()<today.getDate()))
                      {
                          $scope.arr.splice(x,1);
                          x--;
                      }

                    }


       //   });
        
                     $scope.image="../images/paris2.jpg"; 
                     $scope.datedivbool=false;
                     
                });
    }      
    else{
       
       var result=[];
       var array=$scope.arr;
       var i;
       for(i=0;i<array.length;i++){
          if(array[i].origin==iata){
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
 
  function bookingFormValidation(){  
      var valid= true; 
      var err="";
     var evalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if($scope.trippp == undefined){ 
             err+= "Please select your trip type"; 
              valid = false;
        }

        if($scope.selectedOrigin == undefined){  
             err += "Please enter your origin airport \n";
                valid = false; 
        } 
        if($scope.selectedDestination == undefined){ 
               err+= "Please enter your destination \n"; 
               valid = false;
         } 
       if($scope.depDate && ($scope.depDate.getFullYear() > new Date().getFullYear()+1)) { 
            err+="You can not book a flight more than 1 year ahead \n"; 
            valid = false;
       }

        if(($scope.depDate == undefined)||   
          ($scope.depDate.getFullYear() < new Date().getFullYear()) || 
          ($scope.depDate.getMonth()+1 < new Date().getMonth()+1) && 
                ($scope.depDate.getFullYear() == new Date().getFullYear()) || 
          ($scope.depDate.getDate() < new Date().getDate()) && 
             ($scope.depDate.getMonth()+1 == new Date().getMonth()+1) &&
             ($scope.depDate.getFullYear() == new Date().getFullYear())) { 

                err+= "Please enter a valid departure date \n"; 
                valid = false;
        }


        if($scope.trippp == "round"){ 

           if(($scope.retDate== undefined)||   
          ($scope.retDate.getFullYear() < new Date().getFullYear()) || 
          ($scope.retDate.getMonth()+1 < new Date().getMonth()+1) && 
                ($scope.retDate.getFullYear() == new Date().getFullYear()) || 
          ($scope.retDate.getDate() < new Date().getDate()) && 
             ($scope.retDate.getMonth()+1 == new Date().getMonth()+1) &&
             ($scope.retDate.getFullYear() == new Date().getFullYear())){

              err+= "Please enter a valid return date \n"; 
              valid = false;

        
           } 

        } 

         if($scope.adultsss == undefined){ 
             err+= "Please select number of adults \n";
             valid = false;

        }   

        if($scope.children == undefined){ 
            err+="Please select number of children \n";
            valid = false;
        } 

        if($scope.tclass == undefined){  
          err+= "Please select the seating class \n"; 
          valid = false;

        } 

        if($scope.email == undefined || !(evalid.test($scope.email))) { 
           err+= "Please enter a valid email \m"; 
           valid = false;


        }

                  
         
      if(valid == true){ 
           err=null;
      } 

      return(err);

  }




 });




