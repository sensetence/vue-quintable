const { spawn, execSync } = require('child_process');
const exec = commands => {
  execSync(commands, { stdio: 'inherit', shell: true });
};
const spawnProcess = commands => {
  spawn(commands, { stdio: 'inherit', shell: true });
};
   const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const path = require('path')

const defaultDest = __dirname + path.sep + "dist"

rl.question(`DESTINATION (${defaultDest}):`, (dir) => {

  if(!dir){
    dir=defaultDest;
  }

  exec(`set BUILD_DEST_DIRECTORY=${dir}&&vue-cli-service build --target lib ./src/index.js`);
  rl.close();
});