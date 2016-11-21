const events = require('events');
const loader = require('cli-loader')({ interval: 100 });
const Table = require('cli-table');
const colors = require('colors');

function newResultSet() {
  return {
    passing: 0,
    pending: 0,
    failing: 0,
    errors: [],
  };
}

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
    this.passing = 0;
    this.pending = 0;
    this.failing = 0;
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
    });

    this.on('suite:start', (suite) => {
      if (this.currentCid !== suite.cid) {
        this.currentCid = suite.cid;
        this.currentTitle = suite.title;
        this.results[suite.cid] = newResultSet();
      }
    });

    this.on('suite:end', (suite) => {
      // If we reach the end of the main suite
      if (this.currentTitle === suite.title) {
        const result = this.results[suite.cid];
        if (result.errors.length) {
          this.out.write(colors.red.bold(suite.title));
          result.errors.forEach((error) => {
            this.out.write(colors.red(error));
            this.out.write('\n');
          });
        } else if (result.pending) {
          this.out.write(colors.yellow.bold(suite.title));
        } else {
          this.out.write(colors.green.bold(suite.title));
        }
      }
    });

    this.on('test:start', (test) => {
      this.total++;
    });

    this.on('test:end', (test) => {
      console.log('test:end', test);
    });

    this.on('test:pass', (test) => {
      this.passing++;
      this.results[test.cid].passing++;
    });

    this.on('test:pending', (test) => {
      this.pending++;
      this.results[test.cid].pending++;
    });

    this.on('test:fail', (test) => {
      this.failing++;
      this.results[test.cid].failing++;
      this.results[test.cid].errors.push(test.error);
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
