import ProjectSettings from 'ProjectSettings';
import fs from 'fs';
import path from 'path';

const settingsPath = process.env['PWD'] + '/.reduxrc';

describe('ProjectSettings', () => {
  describe('#settingsPath', () => {
    it('returns current directory with .reduxrc appended', () => {
      const settings = new ProjectSettings();
      expect(settings.settingsPath()).to.eql(settingsPath);
    });
  });

  describe('#settingsExist', () => {
    const settings = new ProjectSettings();

    it('returns true when settings exist', () => {
      fs.writeFileSync('.reduxrc', 'settings');
      expect(settings.settingsExist()).to.be.true;
      fs.unlinkSync('.reduxrc');
    });

    it('returns false when settings arnt present', () => {
      expect(settings.settingsExist()).to.be.false;
    });
  });
});
