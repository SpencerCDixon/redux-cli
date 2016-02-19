import Generator from 'generator';
import fse from 'fs-extra';
import fs from 'fs';
import config from 'config';
import path from 'path';
import { expectFile } from './helpers/fsHelpers';

const { basePath, pkgBasePath } = config;

describe('Generator', () => {
  const templatePath = './tmp/templates/Dumb.js';
  const testTemplatePath = './tmp/templates/Dumb.test.js';
  const sourceBase = './tmp/src';
  const creationPath = '/components';
  const testCreationPath = './tmp/test';
  const componentName = 'Example';

  describe('#generate', () => {
    const args = {
      templatePath, creationPath, componentName,
      testTemplatePath, testCreationPath, sourceBase
    };

    const generator = new Generator(args);
    const finalPath = generator.componentPath();
    const finalTestPath = generator.componentTestPath();

    const finalTemplatePath = path.join(pkgBasePath, '..', templatePath);
    const finalTestTemplatePath = path.join(pkgBasePath, '..', testTemplatePath);

    describe('when file already exists...', () => {
      beforeEach(() => {
        fse.outputFileSync(finalPath, 'already created file');
      });

      afterEach(() => {
        fse.removeSync(finalPath);
      });

      it('throws error if file already exists in location', () => {
        expect(() => generator.generate()).to.throw(/Not going to generate/);
      });

      it('logs an error message', () => {
        sinon.stub(console, 'error');
        try {
          generator.generate();
        } catch (e) {
          expect(console.error.calledOnce).to.be.true;
        }
        console.error.restore();
      });
    });

    describe('when file doesnt exists...', () => {
      beforeEach(() => {
        fse.outputFileSync(finalTemplatePath, 'component <%= name %> template');
        fse.outputFileSync(finalTestTemplatePath, 'component <%= name %> template test');
      });

      afterEach(() => {
        fse.removeSync(finalTestPath);
        fse.removeSync(finalPath);
        fse.removeSync(finalTemplatePath);
        fse.removeSync(finalTestTemplatePath);
      });

      it('creates component and test file', () => {
        generator.generate();

        expectFile('tmp/src/components/Example.js', {
          contains: ['component Example template']
        });
        expectFile('tmp/test/components/Example.test.js', {
          contains: ['component Example template test']
        });
      });
    });
  });

  describe('#componentPath', () => {
    const args = {
      sourceBase,
      templatePath,
      creationPath: './components',
      componentName: 'HelloWorld',
      extension: 'jsx'
    };

    it('concats creationPath with componentName', () => {
      const generator = new Generator(args);
      const expectedPath = path.join(basePath, './tmp/src/components/HelloWorld.jsx');
      expect(generator.componentPath()).to.eql(expectedPath);
    });

    it('defaults to .js if extension not given', () => {
      const withoutExtension = Object.assign({}, args, {extension: undefined});
      const generator = new Generator(withoutExtension);
      const expectedPath = path.join(basePath, './tmp/src/components/HelloWorld.js');

      expect(generator.componentPath()).to.eql(expectedPath);
    });
  });

  describe('#componentTestPath', () => {
    const args = {
      sourceBase: './src',
      testCreationPath: './test',
      componentName: 'HelloWorld',
      creationPath: './components',
      extension: 'js'
    };

    it('concats testCreationPath with componentName and extension', () => {
      const generator = new Generator(args);
      const expectedPath = path.join(basePath, 'test/components/HelloWorld.test.js');

      expect(generator.componentTestPath()).to.eql(expectedPath);
    });
  });

  describe('#testDirPath', () => {
    it('concats test creation path with creation path to properly nest test folders', () => {
      const args = { testCreationPath: './test', creationPath: './components' };
      const generator = new Generator(args);

      const expectedPath = 'test/components';
      expect(generator.testDirPath()).to.eql(expectedPath);
    });
  });

  describe('#componentDirPath', () => {
    it('concats sourceBase with creationPath', () => {
      const args = { sourceBase, creationPath: './components' };
      const generator = new Generator(args);

      const expectedPath = 'tmp/src/components';
      expect(generator.componentDirPath()).to.eql(expectedPath);
    });
  });

  describe('#renderTemplate', () => {
    const templatePath = '/tmp/components/Dumb.js';
    const sourceBase = './tmp/src';
    const creationPath = '/components';
    const componentName = 'Example';
    const args = {
      templatePath,
      sourceBase,
      creationPath,
      componentName
    };

    it('renders an ejs template', () => {
      const finalPath = path.join(basePath, templatePath);
      fse.outputFileSync(finalPath, '<%= name %>');
      const generator = new Generator(args);

      const template = generator.renderTemplate(templatePath);
      expect(template).to.match(/Example/);
      fse.removeSync(finalPath);
    });
  });

  describe('creating component and test files', () => {
    const templatePath = '/tmp/components/Dumb.js';
    const sourceBase = './tmp/src';
    const creationPath = '/components';
    const testCreationPath = '/tmp/test';
    const componentName = 'Example';
    const args = {
      templatePath,
      sourceBase,
      creationPath,
      componentName,
      testCreationPath
    };
    const generator = new Generator(args);

    beforeEach(() => {
      sinon.spy(console, 'log');
    });

    afterEach(() => {
      console.log.restore();
    });

    describe('#createComponent', () => {
      it('renders template and writes it to componentPath', () => {
        sinon.stub(generator, 'renderTemplate').returns('component file');

        generator.createComponent();

        const file = fs.readFileSync(generator.componentPath(), 'utf8');
        expect(console.log.calledOnce).to.be.true;
        expect(file).to.eq('component file');

        fse.removeSync(generator.componentPath());
        generator.renderTemplate.restore();
      });
    });

    describe('#createTest', () => {
      it('renders template and write it to testPath', () => {
        sinon.stub(generator, 'renderTemplate').returns('test file');

        generator.createTest();

        const file = fs.readFileSync(generator.componentTestPath(), 'utf8');
        expect(console.log.calledOnce).to.be.true;
        expect(file).to.eq('test file');

        fse.removeSync(generator.componentTestPath());
        generator.renderTemplate.restore();
      });
    });
  });
});
