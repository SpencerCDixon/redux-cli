import chalk from 'chalk';

const schema = {
  properties: {
    sourceBase: {
      description: chalk.blue('Path to your source code? (relative from root)'),
      type: 'string',
      required: true
    },
    testBase: {
      description: chalk.blue('Path to your test code? (relative from root)'),
      type: 'string',
      required: true
    },
    smartPath: {
      description: chalk.blue('Where is path to Smart/Container Components?'),
      type: 'string',
      required: true
    },
    dumbPath: {
      description: chalk.blue('Where is path to Dumb/Pure Components?'),
      type: 'string',
      required: true
    },
    fileCasing: {
      description: chalk.blue('How do you want file casing to be configured? (default|snake|pascal|camel)'),
      pattern: /(default|snake|pascal|camel)/,
      required: true,
      type: 'string'
    }
  }
};

export default schema;
