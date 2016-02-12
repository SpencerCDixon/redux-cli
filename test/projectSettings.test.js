import ProjectSettings from 'ProjectSettings';
import fs from 'fs';
import config from '../config';

const { basePath } = config;
const settingsPath = basePath + '/.reduxrc';
const templatePath = basePath + '/templates/.reduxrc';

describe('ProjectSettings', () => {
  const settings = new ProjectSettings();

  describe('#settingsPath', () => {
    it('returns current directory with .reduxrc appended', () => {
      expect(settings.settingsPath()).to.eql(settingsPath);
    });
  });

  describe('#settingsExist', () => {
    it('returns true when settings exist', () => {
      fs.writeFileSync('.reduxrc', 'settings');
      expect(settings.settingsExist()).to.be.true;
      fs.unlinkSync('.reduxrc');
    });

    it('returns false when settings arnt present', () => {
      expect(settings.settingsExist()).to.be.false;
    });
  });

  describe('#templatePath', () => {
    it('returns current directory with proper template appended', () => {
      expect(settings.templatePath()).to.eql(templatePath);
    });
  });

  describe('#buildFromTemplate', () => {
    it('doesnt have .reduxrc already present', () => {
      const fn = () => {
        fs.readFileSync(settingsPath);
      };

      expect(fn).to.throw;
    });

    it('copies .reduxrc in templates and makes copy in directory root', () => {
      settings.buildFromTemplate();

      const template = fs.readFileSync(templatePath);
      const rc = fs.readFileSync(settingsPath);

      expect(rc).to.not.be.undefined;
      expect(rc).to.eql(template);

      fs.unlinkSync(settingsPath);
    });
  });
});
