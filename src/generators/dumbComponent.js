import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeComponentName } from '../util/text-helper';

class DumbComponent extends GeneratorBlueprint {
  constructor(componentName, topType, settings) {
    super();
    this.componentName = normalizeComponentName(componentName);
    this.topType = topType;
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Dumb Component named: ${this.componentName}`);
  }

  renderArgs() {
    return {
      name: this.componentName,
      topType: this.topType
    };
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('dumbPath');

    return {
      settings: this.settings,
      renderArgs: this.renderArgs(),
      templatePath: '/templates/Dumb.js',
      testTemplatePath: '/templates/Dumb.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default DumbComponent;
