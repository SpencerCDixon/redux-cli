import chalk from 'chalk';

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

export const create = (text) => {
  return chalk.green(`CREATED: ${text}`);
};
