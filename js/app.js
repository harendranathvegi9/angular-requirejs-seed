/*global define*/
define([
  'angular',
  'jquery',
  'angularroute',
  'angularsanitize',
  'underscore',
  'modules'
], function(angular) {
  var myApp = angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    //'myApp.filter',
    //'myApp.service',
    //'myApp.directive',
    //'myApp.controller'
  ]);
  return myApp;
});