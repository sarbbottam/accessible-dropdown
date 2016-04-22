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

var conf = Object.assign( require('./karma.conf.base.js'), {
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
    testName: 'accessible-dropdown'
  },
  captureTimeout: 120000,
  customLaunchers: customLaunchers,
  browsers: Object.keys(customLaunchers)
})

module.exports = function(config) {
  config.set(conf);
};
