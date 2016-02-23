import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/textHelper';

class ReduxDuck extends GeneratorBlueprint {
  constructor(componentName, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Redux Duck named: ${this.componentName}`);
  }

  generatorArgs() {
    const { sourceBase, creationPath,
            extension, testCreationPath } = this.settings.getAllSettings();

    return {
      templatePath: '/templates/duck.js',
      testTemplatePath: '/templates/duck.test.js',
      componentName: this.componentName,
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };
  }
}

export default ReduxDuck;
