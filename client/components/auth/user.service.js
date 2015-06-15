'use strict';

angular.module('axismakerApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      getCharts: {
        method: 'GET',
        params: {
          controller: 'charts'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
	  });
  });
