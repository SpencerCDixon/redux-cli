import chalk from 'chalk';

const schema = {
  properties: {
    sourceBase: {
      description: chalk.blue('Path to your source code?'),
      type: 'string',
      required: true
    },
    testBase: {
      description: chalk.blue('Path to your test code?'),
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
    formPath: {
      description: chalk.blue('Where is path to Form Components?'),
      type: 'string',
      required: true
    },
    duckPath: {
      description: chalk.blue('Where is path to your redux Ducks? If none, leave blank.'),
      type: 'string'
    },
    reducerPath: {
      description: chalk.blue('Where is path to your reducers?'),
      type: 'string'
    },
    fileExtension: {
      description: chalk.blue('Do you use .js or .jsx for your React components? (js|jsx)'),
      type: 'string',
      required: true,
      pattern: /(js|jsx)/
    },
    fileCasing: {
      description: chalk.blue('How do you want file casing to be configured? (default|snake|pascal|camel)'),
      pattern: /(default|snake|pascal|camel)/,
      required: true,
      type: 'string'
    },
    wrapFilesInFolders: {
      description: chalk.blue('Would you like your generated files wrapped in a folder? (true|false)'),
      required: true,
      type: 'boolean'
    }
  }
};

export default schema;
