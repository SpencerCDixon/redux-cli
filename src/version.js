import path from 'path';
import { readJsonSync } from 'fs-extra';
import config from './config';

const { pkgBasePath } = config;

export const version = () => {
  const pkgPath = path.join(pkgBasePath, '../package.json');
  return readJsonSync(pkgPath).version;
};
