'use strict';

angular.module('axismakerApp')
  .directive('validateFilename', function ($q, $anchorScroll, $location, Chart) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.validateFilename = function(modelValue) {
          var deferred = $q.defer();
          if (modelValue.length) {
            Chart.get({id: modelValue}, function(err, res) {
              if (res) {
                scope.$emit('invalidFilename'); // show popover
                scope.popoverText = 'Please choose a unique name for the chart.';
                angular.element('body').scrollTop(0);
                deferred.reject();
              } else {
                console.clear(); // Otherwise it throws a bunch of 404s. Woo.
                scope.$emit('validFilename'); // hide popover if visible
                deferred.resolve();
              }
            });
          } else {
            deferred.reject();
          }

          return deferred.promise;
        };
      }
    };
  });
