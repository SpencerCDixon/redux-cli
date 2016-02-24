import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/textHelper';

class FormComponent extends GeneratorBlueprint {
  constructor(componentName, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Form Component named: ${this.componentName}`);
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('formPath');
    const wrapFilesInFolders = this.settings.getSetting('wrapFilesInFolders');

    return {
      settings: this.settings,
      templatePath: '/templates/Form.js',
      testTemplatePath: '/templates/Form.test.js',
      componentName: this.componentName,
      wrapFilesInFolders,
      creationPath
    };
  }
}

export default FormComponent;
