'use strict';

angular.module('axismakerApp')
  .controller('EditCtrl', function ($scope, $window, $location, User, $stateParams, $modal, $http) {
    $scope.itemName = typeof $stateParams.item !== 'undefined' ? $stateParams.item : undefined;
    $scope.filename = $scope.itemName;

    // Item isn't set, let user choose
    if (!$scope.itemName) {
      $scope.charts = User.getCharts();
    } else {
      // load some chartz
      
      
      // repo.read(branch, $scope.itemName + '/axis.json', function(err, config){
      //   if (err) {
      //     $window.alert('This isn\'t an Axis chart!');
      //     $location.path = '/edit';
      //   } else { // Load config object into Axis
      //     $scope.axisConfig = config;
      //     repo.getRef('heads/' + branch, function(err, sha){
      //       if (sha) {
      //         $scope.sha = sha;
      //         $scope.$apply();
      //       }
      //     });
      //     $scope.$apply();
      //   }
      // });
    }

    $scope.editChart = function(path) {
      $location.path('/edit/' + path);
    };

    $scope.deleteChart = function(path) {
      // Chart.delete()
    }

    // Update chart
    var createNew = function(config) {
      if ($scope.filename !== '' && typeof $scope.filename !== 'undefined') {
        $http.get('/app/preview/preview.html').success(function(template){
          var timestamp = new Date();
          repo.write($scope.branch, $scope.filename + '/axis.json', config.config, 'Updated ' + timestamp.toISOString() , function(err, res, xmlhttprequest){
            var urlJSON = 'https://cdn.rawgit.com/' + repoName[1] + '/' + repoName[2] + '/' + res.commit.sha + '/' + $scope.filename + '/axis.json';
            var compiled = template.replace(/\{\{axisJSON\}\}/, urlJSON); // messy, should be doable in Angular.
            repo.write($scope.branch, $scope.filename + '/index.html', compiled, 'Updated ' + timestamp.toISOString(), function(err, res, xmlhttprequest){
              console.dir(res);
              var url = 'https://cdn.rawgit.com/' + repoName[1] + '/' + repoName[2] + '/' + res.commit.sha + '/' + $scope.filename + '/index.html';
              $modal.open({
                templateUrl: 'components/modal/modal.html',
                controller: function($scope, $modalInstance, $sce){
                  $scope.modal = {};
                  $scope.modal.title = 'Updated chart!';
                  $scope.modal.dismissable = true;
                  // $scope.modal.buttons = [{
                  //   text: 'Close',
                  //   classes: 'btn btn-default',
                  //   click: $scope.ok
                  // }];
                  $scope.modal.html = $sce.trustAsHtml('<iframe src="' + url + '" width="100%" height="100%"></iframe><br><a href="' + url + '?' + Date.now() + '" target="_blank">Open in new window <i class="fa fa-search-plus"></i></a>');
                  $scope.iframeWidth = '100%';
                  $scope.iframeHeight = '400px';
                  var cleanUnits = function(val) {
                    if (val.indexOf('%') > -1) {
                      return val;
                    } else {
                      return parseInt(val);
                    }
                  };

                  $scope.getiFrameCode = function(){
                    return $scope.iframeCode = '<iframe src="' + url + '" width="' + cleanUnits($scope.iframeWidth) + '" height="' + cleanUnits($scope.iframeHeight) + '"></iframe>';
                  };

                  $scope.getiFrameCode();
                }
              });
            });
          });
        });
      }
    };

    angular.element($window).bind('message', function(e) {
      var config = angular.fromJson(e.originalEvent.data);
      createNew(config);
    });
  });
