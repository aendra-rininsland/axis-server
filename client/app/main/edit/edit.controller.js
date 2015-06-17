'use strict';

angular.module('axismakerApp')
  .controller('EditCtrl', function ($scope, $window, $location, Chart, $stateParams, $modal) {
    $scope.itemId = typeof $stateParams.item !== 'undefined' ? $stateParams.item : undefined;
    
    if (!$scope.itemId) { // Item isn't set, let user choose
      Chart.query(function(res){
        $scope.charts = res;
      });
    } else { // load some chartzzzz
      Chart.get({id: $scope.itemId}, function(chart){
        $scope.itemTitle = chart.title;
        $scope.axisConfig = chart.config;
      });
    }

    $scope.editChart = function(path) {
      $location.path('/edit/' + path); // Reload page with itemId set.
    };

    $scope.deleteChart = function(itemId) {
      Chart.delete({id: itemId});
    };

    // Update chart
    var updateChart = function(config) {
      if ($scope.itemTitle) {
        Chart.update({id: $scope.itemId}, {config: config.config, title: $scope.itemTitle}, function(res){
          $modal.open({
            templateUrl: 'components/modal/modal.html',
            size: 'lg',
            controller: function($scope){
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
      updateChart(config);
    });
  });
