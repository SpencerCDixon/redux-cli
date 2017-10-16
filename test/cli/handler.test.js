import EventEmitter from 'events';
import { resetYargs } from 'cli/yargs';
import getHandler, {
  Handler,
  resolveCommandAlias,
  getCommands
} from 'cli/handler';

jest.mock('cli/yargs');

const yargsCommands = [
  ['blueprint <name> [options]', 'some description', false, ['bp']],
  ['duck <name>', 'some description', false, []]
];

const parser = {
  getUsageInstance: () => ({
    getCommands: () => yargsCommands
  })
};

describe('(CLI) Handler', () => {
  describe('#getHandler', () => {
    test('returns a Handler', () => {
      const handler = getHandler();
      expect(handler).toBeInstanceOf(Handler);
    });
    test('returns a singleton', () => {
      const handler1 = getHandler();
      const handler2 = getHandler();
      expect(handler2).toBe(handler1);
    });
  });

  describe('#getCommands', () => {
    test('parses yargs array into description objects', () => {
      const commands = getCommands(parser);
      expect(commands).toBeInstanceOf(Array);
      expect(commands.length).toBe(2);
      expect(commands[0]).toBeInstanceOf(Object);
    });
    test('description object keys', () => {
      const command = getCommands(parser)[0];
      expect(Object.keys(command).sort()).toEqual(
        ['command', 'name', 'arguments', 'aliases'].sort()
      );
    });
    test('.command', () => {
      const commands = getCommands(parser).map(cmd => cmd.command);
      expect(commands).toEqual(['blueprint <name> [options]', 'duck <name>']);
    });
    test('.name', () => {
      const commands = getCommands(parser).map(cmd => cmd.name);
      expect(commands).toEqual(['blueprint', 'duck']);
    });
    test('.arguments', () => {
      const commands = getCommands(parser).map(cmd => cmd.arguments);
      expect(commands).toEqual([['name'], ['name']]);
    });
    test('.aliases', () => {
      const commands = getCommands(parser).map(cmd => cmd.aliases);
      expect(commands).toEqual([['bp'], []]);
    });
  });

  describe('#resolveCommandAlias', () => {
    test('resolves command by name', () => {
      const command = resolveCommandAlias('blueprint', parser);
      expect(command).toEqual('blueprint');
    });
    test('resolves command by alias', () => {
      const command = resolveCommandAlias('bp', parser);
      expect(command).toEqual('blueprint');
    });
    test('defaults to input command', () => {
      const command = resolveCommandAlias('gibberish', parser);
      expect(command).toEqual('gibberish');
    });
  });

  describe('Handler', () => {
    test('manages helpEmitter', () => {
      const handler = new Handler();
      const emitter = handler.helpEmitter;
      expect(emitter).toBeInstanceOf(EventEmitter);
    });
    test('accepts helpEmitter', () => {
      const helpEmitter = new EventEmitter();
      const handler = new Handler({ helpEmitter });
      expect(handler.helpEmitter).toBe(helpEmitter);
    });
    test('manages runEmitter', () => {
      const handler = new Handler();
      const emitter = handler.runEmitter;
      expect(emitter).toBeInstanceOf(EventEmitter);
    });
    test('accepts runEmitter', () => {
      const runEmitter = new EventEmitter();
      const handler = new Handler({ runEmitter });
      expect(handler.runEmitter).toBe(runEmitter);
    });
    test('separate helpEmitter and runEmitter', () => {
      const handler = new Handler();
      expect(handler.runEmitter).not.toBe(handler.helpEmitter);
    });

    describe('#onHelp', () => {
      test('registers listener for key with helpEmitter', () => {
        const handler = new Handler();
        const listener = jest.fn();
        handler.onHelp('test', listener);
        expect(handler.helpEmitter.listeners('test').length).toBe(1);
        expect(handler.helpEmitter.listeners('test')[0]).toBe(listener);
        expect(handler.runEmitter.listeners('test').length).toBe(0);
      });
    });

    describe('#onRun', () => {
      test('registers listener for key with runEmitter', () => {
        const handler = new Handler();
        const listener = jest.fn();
        handler.onRun('test', listener);
        expect(handler.runEmitter.listeners('test').length).toBe(1);
        expect(handler.runEmitter.listeners('test')[0]).toBe(listener);
        expect(handler.helpEmitter.listeners('test').length).toBe(0);
      });
    });

    describe('#handle', () => {
      let handler;
      let helpEmit;
      let runEmit;
      let parse;

      beforeEach(() => {
        const helpEmitter = {
          emit: (helpEmit = jest.fn())
        };
        const runEmitter = {
          emit: (runEmit = jest.fn())
        };
        handler = new Handler({ helpEmitter, runEmitter });

        parse = jest.fn();
        resetYargs.mockImplementation(() => ({ parse }));
      });

      test('does nothing without a command to handle', () => {
        const argv = { _: [] };
        const handled = handler.handle(argv, parser);
        expect(handled).toBe(false);
        expect(helpEmit).not.toHaveBeenCalled();
        expect(runEmit).not.toHaveBeenCalled();
      });
      test('emits a run command', () => {
        const argv = { _: ['something'] };
        const handled = handler.handle(argv, parser);
        expect(handled).toBe(true);
        expect(helpEmit).not.toHaveBeenCalled();
        expect(runEmit).toHaveBeenCalledWith('something', argv, parser);
      });
      test('emits a help command', () => {
        const argv = { _: ['bp'], help: true };
        const handled = handler.handle(argv, parser);
        expect(handled).toBe(true);
        expect(helpEmit).toHaveBeenCalledWith('blueprint', argv, parser);
        expect(runEmit).not.toHaveBeenCalled();
      });
      test('resets yargs before emitting help', () => {
        const argv = { _: ['bp'], help: true };
        const handled = handler.handle(argv, parser);
        expect(resetYargs).toHaveBeenCalledWith(parser);
        expect(parse).toHaveBeenCalledWith('');
      });
    });
  });
});
