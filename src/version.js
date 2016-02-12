import path from 'path';
import fs from 'fs';

export const version = () => {
  const pkgPath = path.join(path.dirname(module.id), '../package.json');
  const pkgJSON = JSON.parse(fs.readFileSync(pkgPath));
  return pkgJSON.version;
};
