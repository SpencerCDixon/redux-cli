import commander from 'commander';
import { version } from '../version';

import Blueprint from '../models/blueprint';
import config from '../config';
import path from 'path';

commander.on('--help', () => {
  // console.log('  Examples:');
  // console.log('');
  // console.log('    $ redux g dumb SimpleComponent');
  // console.log('    $ redux g dumb SimpleButton button');
  // console.log('    $ redux g smart CommentContainer');
  // console.log('    $ redux g smart CommentContainer div');
  // console.log('');
});

commander
  .version(version())
  .arguments('<generator name> [component name] [top level type]')
  .description('generates code based off a blueprint')
  .action((generatorName, compName, topType) => {
    const blueprintPath = path.resolve(config.basePath, 'blueprints/smart')
    console.log('path is: ', blueprintPath);
    Blueprint.load(blueprintPath);
  })
  .parse(process.argv);


