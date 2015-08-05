/*jshint camelcase: false*/
'use strict';

module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_InternetExplorer': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_FireFox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    }
  };

  grunt.registerTask('js', 'lint test & compile javascripts', function(target) {
    target = target || 'dev';
    grunt.initConfig({

      eslint: {
        options: {
          configFile: './.eslintrc'
        },
        js: [
          'Gruntfile.js',
          'tasks/*.js',
          'src/*.js',
          'polyfill/*.js',
          'test/*.js'
        ]
      },

      clean: ['coverage'],

      karma: {
        dev: {
          configFile: 'karma.conf.js'
        },
        ci: {
          configFile: 'karma.conf.js',
          coverageReporter: {
            reporters: [{
              type: 'lcov',
              dir: 'coverage/',
              subdir: '.'
            }, {
              type: 'json',
              dir: 'coverage/',
              subdir: '.',
              file: 'coverage.json'
            }]
          },
          junitReporter: {
            outputFile: 'test-results.xml',
            suite: ''
          },
          reporters: [
            'progress',
            'coverage',
            'threshold',
            'junit',
            'saucelabs'
          ],
          sauceLabs: {
            testName: pkg.name
          },
          captureTimeout: 120000,
          customLaunchers: customLaunchers,
          browsers: Object.keys(customLaunchers)
        }
      },

      browserify: {
        bundle: {
          src: ['example/common.js'],
          dest: 'example/main.js'
        }
      }

    });

    grunt.task.run(['eslint', 'clean', 'karma:' + target, 'browserify']);
    //grunt.task.run(['eslint', 'clean', 'browserify']);

  });

};
