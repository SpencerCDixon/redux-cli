import GeneratorBlueprint from 'generators/generatorBlueprint';

describe('GeneratorBlueprint', () => {
  describe('#run', () => {
    it('calls infoMessage first', () => {
      const blueprint = new GeneratorBlueprint();
      sinon.stub(blueprint, 'infoMessage');

      try {
        blueprint.run();
      } catch (e) {
        expect(blueprint.infoMessage.calledOnce).to.be.true;
      }
    });

    it('creates new Generator with generatorArgs', () => {
      const blueprint = new GeneratorBlueprint();
      sinon.stub(blueprint, 'infoMessage');
      sinon.stub(blueprint, 'generatorArgs');

      try {
        blueprint.run();
      } catch (e) {
        expect(blueprint.generatorArgs.calledOnce).to.be.true;
      }
    });
  });

  describe('methods to be overridden', () => {
    const blueprint = new GeneratorBlueprint();

    describe('#infoMessage', () => {
      it('should throw error with message to blueprint builder', () => {
        expect(() => blueprint.infoMessage()).to.throw;
      });
    });

    describe('#generatorArgs', () => {
      it('should throw error with message to blueprint builder', () => {
        expect(() => blueprint.generatorArgs()).to.throw;
      });
    });
  });
});
