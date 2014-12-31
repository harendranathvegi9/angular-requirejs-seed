define(['angularmocks'], function() {
  describe('AppMainController', function() {
    var testScope = {};
    beforeEach(function() {
      module('myApp.controller');
      inject(function($controller) {
        $controller('AppMainController', {
          $scope: testScope
        });
      });
    });
   
    it('Testing AppMainController', function() {
        expect(testScope.app.appName).toBe('Angular RequireJS Seed');
        expect(testScope.app.author.name).toBe('Nisheed Jagadish');
        expect(testScope.app.author.email).toBe('nisheedj@thoughtworks.com');
        expect(testScope.app.appRepo).toBe('https://github.com/nisheedj/angular-requirejs-seed.git');
        var authorName = testScope.getAuthorName();
        expect(authorName).toBe(testScope.app.author.name);
    });
  });
});