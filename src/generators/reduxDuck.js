import GeneratorBlueprint from './generatorBlueprint';
import { info } from '../util/textHelper';

class ReduxDuck extends GeneratorBlueprint {
  constructor(duckName, settings) {
    super();
    this.componentName = duckName;
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Redux Duck named: ${this.componentName}`);
  }

  generatorArgs() {
    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('duckPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    return {
      templatePath: '/templates/duck.js',
      testTemplatePath: '/templates/duck.test.js',
      componentName: this.componentName,
      creationPath,
      testCreationPath,
      extension,
      sourceBase
    };
  }
}

export default ReduxDuck;
