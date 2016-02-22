import chalk from 'chalk';
import { pascalize, camelize } from 'humps';

// Bootstrap inspired text color helpers for the command line.
export const success = (text) => {
  return chalk.green(text);
};

export const danger = (text) => {
  return chalk.red(text);
};

export const warning = (text) => {
  return chalk.yellow(text);
};

// Action specific helpers for the command line.
export const info = (text, log = true) => {
  let content = chalk.blue('    info: ') + chalk.white(text);
  if (log) {
    console.log(content);
  } else {
    return content;
  }
};

export const create = (text, log = true) => {
  let content = chalk.green(`    create: `) + chalk.white(text);
  if (log) {
    console.log(content);
  } else {
    return content;
  }
};

export const error = (text, log = true) => {
  let content = chalk.red('    error: ') + chalk.white(text);
  if (log) {
    console.log(content);
  } else {
    return content;
  }
};

// Random string/text helpers
export const normalizeComponentName = (name) => {
  return pascalize(name);
};

export const normalizeDuckName = (name) => {
  return camelize(name);
};
