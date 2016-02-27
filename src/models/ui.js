import os from 'os';
import chalk from 'chalk';
import logUpdate from 'log-update';
import elegantSpinner from 'elegant-spinner';

const frame = elegantSpinner();
const EOL = os.EOL;
const DEFAULT_WRITE_LEVEL = 'INFO';
const WRITE_LEVELS = {
  'DEBUG': 1,
  'INFO': 2,
  'WARNING': 3,
  'ERROR': 4
};

class UI {
  constructor(options = {}) {
    this.inputStream  = options.inputStream || process.stdin;
    this.outputStream = options.outputStream || process.stdout;
    this.errorStream  = options.errorStream || process.stderr;

    this.writeLevel = options.writeLevel || DEFAULT_WRITE_LEVEL;
  }

  write(data, writeLevel) {
    if (writeLevel === 'ERROR') {
      this.errorStream.write(data);
    } else if (this.writeLevelVisible(writeLevel)) {
      this.outputStream.write(data);
    }
  }

  writeLine(text, writeLevel) {
    this.write(text + EOL, writeLevel);
  }

  writeInfo(text) {
    const content = chalk.blue('  info: ') + chalk.white(text);
    this.writeLine(content, 'INFO');
  }

  writeDebug(text) {
    const content = chalk.gray('  debug: ') + chalk.white(text);
    this.writeLine(content, 'DEBUG');
  }

  writeError(text) {
    const content = chalk.red('  error: ') + chalk.white(text);
    this.writeLine(content, 'ERROR');
  }

  writeWarning(text) {
    const content = chalk.yellow('  warning: ') + chalk.white(text);
    this.writeLine(content, 'WARNING');
  }

  writeCreate(text) {
    const content = chalk.green('  create: ') + chalk.white(text);
    this.writeLine(content, 'INFO');
  }

  writeLevelVisible(writeLevel) {
    const levels = WRITE_LEVELS;
    writeLevel = writeLevel || DEFAULT_WRITE_LEVEL;

    return levels[writeLevel] >= levels[this.writeLevel];
  }

  setWriteLevel(newLevel) {
    const allowedLevels = Object.keys(WRITE_LEVELS);
    if (allowedLevels.indexOf(newLevel) === -1) {
      throw new Error(
        `Unknown write level. Valid values are: ${allowedLevels.join(', ')}`
      );
    }

    this.writeLevel = newLevel;
  }

  startProgress(string) {
    if (this.writeLevelVisible(this.writeLevel)) {
      this.progressInterval = setInterval(() => {
        logUpdate(`${string} ${chalk.cyan.bold.dim(frame())}`);
      }, 100);
    }
  }

  stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}

export default UI;
