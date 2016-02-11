import chalk from 'chalk';

export const success = (text) => {
  return chalk.green(text);
};

export const error = (text) => {
  return chalk.red(text);
}
