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
        src: ['./css', './js/vendor', './fonts'],
        options: {
          force: true
        }
      },
      js: {
        src: ['./js/myApp.js'],
        options: {
          force: true
        }
      },
      seed: {
        src: ['./css', './js/vendor', './fonts', './less/bootstrap', './img'],
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
            dest: './js/vendor/angular.min.js'
          }, {
            src: './bower_components/angular/angular.min.js.map',
            dest: './js/vendor/angular.min.js.map'
          }, {
            src: './bower_components/angular/angular-csp.css',
            dest: './css/angular-csp.css'
          }, {
            src: './bower_components/angular-route/angular-route.min.js',
            dest: './js/vendor/angular-route.min.js'
          }, {
            src: './bower_components/angular-route/angular-route.min.js.map',
            dest: './js/vendor/angular-route.min.js.map'
          }, {
            src: './bower_components/angular-sanitize/angular-sanitize.min.js',
            dest: './js/vendor/angular-sanitize.min.js'
          }, {
            src: './bower_components/angular-sanitize/angular-sanitize.min.js.map',
            dest: './js/vendor/angular-sanitize.min.js.map'
          }, {
            src: './bower_components/angular-mocks/angular-mocks.js',
            dest: './js/vendor/angular-mocks.js'
          },
          /*jquery*/
          {
            src: './bower_components/jquery/dist/jquery.min.js',
            dest: './js/vendor/jquery.min.js'
          }, {
            src: './bower_components/jquery/dist/jquery.min.map',
            dest: './js/vendor/jquery.min.map'
          },
          /*Require JS*/
          {
            src: './bower_components/requirejs/require.js',
            dest: './js/vendor/require.js'
          }, {
            src: './bower_components/almond/almond.js',
            dest: './js/vendor/almond.js'
          },
          /*underscore*/
          {
            src: './bower_components/underscore/underscore-min.js',
            dest: './js/vendor/underscore-min.js'
          }, {
            src: './bower_components/underscore/underscore-min.map',
            dest: './js/vendor/underscore-min.map'
          },
          /*Bootstrap*/
          {
            src: '*.*',
            dest: './fonts',
            cwd: './bower_components/bootstrap/dist/fonts',
            expand: true
          }, {
            src: '**/*.*',
            dest: './less/bootstrap',
            cwd: './bower_components/bootstrap/less',
            expand: true
          }
        ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: "nofunc",
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          angular: true,
          define: true,
          jQuery: true,
          $: true,
          require: true,
          console: true, //For Testing
          _: true
        },
        reporter: require('jshint-stylish')
      },
      myApp: ['./Gruntfile.js', './js/**/*.js']
    },
    less: {
      myApp: {
        files: [{
          src: './less/styles/style.less',
          dest: './css/styles.css'
        }, {
          src: './less/bootstrap/bootstrap.less',
          dest: './css/bootstrap.css'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['./js/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['./less/**/*.less'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      myApp: {
        port: 9000
      }
    },
    requirejs: {
      js: {
        options: {
          baseUrl: './js',
          mainConfigFile: 'js/rjsConfig.js',
          deps: ['main', 'app', 'routes'],
          out: 'js/myApp.js',
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
  grunt.registerTask('seedcommit', ['clean:seed']);
  grunt.registerTask('unit', ['karma:unit']);
};