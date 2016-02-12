import { info } from '../util/textHelper';

const schema = {
  properties: {
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
    }
  }
};

export default schema;
