'use strict';

angular.module('axismakerApp')
  .factory('Chart', function ($resource) {
    return $resource('/api/charts/:id/:controller', {
      id: '@_id'
    },
    {
      query: {
        method: 'GET',
        isArray: true
      },
      post: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
  });
