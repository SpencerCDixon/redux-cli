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
    const creationPath = this.settings.getSetting('dumbPath');
    const wrapFilesInFolders = this.settings.getSetting('wrapFilesInFolders');

    return {
      settings: this.settings,
      templatePath: '/templates/Dumb.js',
      testTemplatePath: '/templates/Dumb.test.js',
      componentName: this.componentName,
      wrapFilesInFolders,
      creationPath
    };
  }
}

export default DumbComponent;
