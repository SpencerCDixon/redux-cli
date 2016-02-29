import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/text-helper';

class SmartComponent extends GeneratorBlueprint {
  constructor(componentName, topType, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.topType = topType;
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Smart Component named: ${this.componentName}`);
  }

  renderArgs() {
    return {
      name: this.componentName,
      topType: this.topType
    };
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('smartPath');

    return {
      settings: this.settings,
      renderArgs: this.renderArgs(),
      templatePath: '/templates/Smart.js',
      testTemplatePath: '/templates/Smart.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default SmartComponent;
