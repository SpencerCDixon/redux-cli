import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/textHelper';

class SmartComponent extends GeneratorBlueprint {
  constructor(componentName, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Smart Component named: ${this.componentName}`);
  }

  generatorArgs() {
    const { sourceBase, creationPath,
            extension, testCreationPath } = this.settings.getAllSettings();

    return {
      templatePath: '/templates/Smart.js',
      testTemplatePath: '/templates/Smart.test.js',
      componentName: this.componentName,
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };
  }
}

export default SmartComponent;
