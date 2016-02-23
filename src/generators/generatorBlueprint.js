import Generator from './generator';

class GeneratorBlueprint {
  run() {
    this.infoMessage();

    const generator = new Generator(this.generatorArgs());
    generator.generate();
  }

  infoMessage() {
    throw new Error('Must implement an info message');
  }

  generatorArgs() {
    throw new Error('Must implement generator args');
  }
}
