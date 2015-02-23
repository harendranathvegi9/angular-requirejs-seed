/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      seed: {
        options: {
          force: true
        },
        src: ['./app/css', './app/js/vendor', './app/fonts/bootstrap', './app/less/bootstrap', './app/js/build.js']
      },
      build: {
        options: {
          force: true
        },
        src: ['./app/css', './app/js/build.js']
      }
    },
    copy: {
      seed: {
        files: [{
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/dist/fonts',
          src: '**',
          dest: './app/fonts/bootstrap'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/less',
          src: '**',
          dest: './app/less/bootstrap'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/dist/js',
          src: 'bootstrap.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular',
          src: 'angular.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-route',
          src: 'angular-route.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-animate',
          src: 'angular-animate.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-sanitize',
          src: 'angular-sanitize.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-mocks',
          src: 'angular-mocks.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-resource',
          src: 'angular-resource.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/angular-bindonce',
          src: 'bindonce.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/jquery/dist',
          src: '**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/requirejs',
          src: 'require.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/almond',
          src: 'almond.**',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/underscore',
          src: 'underscore**',
          dest: './app/js/vendor'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      build: ['./Gruntfile.js', './app/js/**/*.js']
    },
    less: {
      bootstrap: {
        options: {
          compress: true,
          modifyVars: {
            'icon-font-path': '"../fonts/bootstrap/"',
            'border-radius-base': '0',
            'border-radius-large': '0',
            'border-radius-small': '0'
          }
        },
        files: {
          './app/css/bootstrap.min.css': './app/less/bootstrap/bootstrap.less'
        }
      },
      buildDev: {
        files: {
          './app/css/styles.css': './app/less/styles/styles.less'
        }
      },
      buildProd: {
        options: {
          compress: true
        },
        files: {
          './app/css/styles.min.css': './app/less/styles/styles.less'
        }
      }
    },
    watch: {
      seed: {
        options: {
          spawn: false,
          livereload: true
        },
        files: ['./app/js/**/*.js', './app/less/**/*.less'],
        tasks: ['build']
      }
    },
    connect: {
      seed: {
        port: 9000,
        base: './app'
      }
    },
    requirejs: {
      seed: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: 'app/js/rjsConfig.js',
          deps: ['main', 'app', 'routes'],
          out: 'app/js/build.js',
          optimize: 'uglify2',
          name: './vendor/almond',
          preserveLicenseComments: false
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-karma');


  grunt.registerTask('default', 'Show Default Message', function() {
    grunt.log.ok(['Please use `grunt first` to create the initial folder structure']);
    grunt.log.ok(['Please use `grunt build` to create and reload the app']);
    grunt.log.ok(['Please use `grunt serve` to serve the files @ localhost:9000']);
    grunt.log.ok(['Please use `grunt unit` to run unit tests using karma']);
  });

  grunt.registerTask('first', 'Create folders and copy files', function() {
    grunt.log.ok(['Creating initial folder structure and copying  files']);
    grunt.task.run(['clean:seed', 'copy:seed', 'less:bootstrap']);
  });

  grunt.registerTask('build', 'Create build files', function() {
    grunt.log.ok(['Creating build files']);
    grunt.task.run(['less:buildDev', 'less:buildProd', 'jshint', 'requirejs:seed', 'watch:seed']);
  });

  grunt.registerTask('serve', 'Serve the files @ localhost:9000', function() {
    grunt.log.ok(['Serving files @ localhost:9000']);
    grunt.log.ok(['Use Ctrl + c to stop the server']);
    grunt.task.run(['connect:seed::keepalive']);
  });

  grunt.registerTask('unit', 'Run unit tests', function() {
    grunt.log.ok(['Running Unit Tests']);
    grunt.task.run(['karma:unit']);
  });

};