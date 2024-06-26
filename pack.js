const { execSync } = require("child_process");
const exec = (commands) => {
  execSync(commands, { stdio: "inherit", shell: true });
};
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultDest = "dist";

rl.question(`DESTINATION (${defaultDest}):`, (dir) => {
  if (!dir) {
    dir = defaultDest;
  }
  exec(
    `cross-env BUILD_DEST_DIRECTORY="${dir}" vite build --config vite.pack.config.js`
  );
  rl.close();
});
