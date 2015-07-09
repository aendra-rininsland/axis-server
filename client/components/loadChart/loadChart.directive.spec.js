'use strict';

describe('Directive: loadChart', function () {

  // load the directive's module
  beforeEach(module('axisServer'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<load-chart></load-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loadChart directive');
  }));
});