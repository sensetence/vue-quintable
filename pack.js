import { execSync } from "child_process";
import readline from "readline";

const exec = (commands, env = {}) => {
  execSync(commands, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultDest = "dist";

rl.question(`DESTINATION (${defaultDest}):`, (dir) => {
  if (!dir) {
    dir = defaultDest;
  }
  exec(`vite build --config vite.pack.config.ts --emptyOutDir`, {
    BUILD_DEST_DIRECTORY: dir,
  });
  rl.close();
});
