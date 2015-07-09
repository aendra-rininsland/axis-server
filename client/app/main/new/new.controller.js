'use strict';

angular.module('axisServer')
  .controller('NewCtrl', function ($scope, Auth, Chart, $compile, $window, $modal, $http) {
    $window.axisConfig = undefined; // clear global config from previous edits
    $scope.popoverText = 'A project name is required.';

    var createNew = function(config) {
      if ($scope.filename) {
        Chart.post({config: config.config, title: $scope.filename}, function(res){
          $modal.open({
            templateUrl: 'components/modal/modal.html',
            size: 'lg',
            controller: function($scope, $modalInstance){
              $scope.modal = {};
              $scope.modal.title = 'Your chart';
              $scope.modal.dismissable = true;
              $scope.modal.chartUrl = res.url;
            }
          });
        });
      }
    };

    angular.element($window).bind('message', function(e) {
      var config = angular.fromJson(e.originalEvent.data);
      createNew(config);
    });
  });
