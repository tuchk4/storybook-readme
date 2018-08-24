const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');

const getDirs = p =>
  readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

// Get a list of all packages folder
const rootDirs = getDirs(join(__dirname, 'packages')).map(
  dir => `packages/${dir}`
);

// Filter them by directories that have a package.json
const workerDirs = rootDirs.filter(dir => {
  let result = false;
  readdirSync(dir).forEach(file => {
    if (file === 'package.json') {
      result = true;
    }
  });
  return result;
});

const installDeps = (dir, callback) => {
  console.log(`Installing dependencies in ${dir}/...`);

  const stream = spawn(
    process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
    ['install', '--no-progress', '--non-interactive'],
    { cwd: join(__dirname, dir), stdio: 'inherit' }
  );

  stream.on('close', code => {
    console.log(`Finish Installing dependencies in ${dir}/...`);
    callback();
  });
};

const installWorkerDeps = index => {
  const dir = workerDirs[index];
  if (!dir) return process.exit(0);
  installDeps(dir, () => {
    installWorkerDeps(index + 1);
  });
};

// Install the dependencies in the root folder first
// then recursilvey install them for all the workers
installDeps('/', () => {
  installWorkerDeps(0);
});
