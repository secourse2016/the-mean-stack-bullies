  app.controller('personalInfoCtrl', function($scope, $location,personalInfoSrv) {
  number=personalInfoSrv.getBookingNumberOfAdultsAndChildren();
  var index;
  Adults=0;
  Children=0;
  $scope.Array=[];
  $scope.personalArray=[];
  $scope.titleType="Adult 1";
  $scope.i0={"background-color":"rgb(152,58,49)"};
  $scope.ageShow=true;

  number.then(function(data){
    Adults=data.data.NumberOfAdults;
    Children=data.data.NumberOfChildren;
    // $scope.Array=new Array(Adults+Children);
    // console.log($scope.Array.length);
    for(index=0;index<(Adults+Children);index++)
    {
      $scope.Array[index]=index;
    }
    $scope.personalArray=new Array(Adults+Children);

    if((Adults+Children)==1){
        $scope.lastPassenger=false;
    }
    else{
        $scope.lastPassenger=true;
    }
    console.log(Array.length);
  });


  $scope.currentIndex=0;



  	function presonValidations(){
          var isvalid =true;
          var errMessage = "";
           if($scope.firstName == null||!(/^[a-z ,.'-]+$/i.test($scope.firstName))){
            errMessage+="please enter a valid First name \n";
            isvalid = false;
            }
           if($scope.lastName == null||!(/^[a-z ,.'-]+$/i.test($scope.lastName))){
            errMessage+="please enter a valid Last name \n";
            isvalid = false;
            }
            if($scope.Nationality == null||!(/^[a-z ,.'-]+$/i.test($scope.Nationality))){
            errMessage+="please enter a valid Nationality \n";
            isvalid = false;
            }

            if(($scope.age == null)||!(/^[0-9]{1,2}$/.test($scope.age ))){
             errMessage+="please enter a valid age \n";
             isvalid =false;
            }

           if($scope.passportnum == null||!(/^[0-9]{8}$/.test($scope.passportnum))){
            errMessage+="please enter a valid Passport Number \n";
            isvalid = false;
            }
           if($scope.issueDate== null){
             errMessage+="please choose the issue date \n";
             isvalid =false;
            } 
           if($scope.expiryDate== null){
             errMessage+="please choose choose expiry date \n";
             isvalid =false;
            }
           if(isvalid == true){
            errMessage = null;
           }
           return errMessage;
      }


      $scope.testRoute=function(){
         var ahmed=personalInfoSrv.getBookingNumberOfAdultsAndChildren();
          console.log(ahmed);
      }

      $scope.nextPass=function(){
      var errMessage = presonValidations();
          if(errMessage){
            alert(errMessage);
          }
          else
          {    
      var person=[{
                 firstName      : $scope.firstName,
                 secondName    : $scope.lastName,
             age            : $scope.age,
             nationality    : $scope.Nationality,
               passportNumber: $scope.passportnum,
             issueDate      : $scope.issueDate,
             expiryDate     : $scope.expiryDate
            }];
         $scope.personalArray[$scope.currentIndex]=person[0];

         console.log($scope.personalArray);
         

         $scope.firstName=null;
         $scope.lastName=null;
         $scope.age=null;
         $scope.Nationality=null;
         $scope.issueDate=null;
         $scope.expiryDate=null;
         $scope.passportnum=null;

         if($scope.currentIndex==0)
         {
          $scope.i1={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==1)
         {
          $scope.i2={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==2)
         {
          $scope.i3={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==3)
         {
          $scope.i4={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==4)
         {
          $scope.i5={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==5)
         {
          $scope.i6={"background-color":"rgb(152,58,49)"};
         }
         if($scope.currentIndex==6)
         {
          $scope.i7={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==7)
         {
          $scope.i8={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==8)
         {
          $scope.i9={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==9)
         {
          $scope.i10={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==10)
         {
          $scope.i11={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==11)
         {
          $scope.i12={"background-color":"rgb(152,58,49)"};
         }
          if($scope.currentIndex==12)
         {
          $scope.i13={"background-color":"rgb(152,58,49)"};
         }
         
        
         
         $scope.currentIndex++;

         if($scope.currentIndex==(Adults+Children-1))
         {
            $scope.lastPassenger=false;
         }

         if( $scope.currentIndex>=Adults)
         {
          $scope.ageShow=false;
          $scope.titleType="Child "+($scope.currentIndex-Adults+1);
         }
         else{
          $scope.titleType="Adult "+($scope.currentIndex+1);
         }
         
      }
    }

  $scope.last=function(number)  {
      if(number==(Adults+Children-1)||number==9)
      {
        return false;
      }
      else
      {
        return true;
      }
      
    }
  	$scope.submitpersonFrom=function() {
  		        
          var errMessage = presonValidations();
          if(errMessage){
            alert(errMessage);
          }
          else{
            
            var person=[{
                 firstName      : $scope.firstName,
       		       secondName    : $scope.lastName,
      		   age            : $scope.age,
      		   nationality    : $scope.Nationality,
        		   passportNumber: $scope.passportnum,
       		   issueDate      : $scope.issueDate,
       		   expiryDate     : $scope.expiryDate
            }];
            
             $scope.personalArray[$scope.currentIndex]=person[0];
           
                
                
            
            personalInfoSrv.insertPerson($scope.personalArray).then(
                 function(result) {
                       if(result.data=="person added to the session"){
                          console.log(result.data);
                          $location.url('/pay');
                       }
                       else{
                        alert(result.data);
                       }
                  }
            );
          }
      }
  });