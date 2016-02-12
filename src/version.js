import path from 'path';
import { readJsonSync } from 'fs-extra';

export const version = () => {
  const pkgPath = path.join(path.dirname(module.id), '../package.json');
  return readJsonSync(pkgPath).version;
};
