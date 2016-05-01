app.controller('personalInfoCtrl', function($scope, $location,personalInfoSrv) {
      var adults=0;
      var children=0;
      $scope.personalArray=[];
      $scope.nextpassShow=true;
    // personalInfoSrv.getBookingNumberOfAdultsAndChildren(function(obj){
            adults=1;
            children=1;

            $scope.passengersNumber=adults+children;
            $scope.current=0;
            if($scope.passengersNumber==1){
               $scope.nextpassShow=false;
            }
    // });
// 

    $scope.nextpass=function(){
      var err=presonValidations();
      if(err){
        alert("please enter correct info\n"+err);
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
         
         $scope.personalArray[$scope.current]=person[0];
         $scope.current=$scope.current+1;
         console.log($scope.personalArray);

         $scope.firstName=null;
         $scope.lastName=null;
         $scope.age=null;
         $scope.Nationality=null;
         $scope.issueDate=null;
         $scope.expiryDate=null;
         $scope.passportnum=null;

         if($scope.current==$scope.passengersNumber-1){
          $scope.nextpassShow=false;
         }
      }
    }
    $scope.confirm=function(){
       var err=presonValidations();
      if(err){
        alert("please enter correct info\n"+err);
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
            
         $scope.personalArray[$scope.current]=person[0];
           $scope.current=$scope.current+1;
         console.log($scope.personalArray);
         personalInfoSrv.insertPerson($scope.personalArray,function(response){
            console.log(response);
         });
       }  
         
    }
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
            // if($scope.Nationality == null||!(/^[a-z ,.'-]+$/i.test($scope.Nationality))){
            // errMessage+="please enter a valid Nationality \n";
            // isvalid = false;
            // }

            if(($scope.age == null)||!(/^[0-9]{1,2}$/.test($scope.age ))){
             errMessage+="please enter a valid age \n";
             isvalid =false;
            }

           if($scope.passportnum == null||!(/^[0-9]{8}$/.test($scope.passportnum))){
            errMessage+="please enter a valid Passport Number \n";
            isvalid = false;
            }
           // if($scope.issueDate== null){
           //   errMessage+="please choose the issue date \n";
           //   isvalid =false;
           //  } 
           if($scope.expiryDate== null){
             errMessage+="please choose choose expiry date \n";
             isvalid =false;
            }
           if(isvalid == true){
            errMessage = null;
           }
           return errMessage;
      }
  });



app.factory('personalInfoSrv',function ($http){ 
       return {
         insertPerson : function(pe,cb) {
          var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
          var req = {
              method: 'POST',
              url: '/api/insertperson',
              data: { people: pe }
                 ,headers:
              {
                'x-access-token':response
              }
          };
          
          return $http(req)

              .success(function(response) {
                console.log("hereeeeee"+response);
                   cb(response);
              })
              .error(function(data, status, headers, config) {
                  console.log(response.statusText);
                  alert("An error occured please try again");
          });
            }).error(function(response){
                console.log(response.statusText);
                alert("An error occured please try again");
            });

         },
     getBookingNumberOfAdultsAndChildren : function(cb){
        var tokenReq = {
              method: 'GET',
              url: '/getToken'
            };
      return $http(tokenReq).success(function(response){
        var req = {
          method: 'Get',
          url: '/api/getBookingNumberOfAdultsAndChildren',
          
          headers:
          {
            'x-access-token':response
          }
      };

        return $http(req)
              .success(function(response) {
                     console.log("in the person service"+response);
                   cb(response);
              })
              .error(function(response) {
                   console.log(response.statusText);
                alert("An error occured please try again");
              });
            })
            .error(function(response){
                console.log(response.statusText);
                alert("An error occured please try again");
            });
         }

     };
    });
 