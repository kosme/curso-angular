(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject =['$scope'];
function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.lunch="";
  $scope.color="black";
  $scope.borderColor="";
  $scope.checkLunch = function () {
    if ($scope.lunch=="")
    {
      $scope.message = "Please enter data first";
      $scope.color ="red";
      $scope.borderColor="red";
    }
    else {
      $scope.color ="green";
      if ($scope.lunch.split(',').length > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
      $scope.borderColor="green";
    }
  }
}

})();
