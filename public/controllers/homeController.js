


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
    $scope.gotoTeam = function() {
        console.log("In gotoTeam");
      $location.url('/team');
    };

     $scope.goHome = function() {
        console.log("In gotoTeam");
      $location.url('/');
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



//End handling section
/**
 * Main Controller
 */
/**
 * Main Controller
 */




app.controller('validateCtrl', function($scope) {
    $scope.CardNumber= "";
    $scope.holderName = "";
    $scope.CVV= "";

});
//End reservation controller

