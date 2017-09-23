import ProjectSettings from 'models/project-settings';
import fs from 'fs';
import fse from 'fs-extra';
import config from 'config';
import { fileExists } from 'util/fs';

const { basePath } = config;
const settingsPath = basePath + '/.reduxrc';

describe('ProjectSettings', () => {
    beforeEach(() => {
        fileExists(settingsPath) && fse.removeSync(settingsPath);
    });

    afterEach(() => {
        fileExists(settingsPath) && fse.removeSync(settingsPath);
    });
    const settings = new ProjectSettings();


    // this is the local path.  intended to be root of a particular directory
    describe('#settingsPath', () => {
        it('returns current directory with .reduxrc appended', () => {
            expect(settings.settingsPath()).to.eql(settingsPath);
        });
    });

    describe('#loadSettings', () => {
        it('loads settings from $CWD/.reduxrc', () => {
            fs.writeFileSync(
                settingsPath, JSON.stringify({ test: 'works!' })
            );
            const settings = new ProjectSettings();
            expect(settings.getSetting('test')).to.eql('works!');
        });

        // inject a ENV variable and load settings.
        it('loads settings from .reduxrc defined in process.env', () => {
            process.env['redux_config'] = 'test/fixtures/env.reduxrc';
            const settings = new ProjectSettings();
            expect(settings.getSetting('envConfig')).to.eql('Environment');
            // expect the file to be in the path of config files too
        });

        // inject an ARGV and load settings.
        it('loads settings from .reduxrc defined as ARGV', () => {
            const fakeArgv = { config: basePath + '/test/fixtures/argv.reduxrc'};
            const defaultSettings = { defaultOption: true };
            const argvSettings = new ProjectSettings(defaultSettings, fakeArgv);
            expect(argvSettings.getSetting('argvConfig')).to.eql('ARGV');
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
            const defaults = {"testSaveDefault": "new setting"};
            const settings = new ProjectSettings(defaults);
            settings.saveDefaults();
            const newFile = fs.readFileSync(settingsPath, 'utf8');
            expect(newFile).to.match(/testSaveDefault/);
            expect(newFile).to.match(/new setting/);
        });
    });
});
