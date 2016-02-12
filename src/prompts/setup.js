import chalk from 'chalk';

export const setupPrompt = (promptType, prompt) => {
  prompt.message = chalk.green(`${promptType}: `);
  prompt.delimiter = '';
  prompt.start();
};
