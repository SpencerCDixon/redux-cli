import ProjectSettings from 'models/project-settings';
import fs from 'fs';
import config from 'config';

const { basePath } = config;
const settingsPath = basePath + '/.blueprintrc';

describe('ProjectSettings', () => {
  // this is the local path.  intended to be root of a particular directory
  describe('#settingsPath', () => {
    it('returns current directory with .blueprintrc appended', () => {
      const settings = new ProjectSettings();
      expect(settings.settingsPath()).to.eql(settingsPath);
    });
  });

  describe('#loadSettings', () => {
    it('loads settings from $CWD/.blueprintrc', () => {
      const settings = new ProjectSettings();
      expect(settings.getSetting('location')).to.eql('project');
    });

    // inject a ENV variable and load settings.
    it('loads settings from .blueprintrc defined in process.env', () => {
      process.env['blueprint_config'] = 'test/fixtures/env.blueprintrc';
      const settings = new ProjectSettings();
      expect(settings.getSetting('envConfig')).to.eql('Environment');
      delete process.env['blueprint_config'];
      // expect the file to be in the path of config files too
    });

    // inject an ARGV and load settings.
    it('loads settings from .blueprintrc defined as ARGV', () => {
      const fakeArgv = { config: 'test/fixtures/argv.blueprintrc' };
      const defaultSettings = { defaultOption: true };
      const argvSettings = new ProjectSettings(defaultSettings, fakeArgv);
      expect(argvSettings.getSetting('argvConfig')).to.eql('ARGV');
    });

    it('collects __defaults__ in allConfigs', () => {
      const defaultSettings = { defaultOption: true };
      const argvSettings = new ProjectSettings(defaultSettings);
      expect(argvSettings.allConfigs()['__default__']).to.eql(defaultSettings);
    });

    it('collects all configurations into a object', () => {
      process.env['blueprint_config'] = 'test/fixtures/env.blueprintrc';
      const fakeArgv = { config: 'test/fixtures/argv.blueprintrc' };
      const defaultSettings = { defaultOption: true };
      const allSettings = new ProjectSettings(defaultSettings, fakeArgv);
      const fileCount = allSettings.settings.configs.length;

      expect(allSettings.configChunks.length).to.eql(fileCount);
      expect(Object.keys(allSettings.allConfigs()).length).to.eql(
        fileCount + 1
      );
      delete process.env['blueprint_config'];
    });

    it('collects all blueprints into an array of arrays', () => {
      // How many do we have before
      const baseline = new ProjectSettings().blueprintChunks.length;

      process.env['blueprint_config'] = 'test/fixtures/env.blueprintrc';
      const fakeArgv = { config: 'test/fixtures/argv.blueprintrc' };
      const defaultSettings = { defaultOption: true };
      const settings = new ProjectSettings(defaultSettings, fakeArgv);

      expect(settings.blueprintChunks.length).to.eql(baseline + 2);
      delete process.env['blueprint_config'];
    });
  });

  describe('#getSetting', () => {
    it('returns the value of that setting', () => {
      const mockedSettings = {
        testOne: 'works',
        testTwo: 'works as well!'
      };
      const settings = new ProjectSettings(mockedSettings);

      expect(settings.getSetting('testOne')).to.eql('works');
      expect(settings.getSetting('testTwo')).to.eql('works as well!');
    });
  });

  // shouldn't need a file save to do this.  plain getter
  describe('#getAllSettings', () => {
    it('returns json of all settings', () => {
      const mockedSettings = {
        testOne: 'works',
        testTwo: 'works as well!'
      };
      const settings = new ProjectSettings(mockedSettings);
      const { testOne, testTwo } = settings.getAllSettings();
      expect(testOne).to.eql('works');
      expect(testTwo).to.eql('works as well!');
    });
  });

  // deprecate for uselessness?
  describe('#setSetting', () => {
    it('sets new settings', () => {
      const mockedSettings = { testOne: 'works' };
      const settings = new ProjectSettings(mockedSettings);
      expect(settings.getSetting('testOne')).to.eql('works');

      settings.setSetting('testOne', 'new setting');
      expect(settings.getSetting('testOne')).to.eql('new setting');
    });
  });

  describe('#setAllSettings', () => {
    it('takes a javascript object and overrides current settings', () => {
      const preWrittenSettings = { testOne: 'some information' };
      const settings = new ProjectSettings(preWrittenSettings);
      expect(settings.getSetting('testOne')).to.eql('some information');
      const overrideAll = {
        testOne: 'new information',
        anotherKey: 'with some value'
      };
      settings.setAllSettings(overrideAll);
      expect(settings.getAllSettings()).to.eql(overrideAll);
    });
  });

  describe('#saveDefault', () => {
    it('saves the current settings to the file', () => {
      const tmpPath = '/tmp/.blueprintrc';
      const defaults = { testSaveDefault: 'new setting' };
      const settings = new ProjectSettings(defaults);
      settings.saveDefaults(defaults, tmpPath);
      const newFile = fs.readFileSync(tmpPath, 'utf8');
      expect(newFile).to.match(/testSaveDefault.+new setting/);
    });
  });

  describe('#configFiles', () => {
    it('returns an array of all config files read', () => {
      process.env['blueprint_config'] = 'test/fixtures/env.blueprintrc';
      const fakeArgv = { config: 'test/fixtures/argv.blueprintrc' };
      const defaultSettings = { defaultOption: true };
      const settings = new ProjectSettings(defaultSettings, fakeArgv);
      const expectedFiles = [
        settingsPath,
        basePath + '/test/fixtures/argv.blueprintrc',
        basePath + '/test/fixtures/env.blueprintrc'
      ];
      expect(settings.configFiles()).to.include.members(expectedFiles);
    });
  });
  describe('#blueprints', () => {
    it('returns a BlueprintCollection', () => {
      process.env['blueprint_config'] = 'test/fixtures/env.blueprintrc';
      const fakeArgv = { config: 'test/fixtures/argv.blueprintrc' };
      const defaultSettings = { defaultOption: true };
      const settings = new ProjectSettings(defaultSettings, fakeArgv);
      const blueprintPaths = settings.blueprints.searchPaths;
      const expectedFiles = [
        basePath + '/blueprints',
        basePath + '/test/fixtures/blueprints'
      ];
      expect(blueprintPaths).to.include.members(expectedFiles);
    });
  });
});
