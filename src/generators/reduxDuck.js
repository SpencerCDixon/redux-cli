import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeDuckName } from '../util/text-helper';

class ReduxDuck extends GeneratorBlueprint {
  constructor(duckName, settings) {
    super();
    this.componentName = normalizeDuckName(duckName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Redux Duck named: ${this.componentName}`);
  }

  renderArgs() {
    return {
      name: this.componentName
    };
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('duckPath');
    return {
      settings: this.settings,
      renderArgs: this.renderArgs(),
      templatePath: '/templates/duck.js',
      testTemplatePath: '/templates/duck.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default ReduxDuck;
