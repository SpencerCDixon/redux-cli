import path from 'path';
import fse from 'fs-extra';
import fs from 'fs';
import FileInfo from 'models/file-info';
import MockUI from '../helpers/mock-ui';
import { expectFileToNotExist } from '../helpers/fs-helpers';

const originalPath = path.join(__dirname, '..', 'fixtures', 'file-info-template.txt');
const mappedPath = path.join(__dirname, '..', '..', 'tmp', 'path-to-overwrite.txt');
const ui = new MockUI('DEBUG');

describe('(Model) FileInfo', function() {
  beforeEach(function() {
    ui.clear();
  });

  describe('#isFile', function() {
    it('return true if original path is a file', function() {
      const info = new FileInfo({
        templateVariables: {},
        ui,
        originalPath,
        mappedPath
      });
      expect(info.isFile()).to.be.true;
    });

    it('returns false if original path is bogus', function() {
      const info = new FileInfo({
        templateVariables: {},
        ui,
        originalPath: path.join(__dirname, 'bogus', 'path', 'here'),
        mappedPath
      });
      expect(info.isFile()).to.be.false;
    });
  });

  describe('#writeFile', function() {
    context('when file already exists', function() {
      it('throws warning to ui and doesnt overwrite old file', function() {
        fse.outputFileSync(mappedPath, 'some contennt');

        const info = new FileInfo({
          templateVariables: {},
          ui, originalPath, mappedPath
        });
        info.writeFile();
        expect(ui.errors).to.match(/Not writing file/);
        fse.remove(mappedPath);
      });
    });

    context('when no file exists', function() {
      it('writes the file', function() {
        const info = new FileInfo({
          templateVariables: {name: 'rendered ejs string'},
          ui,
          originalPath,
          mappedPath
        });
        info.writeFile();

        const expectedString = 'rendered ejs string\n';
        const actualString = fs.readFileSync(mappedPath, 'utf8');
        expect(expectedString).to.eql(actualString);
        expect(ui.output).to.match(/create/);
        fse.remove(mappedPath);
      });
    });

    context('when dry run option is enabled', function() {
      it('should not write the file', function() {
        const info = new FileInfo({
          templateVariables: {name: 'rendered ejs string'},
          ui, originalPath, mappedPath
        });
        info.writeFile(true);

        expectFileToNotExist(mappedPath);
        expect(ui.output).to.match(/would create/);
      });
    });
  });

  describe('#renderTempalte', function() {
    it('renders ejs template with the template variables', function() {
      const info = new FileInfo({
        templateVariables: {name: 'rendered ejs string'},
        ui,
        originalPath,
        mappedPath
      });
      const expectedString = 'rendered ejs string\n';
      expect(info.renderTemplate()).to.eq(expectedString);
    });
  });
});
