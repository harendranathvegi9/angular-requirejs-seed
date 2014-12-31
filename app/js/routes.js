/*global define*/
define(['./app'], function(app) {
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/',{
        controller:'AppMainController',
        templateUrl:'partials/home.html'
      });
    }
  ]);
});