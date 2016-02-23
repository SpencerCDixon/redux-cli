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
    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('smartPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    return {
      templatePath: '/templates/Smart.js',
      testTemplatePath: '/templates/Smart.test.js',
      componentName: this.componentName,
      testCreationPath,
      creationPath,
      extension,
      sourceBase
    };
  }
}

export default SmartComponent;
