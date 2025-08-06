import { defineConfig } from "hoks";

export default defineConfig({
  installOnLockChange: true,
  branchName: {
    pattern: "^(feature/.+|bugfix/.+|hotfix/.+|release/.+|main|develop)$",
    message:
      "Branch name must start with 'feature/', 'bugfix/', 'hotfix/', 'release/'",
  },
  staged: {
    "*": "npm run format",
  },
  enforceConventionalCommits: true,
});
