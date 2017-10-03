import prettyjson from 'prettyjson';
import SubCommand from '../models/sub-command';

class Config extends SubCommand {
  constructor() {
    super();
  }

  printUserHelp() {
    this.ui.write('config command to display current configuration');
  }

  run() {
    const finalConfig = Object.assign({}, this.settings.settings);
    delete finalConfig.configs;
    delete finalConfig.allConfigs;
    delete finalConfig['_'];
    this.ui.write(this.cliLogo() + '\n');
    this.ui.writeInfo('Config Files');
    console.log(prettyjson.render(this.settings.settings.configs, {}, 8));
    // this.settings.settings.configs.forEach(configFile => {this.ui.writeInfo(`  * ${configFile}`)})
    this.ui.writeInfo('Config Data');
    console.log(prettyjson.render(finalConfig, {}, 10));
    this.ui.writeInfo('Blueprint Paths');
    console.log(prettyjson.render(this.settings.blueprints.searchPaths, {}, 8));
    this.ui.writeInfo('Blueprints');
    console.log(prettyjson.render(this.settings.blueprints.allNames(), {}, 8));
  }
}

export default Config;
