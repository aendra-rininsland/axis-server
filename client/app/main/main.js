'use strict';

angular.module('axisServer')
  .controller('MainCtrl', function(Auth, $scope, $location, User){
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.repoSet = false;
    var userData;

    if ($scope.isLoggedIn()) {
      User.get().$promise.then(function(data){
        // Check if repo is set:
        if (typeof data.repoURI !== 'undefined') {
          $scope.repoSet = true;
        } else {
          $location.path('/settings');
        }
      });
    }
  })
  .config(['$tooltipProvider', function($tooltipProvider){
    $tooltipProvider.setTriggers({
        'invalidFilename': 'validFilename'
    });
}]);
