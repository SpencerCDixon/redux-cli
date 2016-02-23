import { info } from '../util/textHelper';

const schema = {
  properties: {
    sourceBase: {
      description: info('Path to your source code?', false),
      type: 'string',
      required: true
    },
    testPath: {
      description: info('What is the path to your test folder?', false),
      type: 'string',
      required: true
    },
    smartPath: {
      description: info('Where is path to Smart/Container Components?', false),
      type: 'string',
      required: true
    },
    dumbPath: {
      description: info('Where is path to Dumb/Pure Components?', false),
      type: 'string',
      required: true
    },
    formPath: {
      description: info('Where is path to Form Components?', false),
      type: 'string',
      required: true
    },
    fileExtension: {
      description: info('Do you use .js or .jsx for your React components? (js|jsx)', false),
      type: 'string',
      required: true,
      pattern: /(js|jsx)/
    },
    duckPath: {
      description: info('Where is path to your redux Ducks? If none, leave blank.', false),
      type: 'string'
    },
    reducerPath: {
      description: info('Where is path to your reducers?', false),
      type: 'string'
    }
  }
};

export default schema;
