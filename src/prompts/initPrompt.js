import chalk from 'chalk';

const schema = {
  properties: {
    sourceBase: {
      description: chalk.blue('Path to your source code?'),
      type: 'string',
      required: true
    },
    testPath: {
      description: chalk.blue('What is the path to your test folder?'),
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
    fileExtension: {
      description: chalk.blue('Do you use .js or .jsx for your React components? (js|jsx)'),
      type: 'string',
      required: true,
      pattern: /(js|jsx)/
    },
    duckPath: {
      description: chalk.blue('Where is path to your redux Ducks? If none, leave blank.'),
      type: 'string'
    },
    reducerPath: {
      description: chalk.blue('Where is path to your reducers?'),
      type: 'string'
    }
  }
};

export default schema;
