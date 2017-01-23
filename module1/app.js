(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject =['$scope'];
function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.lunch="";
  $scope.checkLunch = function () {
    if ($scope.lunch=="")
    {
      $scope.message = "Please enter data first";
    }
    else {
      if ($scope.lunch.split(',').length > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  }
}

})();
