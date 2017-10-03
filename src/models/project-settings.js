import path from 'path';
import jf from 'jsonfile';
import { pwd } from 'shelljs';
import rc from 'rc';
import cc from 'rc/lib/utils';
import _zipObject from 'lodash/zipObject';
import _map from 'lodash/map';

import BlueprintCollection, {
  parseBlueprintSetting
} from './blueprint-collection';

export default class ProjectSettings {
  // public & tested - maintain in 2.0
  constructor(defaultSettings = {}, args = null) {
    this.defaultSettings = defaultSettings;
    this.args = args;
    this.blueprintChunks = [];
    this.configChunks = [];
    this.myParse = this.myParse.bind(this);
    this.saveDefaults = this.saveDefaults.bind(this);
    this.loadSettings();
    this.blueprints = new BlueprintCollection(
      _zipObject(this.configDirs(), this.blueprintChunks)
    );
  }

  configDirs() {
    return _map(this.configFiles(), configFile => path.dirname(configFile));
  }

  configFiles() {
    return _map(this.settings.configs, configFile => path.resolve(configFile));
  }

  allConfigs() {
    const configs = _zipObject(this.settings.configs, this.configChunks);
    configs['__default__'] = this.defaultSettings;
    return configs;
  }

  // internal & tested
  // from #constructor
  loadSettings() {
    const startingSettings = JSON.parse(JSON.stringify(this.defaultSettings));
    this.settings = rc('blueprint', startingSettings, this.args, this.myParse);
  }

  // internal & tested - maintain in 2.0
  // #settingsExist
  // #save
  settingsPath() {
    return path.join(pwd(), '.blueprintrc');
  }

  //public & tested - maintain in 2.0
  getSetting(key) {
    return this.settings[key];
  }

  //public & tested - maintain in 2.0
  getAllSettings() {
    return this.settings;
  }

  //deprecate.  can't see the use of this, especially with nested settings
  //unused & tested
  setSetting(key, val) {
    this.settings[key] = val;
  }

  //internal & tested - maintain in 2.0
  setAllSettings(json) {
    this.settings = json;
  }

  // public - maintain in 2.0
  saveDefaults(defaultSettings = this.defaultSettings, savePath = false) {
    jf.writeFileSync(savePath || this.settingsPath(), defaultSettings);
  }

  // wrap the default rc parsing function with this
  // By default rc returns everything merged.  Keeping
  // track of chunks allows us to associate a config
  // with the .blueprintrc file it came out of.
  myParse(rawContent) {
    const content = cc.parse(rawContent);
    this.configChunks.unshift(content);
    this.blueprintChunks.unshift(parseBlueprintSetting(content));
    return content;
  }
}
