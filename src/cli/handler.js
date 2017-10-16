import EventEmitter from 'events';
import { resetYargs } from './yargs';

export class Handler {
  constructor(emitters = {}) {
    const { helpEmitter, runEmitter } = emitters;
    this.helpEmitter = helpEmitter || new EventEmitter();
    this.runEmitter = runEmitter || new EventEmitter();
  }

  onHelp(key, fn) {
    this.helpEmitter.on(key, fn);
  }

  onRun(key, fn) {
    this.runEmitter.on(key, fn);
  }

  handle(argv, parser) {
    let { _: [command], help } = argv;

    if (!command) {
      return false;
    }

    command = resolveCommandAlias(command, parser);

    if (help) {
      // reset the parser ready to build additional help
      resetYargs(parser).parse('');
      this.helpEmitter.emit(command, argv, parser);
    } else {
      // runner controls possible reset
      this.runEmitter.emit(command, argv, parser);
    }

    return true;
  }
}

export function resolveCommandAlias(command, parser) {
  const commands = getCommands(parser);
  const resolved =
    commands.find(
      cmd => cmd.name === command || cmd.aliases.find(a => a === command)
    ) || {};
  return resolved.name || command;
}

export function getCommands(parser) {
  return parser
    .getUsageInstance()
    .getCommands()
    .map(command => ({
      command: command[0],
      name: command[0].split(' ')[0],
      arguments: command[0]
        .split(' ')
        .slice(1)
        .filter(arg => arg.match(/^<.*>$/))
        .map(arg => arg.replace(/<|>/g, '')),
      aliases: command[3]
    }));
}

export default (function makeGetHandler() {
  let handler;
  return function getHandler() {
    if (!handler) {
      handler = new Handler();
    }
    return handler;
  };
})();
