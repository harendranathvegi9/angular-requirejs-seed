/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: {
      myApp: {
        src: ['./app/css', './app/js/vendor', './app/fonts'],
        options: {
          force: true
        }
      },
      js: {
        src: ['./app/js/myApp.js'],
        options: {
          force: true
        }
      },
      seed: {
        src: ['./app/css', './app/js/vendor', './app/fonts', './app/less/bootstrap', './app/img'],
        options: {
          force: true
        }
      }
    },
    copy: {
      myApp: {
        files: [
          /*Angular copy*/
          {
            src: './bower_components/angular/angular.min.js',
            dest: './app/js/vendor/angular.min.js'
          }, {
            src: './bower_components/angular/angular.min.js.map',
            dest: './app/js/vendor/angular.min.js.map'
          }, {
            src: './bower_components/angular/angular-csp.css',
            dest: './app/css/angular-csp.css'
          }, {
            src: './bower_components/angular-route/angular-route.min.js',
            dest: './app/js/vendor/angular-route.min.js'
          }, {
            src: './bower_components/angular-route/angular-route.min.js.map',
            dest: './app/js/vendor/angular-route.min.js.map'
          }, {
            src: './bower_components/angular-sanitize/angular-sanitize.min.js',
            dest: './app/js/vendor/angular-sanitize.min.js'
          }, {
            src: './bower_components/angular-sanitize/angular-sanitize.min.js.map',
            dest: './app/js/vendor/angular-sanitize.min.js.map'
          }, {
            src: './bower_components/angular-animate/angular-animate.min.js',
            dest: './app/js/vendor/angular-animate.min.js'
          }, {
            src: './bower_components/angular-animate/angular-animate.min.js.map',
            dest: './app/js/vendor/angular-animate.min.js.map'
          }, {
            src: './bower_components/angular-mocks/angular-mocks.js',
            dest: './app/js/vendor/angular-mocks.js'
          }, {
            src: './bower_components/angular-resource/angular-resource.js',
            dest: './app/js/vendor/angular-resource.js'
          },
          /*jquery*/
          {
            src: './bower_components/jquery/dist/jquery.min.js',
            dest: './app/js/vendor/jquery.min.js'
          }, {
            src: './bower_components/jquery/dist/jquery.min.map',
            dest: './app/js/vendor/jquery.min.map'
          },
          /*Require JS*/
          {
            src: './bower_components/requirejs/require.js',
            dest: './app/js/vendor/require.js'
          }, {
            src: './bower_components/almond/almond.js',
            dest: './app/js/vendor/almond.js'
          },
          /*underscore*/
          {
            src: './bower_components/underscore/underscore-min.js',
            dest: './app/js/vendor/underscore-min.js'
          }, {
            src: './bower_components/underscore/underscore-min.map',
            dest: './app/js/vendor/underscore-min.map'
          },
          /*Bootstrap*/
          {
            src: '*.*',
            dest: './app/fonts',
            cwd: './bower_components/bootstrap/dist/fonts',
            expand: true
          }, {
            src: '**/*.*',
            dest: './app/less/bootstrap',
            cwd: './bower_components/bootstrap/less',
            expand: true
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      myApp: ['./Gruntfile.js', './app/js/**/*.js']
    },
    less: {
      myApp: {
        files: [{
          src: './app/less/styles/style.less',
          dest: './app/css/styles.css'
        }, {
          src: './app/less/bootstrap/bootstrap.less',
          dest: './app/css/bootstrap.css'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['./app/js/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['./app/less/**/*.less'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      myApp: {
        port: 9000,
        base: './app'
      }
    },
    requirejs: {
      js: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: 'app/js/rjsConfig.js',
          deps: ['main', 'app', 'routes'],
          out: 'app/js/myApp.js',
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('firstrun', ['clean:myApp', 'copy:myApp']);
  grunt.registerTask('default', ['clean:js', 'jshint', 'less', 'requirejs', 'watch']);
  grunt.registerTask('seedcommit', ['clean:seed', 'clean:js']);
  grunt.registerTask('unit', ['karma:unit']);
};