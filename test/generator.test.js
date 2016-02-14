import Generator from 'generator';
// import fs from 'fs';
import config from 'config';
import path from 'path';

const { basePath } = config;

describe('Generator', () => {
  const templatePath = '/components/Dumb.js';
  const sourceBase = './src';
  // const creationPath = '/components';
  // const componentName = 'Example';

  describe('#generate', () => {
    // it('throws error if file already exists in location', () => {
      // const args = {
        // templatePath,
        // creationPath,
        // componentName
      // };
      // const generator = new Generator(args);
      // const finalPath = generator.componentPath();
      // fs.writeFileSync(finalPath, 'already created file');

      // const fn = () => { generator.generate(); };
      // expect(fn).to.throw;
      // fs.unlinkSync(finalPath);
    // });
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
});
