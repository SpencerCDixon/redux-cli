import commander from 'commander';

import ProjectSettings from '../projectSettings';
import Generator from '../generator';
import { info } from '../util/textHelper';
import { version } from '../version';

class DumbComponent {
  constructor(componentName) {
    this.componentName = componentName;
    this.settings = new ProjectSettings();
  }

  generate() {
    console.log(info(`Generating new component... ${this.componentName}`));

    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('dumbPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    const args = {
      templatePath: '/templates/Dumb.js',
      testTemplatePath: '/templates/Dumb.test.js',
      componentName: this.componentName,
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
  .option('-f, --functional', 'create a stateless functional component instead of class extending')
  .arguments('<ComponentName>')
  .action(name => {
    const component = new DumbComponent(name);
    component.generate();
  })
  .parse(process.argv);
