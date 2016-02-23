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
    const creationPath = this.settings.getSetting('smartPath');

    return {
      settings: this.settings,
      templatePath: '/templates/Smart.js',
      testTemplatePath: '/templates/Smart.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default SmartComponent;
