import commander from 'commander';

import ProjectSettings from '../projectSettings';
import Generator from '../generator';
import { info } from '../util/textHelper';
import { version } from '../version';

class ReduxDuck {
  constructor(duckName) {
    this.duckName = duckName;
    this.settings = new ProjectSettings();
  }

  generate() {
    console.log(info(`Generating new Redux Duck named: ${this.duckName}`));

    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('duckPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    const args = {
      templatePath: '/templates/duck.js',
      testTemplatePath: '/templates/duck.test.js',
      componentName: this.duckName,
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };

    const generator = new Generator(args);
    generator.generate();
  }
}

commander
  .version(version())
  .arguments('<duckName>')
  .action(name => {
    const duck = new ReduxDuck(name);
    duck.generate();
  })
  .parse(process.argv);
