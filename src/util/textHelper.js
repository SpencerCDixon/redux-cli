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

export const info = (text) => {
  return chalk.blue(text);
};

// Action specific helpers for the command line.
export const create = (text) => {
  return chalk.green(`    create: `) + text;
};

export const error = (text) => {
  return chalk.red(`    error: `) + text;
};

// Random string/text helpers
export const normalizeComponentName = (name) => {
  return pascalize(name);
};

export const normalizeDuckName = (name) => {
  return camelize(name);
};
