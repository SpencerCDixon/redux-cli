import Generator from 'generator';
import fse from 'fs-extra';
import fs from 'fs';
import config from 'config';
import path from 'path';

const { basePath } = config;

describe('Generator', () => {
  const templatePath = '/components/Dumb.js';
  const sourceBase = './src';
  const creationPath = '/components';
  const componentName = 'Example';

  describe('#generate', () => {
    describe('when file already exists...', () => {
      const args = { templatePath, creationPath, componentName };
      const generator = new Generator(args);
      const finalPath = generator.componentPath();

      beforeEach(() => {
        fse.createFileSync(finalPath, 'already created file');
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

    it('creates component and test file', () => {
      const args = { templatePath, creationPath, componentName };
      const generator = new Generator(args);
      const compSpy = sinon.stub(generator, 'createComponent');
      const testSpy = sinon.stub(generator, 'createTest');

      generator.generate();
      expect(compSpy.calledOnce).to.be.true;
      expect(testSpy.calledOnce).to.be.true;
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
      const expectedPath = path.join(basePath, 'src/components/HelloWorld.jsx');
      expect(generator.componentPath()).to.eql(expectedPath);
    });

    it('defaults to .js if extension not given', () => {
      const withoutExtension = Object.assign({}, args, {extension: undefined});
      const generator = new Generator(withoutExtension);
      const expectedPath = path.join(basePath, 'src/components/HelloWorld.js');

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

      const expectedPath = 'src/components';
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
