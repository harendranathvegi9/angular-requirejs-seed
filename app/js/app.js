/*global define*/
define([
  'angular',
  'jquery',
  'angularroute',
  'angularsanitize',
  'angularanimate',
  'underscore',
  './modules'
], function(angular) {
  var myApp = angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    //'myApp.filter',
    //'myApp.provider',
    //'myApp.service',
    //'myApp.directive',
    'myApp.controller'
  ]);
  return myApp;
});