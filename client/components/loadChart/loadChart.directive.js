'use strict';

angular.module('axisServer')
  .directive('loadChart', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch('axisConfig', function(newValue){
          if (newValue) {
            window.axisConfig = scope.axisConfig;
            element.attr('src', 'bower_components/axisjs/dist/index.html');
          }
        });
      }
    };
  });
