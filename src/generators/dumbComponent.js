import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/textHelper';

class DumbComponent extends GeneratorBlueprint {
  constructor(componentName, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Dumb Component named: ${this.componentName}`);
  }

  generatorArgs() {
    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('dumbPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    return {
      templatePath: '/templates/Dumb.js',
      testTemplatePath: '/templates/Dumb.test.js',
      componentName: this.componentName,
      testCreationPath,
      creationPath,
      extension,
      sourceBase
    };
  }
}

export default DumbComponent;
