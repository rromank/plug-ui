'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.compare',
  'myApp.compareall',
  'myApp.documents',
  'myApp.document.service',
  'myApp.similarity.service',
  'myApp.version',
  'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/documents'});
}]);
