import path from 'path';
import jf from 'jsonfile';
import { pwd } from 'shelljs';
import rc from 'rc';

/*
  Look into using Yam for finding settings so it will get the first
  .reduxrc it finds and use that for project settings just like how
  eslintrc and ember-cli works.
*/

/*
  2.0 TODO

  Use rc to enable multiple .reduxrc files to be located and merged into a
  single object.

  rc: https://www.npmjs.com/package/rc
*/

export default class ProjectSettings {
    // public & tested - maintain in 2.0
    constructor(defaultSettings = {}, args = null ) {
        this.defaultSettings = defaultSettings;
        this.args = args;
        this.loadSettings();
    }

    // internal & tested
    // from #constructor
    loadSettings() {
        this.settings = rc('redux', this.defaultSettings, this.args);
        // if the config file list is empty, and the config is only the default
        // maybe save or prompt to save the default config file
    }

    // internal & tested - maintain in 2.0
    // #settingsExist
    // #save
    settingsPath() {
        return path.join(pwd(), '.reduxrc');
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
    saveDefaults(defaultSettings = this.defaultSettings ) {
        jf.writeFileSync(this.settingsPath(), defaultSettings);
    }
}
