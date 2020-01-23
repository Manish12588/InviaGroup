// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/Test.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 250000
  },

  // Assign the test reporter to each running instance
  onPrepare: function () {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(60000);
  }

};


