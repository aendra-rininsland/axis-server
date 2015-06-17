'use strict';

angular.module('axismakerApp')
  .controller('NewCtrl', function ($scope, Auth, Chart, $compile, $window, $modal, $http) {
    $window.axisConfig = undefined; // clear global config from previous edits
    $scope.popoverText = 'A project name is required.';

    var createNew = function(config) {
      if ($scope.filename) {
        Chart.post({config: config.config, title: $scope.filename}, function(res){
          $modal.open({
            templateUrl: 'components/modal/modal.html',
            controller: function($scope, $sce){
              $scope.modal = {};
              $scope.modal.title = 'Your chart';
              $scope.modal.chartUrl = res.url;
            }
          });
        });
        // $http.get('/app/preview/preview.html').success(function(template){
          // repo.write($scope.branch, $scope.filename + '/axis.json', config.config, 'initial config -- ' + $scope.filename, function(err, res, xmlhttprequest) {
          //   var urlJSON = 'https://cdn.rawgit.com/' + $scope.repoName[1] + '/' + $scope.repoName[2] + '/' + res.commit.sha + '/' + $scope.filename + '/axis.json';
          //   var compiled = template.replace(/\{\{axisJSON\}\}/, urlJSON); // messy, should be doable in Angular.
          //   // Second write has to be after the first completes.
          //   repo.write($scope.branch, $scope.filename + '/index.html', compiled, 'initial template -- ' + $scope.filename, function(err, res, xmlhttprequest){
          //     var url = 'https://cdn.rawgit.com/' + $scope.repoName[1] + '/' + $scope.repoName[2] + '/' + res.commit.sha + '/' + $scope.filename + '/index.html';
          //     $modal.open({
          //       templateUrl: 'components/modal/modal.html',
          //       controller: function($scope, $sce){
          //         $scope.modal = {};
          //         $scope.modal.title = 'Your finished chart';
          //         $scope.modal.html = $sce.trustAsHtml('<iframe src="' + url + '" width="100%" height="100%"></iframe><br><a href="' + url + '" target="_blank">Open in new window <i class="fa fa-search-plus"></i></a>');
          //       }
          //     });
          //   });
          // });
        // });
      }
    };

    angular.element($window).bind('message', function(e) {
      var config = angular.fromJson(e.originalEvent.data);
      createNew(config);
    });
  });
