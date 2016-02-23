import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/textHelper';

export class DumbComponent extends GeneratorBlueprint {
  constructor(componentName, settings) {
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
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };
  }
}
