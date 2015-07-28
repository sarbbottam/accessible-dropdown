/*jshint camelcase: false*/
'use strict';

module.exports = function(grunt) {

  grunt.registerTask('dev', 'watches for changes & triggers build', function() {

    grunt.initConfig({
      watch: {
        js: {
          files: [
            'tasks/**/*.js',
            'src/**/*.js',
            'test/**/*.js',
            'example/**/*.js',
            '!example/main.js'
          ],
          tasks: ['js'],
          options: {
            livereload: true
          }
        }
      }
    });

    grunt.task.run('watch');

  });

};
