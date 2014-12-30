var allTestFiles = [
  './modules',
  './app'
];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({

  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    angular: 'vendor/angular.min',
    jquery: 'vendor/jquery.min',
    angularroute: 'vendor/angular-route.min',
    angularsanitize: 'vendor/angular-sanitize.min',
    angularmocks: 'vendor/angular-mocks',
    underscore: 'vendor/underscore-min'
  },
  shim: {
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    angularroute: {
      deps: ['angular']
    },
    angularsanitize: {
      deps: ['angular']
    },
    angularmocks: {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});