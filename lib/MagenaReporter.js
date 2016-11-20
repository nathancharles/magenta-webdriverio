const events = require('events');

/**
 * Initialize a new `Magenta` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */
class MagenaReporter extends events.EventEmitter {
  constructor(baseReporter, config, options = {}) {
    super();

    this.baseReporter = baseReporter;
    this.config = config;

    this.out = options.out;
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
    this.pending = 0;
    this.duration = 0;
    this.results = {};
    this.currentCid = null;
    this.currentTitle = null;

    this.on('runner:start', () => {
      // loader.start();
    });

    this.on('runner:end', () => {
      // loader.stop();
      // Show table
      console.log(`Pending: ${this.pending}`);
      console.log(`Failed: ${this.fail}`);
      console.log(`Passed: ${this.pass}`);
    });

    this.on('error', (error) => {
      console.log(error);
    })

    this.on('suite:start', (suite) => {
      if (this.currentCid !== suite.cid) {
        this.currentCid = suite.cid;
      }
      console.log('suite:start', suite);
    });

    this.on('suite:end', (suite) => {
      console.log('suite:end', suite);
    });

    this.on('test:start', (test) => {
      console.log('test:start', test);
    });

    this.on('test:end', (test) => {
      console.log('test:end', test);
    });

    this.on('test:pass', (test) => {
      console.log('test:pass', test);
      pass += 1;
    });

    this.on('test:fail', (test) => {
      console.log('test:fail', test);
      fail += 1;
    });

    this.on('test:pending', (test) => {
      console.log('test:pending', test);
      pending += 1;
    });
  }

  static get reporterName() {
    return 'Magenta';
  }
}

/**
 * Expose Custom Reporter
 */
exports = module.exports = MagenaReporter;
