import { getPackageManager, readPackageJson } from './../utils/utils';
import { installDeps } from '../utils/install-deps';

export async function updateDependencies() {
  // TODO: workspaceRoot
  const packageJson = await readPackageJson(process.cwd());
  //   TODO: should come from elsewhere?
  const newVersion = '2.0.0';
  (packageJson.devDependencies ??= {})['@qwik.dev/qwik'] = newVersion;
  (packageJson.devDependencies ??= {})['@qwik.dev/city'] = newVersion;
  delete packageJson.dependencies?.['@builder.io/qwik'];
  delete packageJson.dependencies?.['@builder.io/qwik-city'];
  const { install } = installDeps(getPackageManager(), process.cwd());
  const passed = await install;
  if (!passed) {
    throw new Error('Failed to install dependencies');
  }
}
