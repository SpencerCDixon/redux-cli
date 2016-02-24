import Generator from './generator';

class GeneratorBlueprint {
  run() {
    this.infoMessage();

    const generator = new Generator(this.generatorArgs());
    generator.generate();
  }

  infoMessage() {
    throw new Error(
      'Must implement an info message so users know what the generator is going to do'
    );
  }

  generatorArgs() {
    throw new Error(
      'Must implement generator args that get passed to the generator to create the files'
    );
  }

  renderArgs() {
    throw new Error(
      'Must implement render args which get passed to the ejs template'
    );
  }
}

export default GeneratorBlueprint;
