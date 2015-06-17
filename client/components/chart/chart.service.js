'use strict';

angular.module('axismakerApp')
  .factory('Chart', function ($resource) {
    return $resource('/api/charts/:id/:controller', {
      id: '@_id'
    },
    {
      query: {
        method: 'GET'
      },
      post: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });
  });
