import GeneratorBlueprint from './generatorBlueprint';
import { info, normalizeDuckName } from '../util/textHelper';

class ReduxDuck extends GeneratorBlueprint {
  constructor(duckName, settings) {
    super();
    this.componentName = normalizeDuckName(duckName);
    this.settings = settings;
  }

  infoMessage() {
    info(`Generating new Redux Duck named: ${this.componentName}`);
  }

  generatorArgs() {
    const creationPath = this.settings.getSetting('duckPath');
    return {
      settings: this.settings,
      templatePath: '/templates/duck.js',
      testTemplatePath: '/templates/duck.test.js',
      componentName: this.componentName,
      creationPath
    };
  }
}

export default ReduxDuck;
