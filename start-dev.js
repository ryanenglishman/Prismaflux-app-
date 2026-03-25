const { execSync } = require("child_process");
process.chdir(__dirname);
const port = process.env.PORT || 3002;
execSync(
  `"${process.execPath}" node_modules/next/dist/bin/next dev --port ${port}`,
  { stdio: "inherit", cwd: __dirname }
);
