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
    const { sourceBase, creationPath,
            extension, testCreationPath } = this.settings.getAllSettings();

    return {
      templatePath: '/templates/Form.js',
      testTemplatePath: '/templates/Form.test.js',
      componentName: this.componentName,
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };
  }
}

export default FormComponent;
