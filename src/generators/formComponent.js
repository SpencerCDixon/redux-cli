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
    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('formPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    return {
      templatePath: '/templates/Form.js',
      testTemplatePath: '/templates/Form.test.js',
      componentName: this.componentName,
      testCreationPath,
      creationPath,
      extension,
      sourceBase
    };
  }
}

export default FormComponent;
