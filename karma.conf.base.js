// Karma configuration
// Generated on Mon Jun 08 2015 15:45:45 GMT-0700 (PDT)

module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha', 'chai', 'commonjs'],

  // list of files / patterns to load in the browser
  files: [
    'src/**/*.js',
    'polyfill/**/*.js',
    'test/**/*.js'
  ],

  // list of files to exclude
  exclude: [
    'src/**/bundle.js'
  ],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'src/**/*.js': ['coverage', 'commonjs'],
    'polyfill/**/*.js': ['commonjs'],
    'test/**/*.js': ['commonjs']
  },

  coverageReporter: {
    reporters: [{
      type: 'lcov',
      dir:'coverage/'
    }, {
      type: 'json',
      dir:'coverage/',
      file : 'coverage.json'
    }]
  },

  thresholdReporter: {
    statements: 100,
    branches: 100,
    functions: 100,
    lines: 100
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress', 'coverage', 'threshold'],

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true
};
