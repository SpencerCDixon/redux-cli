import { info } from '../util/textHelper';

const schema = {
  properties: {
    sourceBase: {
      description: info('Path to your source code?'),
      type: 'string',
      required: true
    },
    testPath: {
      description: info('What is the path to your test folder?'),
      type: 'string',
      required: true
    },
    smartPath: {
      description: info('Where is path to Smart/Container Components?'),
      type: 'string',
      required: true
    },
    dumbPath: {
      description: info('Where is path to Dumb/Pure Components?'),
      type: 'string',
      required: true
    },
    formPath: {
      description: info('Where is path to Form Components?'),
      type: 'string',
      required: true
    },
    fileExtension: {
      description: info('Do you use .js or .jsx for your React components? (js|jsx)'),
      type: 'string',
      required: true,
      pattern: /(js|jsx)/
    },
    duckPath: {
      description: info('Where is path to your redux Ducks? If none, leave blank.'),
      type: 'string'
    },
    reducerPath: {
      description: info('Where is path to your reducers?'),
      type: 'string'
    }
  }
};

export default schema;
