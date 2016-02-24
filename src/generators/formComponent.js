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

  renderArgs() {
    return {
      name: this.componentName
    };
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('formPath');

    return {
      settings: this.settings,
      renderArgs: this.renderArgs(),
      templatePath: '/templates/Form.js',
      testTemplatePath: '/templates/Form.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default FormComponent;
